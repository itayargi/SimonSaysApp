import Sound from 'react-native-sound';
import {logDev} from './functionUtils';

// Set the category for playback so sounds are heard even in silent mode.
Sound.setCategory('Playback');

const SOUND_DURATION = 600; // Duration (in milliseconds) after which the sound stops.
const DEFAULT_VOLUME = 1.0;
const WRONG_SOUND_VOLUME = 0.1; // Reduced volume for the "wrong" sound.

const soundMapping: {[key: string]: string} = {
  red: 'button1.wav',
  green: 'button2.wav',
  blue: 'button3.wav',
  yellow: 'button4.wav',
  wrong: 'incorrect.wav',
};

class SoundManager {
  private sounds: {[key: string]: Sound} = {};

  constructor() {
    Object.keys(soundMapping).forEach(key => {
      const fileName = soundMapping[key];
      this.sounds[key] = new Sound(fileName, Sound.MAIN_BUNDLE, error => {
        if (error) {
          logDev(`Error loading sound ${fileName}:`, error);
        }
      });
    });
  }

  play(soundName: string, duration: number = SOUND_DURATION) {
    const sound = this.sounds[soundName];
    if (!sound) {
      logDev(`No sound mapped for ${soundName}`);
      return;
    }
    // Set volume: lower for wrong sound, default for others.
    if (soundName === 'wrong') {
      sound.setVolume(WRONG_SOUND_VOLUME);
    } else {
      sound.setVolume(DEFAULT_VOLUME);
    }
    // Stop the sound if it's already playing, then play it.
    sound.stop(() => {
      sound.play(success => {
        if (!success) {
          logDev(`Failed to play sound: ${soundName}`);
        }
      });
    });
    // Automatically stop the sound after the specified duration.
    setTimeout(() => {
      sound.stop(() => {});
    }, duration);
  }
}

const soundManager = new SoundManager();
export default soundManager;
