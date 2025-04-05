import React, {useCallback} from 'react';
import {Linking, ScrollView, StyleSheet, View} from 'react-native';
import CustomButton from '../components/buttons/CustomButton';
import CustomText from '../components/text/CustomText';
import {navigate} from '../navigation/navigationRef';
import {ScreenName} from '../navigation/screenNames';
import Strings from '../utils/strings';
import {BOLD} from '../utils/fonts';

const HomeScreen: React.FC = () => {
  // Navigate to the game screen
  const handlePlayGame = useCallback(() => {
    navigate(ScreenName.GameScreen);
  }, []);

  // Navigate to the results screen
  const handleViewResults = useCallback(() => {
    navigate(ScreenName.ResultsScreen);
  }, []);

  // Open the tutorial URL in the default browser
  const handleOpenTutorial = useCallback(() => {
    Linking.openURL(Strings.tutorialUrl).catch(err =>
      console.error('Failed to open URL:', err),
    );
  }, []);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.section}>
        <CustomText style={styles.title}>{Strings.welcomePart1}</CustomText>
        <CustomText style={styles.title}>{Strings.welcomePart2}</CustomText>
      </View>

      {/* Explanation Section */}
      <View style={styles.section}>
        <CustomText style={styles.explanation}>
          {Strings.instruction1}
        </CustomText>
        <CustomText style={styles.explanation}>
          {Strings.instruction2}
        </CustomText>
      </View>

      {/* Tutorial Link */}
      <CustomButton style={styles.videoButton} onPress={handleOpenTutorial}>
        <CustomText style={styles.videoButtonText}>
          {Strings.howToPlayVideo}
        </CustomText>
      </CustomButton>

      {/* Navigation Buttons */}
      <View style={styles.btnRow}>
        <CustomButton style={styles.actionButton} onPress={handlePlayGame}>
          <CustomText style={styles.actionButtonText}>
            {Strings.homeScreen_playBtn}
          </CustomText>
        </CustomButton>
        <CustomButton style={styles.actionButton} onPress={handleViewResults}>
          <CustomText style={styles.actionButtonText}>
            {Strings.homeScreen_viewResult}
          </CustomText>
        </CustomButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontFamily: BOLD,
    color: '#333',
    textAlign: 'center',
  },
  explanation: {
    fontSize: 18,
    color: '#444',
    textAlign: 'center',
  },
  videoButton: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  videoButtonText: {
    color: '#007AFF',
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  btnRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: '47%',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: BOLD,
    textAlign: 'center',
  },
});

export default HomeScreen;
