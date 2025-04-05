import {useEffect, useRef, useState} from 'react';
import soundManager from '../utils/soundPlayer';

const FLASH_DURATION = 500;
const INTERVAL_DURATION = 1000;

/**
 * Custom hook to play a Simon Says sequence:
 * - Flashes each color in the sequence for a set duration.
 * - Plays corresponding sound for each color.
 * - Calls onSequenceComplete after the full sequence is played.
 *
 * @param sequence - Array of color strings representing the Simon sequence.
 * @param onSequenceComplete - Callback invoked when the sequence has finished playing.
 * @returns { activeColor, isPlayingSequence }
 */
export function useSimonSequence(
  sequence: string[],
  onSequenceComplete: () => void,
) {
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Clear all pending timeouts.
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    if (sequence.length === 0) return;
    setIsPlayingSequence(true);
    clearAllTimeouts();

    sequence.forEach((color, index) => {
      // Set a timeout to flash the color.
      const t1 = setTimeout(() => {
        setActiveColor(color);
        soundManager.play(color);
        // After FLASH_DURATION, clear the active color.
        const t2 = setTimeout(() => {
          setActiveColor(null);
          // After the last color, finish the sequence.
          if (index === sequence.length - 1) {
            const t3 = setTimeout(() => {
              setIsPlayingSequence(false);
              onSequenceComplete();
            }, FLASH_DURATION);
            timeoutsRef.current.push(t3);
          }
        }, FLASH_DURATION);
        timeoutsRef.current.push(t2);
      }, index * INTERVAL_DURATION);
      timeoutsRef.current.push(t1);
    });

    // Cleanup timeouts on unmount or when sequence changes.
    return () => {
      clearAllTimeouts();
    };
  }, [sequence, onSequenceComplete]);

  return {activeColor, isPlayingSequence};
}
