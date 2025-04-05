import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import CustomButton from '../components/buttons/CustomButton';
import CustomText from '../components/text/CustomText';
import {useAppDispatch, useAppSelector} from '../hooks/reduxHooks';
import {useSimonSequence} from '../hooks/useSimonSequence';
import {navigate} from '../navigation/navigationRef';
import {ScreenName} from '../navigation/screenNames';
import {
  addBestResult,
  addColorToSequence,
  resetGame,
} from '../store/slices/gameSlice';
import soundManager from '../utils/soundPlayer';
import Strings from '../utils/strings';
import {BOLD} from '../utils/fonts';
import {colors as themeColors} from '../utils/colors';

// Define SimonColor as one of the allowed keys from themeColors
export type SimonColor = 'red' | 'green' | 'blue' | 'yellow';
const simonColors: SimonColor[] = ['red', 'green', 'blue', 'yellow'];

// Button positions for layout (consider centralizing these numbers if they come from a design system)
const buttonPositions = [
  {top: 0, left: 85},
  {top: 85, left: 0},
  {top: 85, right: 0},
  {bottom: 0, left: 85},
];

const GameScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const sequence = useAppSelector(state => state.game.sequence);
  const currentScore = useAppSelector(state => state.game.currentScore);
  const [playerStepIndex, setPlayerStepIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [playerName, setPlayerName] = useState('');

  // Prevent multiple new color schedules at the same time.
  const newColorScheduledRef = useRef(false);

  // Callback when the Simon sequence has completed.
  const onSequenceComplete = useCallback(() => {
    setPlayerStepIndex(0);
    newColorScheduledRef.current = false;
  }, []);

  const {activeColor, isPlayingSequence} = useSimonSequence(
    sequence,
    onSequenceComplete,
  );

  // Start a new game: reset state and add a random color to the sequence.
  const handleStart = useCallback(() => {
    dispatch(resetGame());
    setPlayerStepIndex(0);
    newColorScheduledRef.current = false;
    const randomColor =
      simonColors[Math.floor(Math.random() * simonColors.length)];
    dispatch(addColorToSequence(randomColor));
  }, [dispatch]);

  // Handle a player's button press. Compare against the current sequence.
  const handlePlayerPress = useCallback(
    (color: SimonColor) => {
      if (isPlayingSequence) return;
      soundManager.play(color);
      if (color === sequence[playerStepIndex]) {
        if (playerStepIndex + 1 === sequence.length) {
          if (!newColorScheduledRef.current) {
            newColorScheduledRef.current = true;
            setTimeout(() => {
              const randomColor =
                simonColors[Math.floor(Math.random() * simonColors.length)];
              dispatch(addColorToSequence(randomColor));
            }, 1000);
          }
        } else {
          setPlayerStepIndex(playerStepIndex + 1);
        }
      } else {
        soundManager.play('wrong');
        setIsModalVisible(true);
      }
    },
    [isPlayingSequence, playerStepIndex, sequence, dispatch],
  );

  // Handle submission of the player's name when the game is over.
  const handleSubmitName = useCallback(() => {
    if (playerName.trim() === '') {
      Alert.alert(Strings.enterNameAlert);
      return;
    }
    dispatch(addBestResult({name: playerName, score: currentScore}));
    setIsModalVisible(false);
    setPlayerName('');
    dispatch(resetGame());
    navigate(ScreenName.ResultsScreen);
  }, [playerName, currentScore, dispatch]);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}>
      <CustomText style={styles.score}>
        {Strings.currentScore} {currentScore}
      </CustomText>
      <CustomButton style={styles.startButton} onPress={handleStart}>
        <CustomText style={styles.startButtonText}>
          {Strings.newGameButton}
        </CustomText>
      </CustomButton>
      {/* 4 Simon's Buttons */}
      <View style={styles.buttonsContainer}>
        {simonColors.map((color, index) => (
          <View
            key={color}
            style={[styles.colorButtonWrapper, buttonPositions[index]]}>
            <CustomButton
              style={[
                styles.colorButton,
                {backgroundColor: color},
                activeColor === color ? styles.activeButton : null,
              ]}
              onPress={() => handlePlayerPress(color)}
              disabled={isPlayingSequence || currentScore === 0}
              accessibilityLabel={`Simon button ${color}`}
            />
          </View>
        ))}
      </View>
      {/* Game Over Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CustomText style={styles.modalText}>{Strings.gameOver}</CustomText>
            <CustomText style={styles.modalsubText}>
              {Strings.saveResultInstruction}
            </CustomText>
            <TextInput
              style={styles.input}
              placeholder={Strings.fullNamePlaceholder}
              value={playerName}
              onChangeText={setPlayerName}
            />
            <CustomButton
              style={styles.submitButton}
              onPress={handleSubmitName}>
              <CustomText style={styles.submitButtonText}>
                {Strings.saveResultButton}
              </CustomText>
            </CustomButton>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: themeColors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  score: {
    fontSize: 20,
    color: themeColors.textSecondary,
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: themeColors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 40,
    shadowColor: themeColors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  startButtonText: {
    color: themeColors.white,
    fontSize: 18,
    fontFamily: BOLD,
  },
  buttonsContainer: {
    width: 250,
    height: 250,
    position: 'relative',
    marginVertical: 20,
  },
  colorButtonWrapper: {
    borderRadius: 40,
    position: 'absolute',
    ...Platform.select({
      ios: {
        shadowColor: themeColors.shadow,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.4,
        shadowRadius: 5,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  colorButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    borderWidth: 5,
    borderColor: themeColors.white,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: themeColors.modalBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: themeColors.white,
    padding: 30,
    borderRadius: 12,
    width: '80%',
    shadowColor: themeColors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalsubText: {
    fontSize: 17,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: themeColors.inputBorder,
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    textAlign: 'left',
  },
  submitButton: {
    backgroundColor: themeColors.success,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  submitButtonText: {
    color: themeColors.white,
    fontSize: 18,
    fontFamily: BOLD,
    textAlign: 'center',
  },
});

export default GameScreen;
