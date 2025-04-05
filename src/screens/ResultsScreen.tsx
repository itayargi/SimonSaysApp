import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import CustomButton from '../components/buttons/CustomButton';
import CustomText from '../components/text/CustomText';
import {navigate, resetAndNavigate, resetToHomeAndNavigate} from '../navigation/navigationRef';
import {ScreenName} from '../navigation/screenNames';
import {RootState} from '../store';
import Strings from '../utils/strings';

interface ResultItem {
  name: string;
  score: number;
}

const ResultsScreen: React.FC = () => {
  const bestResults = useSelector(
    (state: RootState) => state.game.bestResults,
  ) as ResultItem[];

  const handleStartNewGame = useCallback(() => {
    navigate(ScreenName.GameScreen);
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: ResultItem; index: number}) => (
      <View style={styles.resultItem}>
        <CustomText style={styles.rankText}>{index + 1}.</CustomText>
        <CustomText style={styles.nameText}>{item.name}</CustomText>
        <CustomText style={styles.scoreText}>{item.score}</CustomText>
      </View>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <CustomText style={styles.title}>{Strings.bestResultsTitle}</CustomText>
      <View style={styles.headerRow}>
        <CustomText style={styles.headerText}>{Strings.rankLabel}</CustomText>
        <CustomText style={styles.headerText}>{Strings.nameLabel}</CustomText>
        <CustomText style={styles.headerText}>{Strings.scoreLabel}</CustomText>
      </View>

      {/* Results List */}
      <FlatList
        data={bestResults}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.resultsList}
        ListEmptyComponent={
          <CustomText style={styles.emptyListText}>
            {Strings.noResultsText}
          </CustomText>
        }
        bounces={false}
        showsVerticalScrollIndicator={false}
      />

      {/* Navigation Button */}
      <CustomButton style={styles.startButton} onPress={handleStartNewGame}>
        <CustomText style={styles.startButtonText}>
          {Strings.result_goTOGameScreen}
        </CustomText>
      </CustomButton>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  resultsList: {
    width: '100%',
    paddingVertical: 10,
  },
  resultItem: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    width: '100%',
  },
  rankText: {
    fontSize: 20,
    color: '#333',
    width: 40,
    textAlign: 'center',
  },
  nameText: {
    fontSize: 20,
    color: '#333',
    flex: 1,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 20,
    color: '#333',
    width: 60,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 30,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyListText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default ResultsScreen;
