import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import CustomButton from '../components/buttons/CustomButton';
import GameScreen from '../screens/GameScreen';
import HomeScreen from '../screens/HomeScreen';
import ResultsScreen from '../screens/ResultsScreen';
import SplashScreen from '../screens/SplashScreen';
import Strings from '../utils/strings';
import {RootStackParamList} from '../utils/types';
import {navigate, navigationRef} from './navigationRef';
import {ScreenName} from './screenNames';

const Stack = createStackNavigator<RootStackParamList>();

const CustomBackButton = () => (
  <CustomButton
    style={styles.backButton}
    onPress={() => navigate(ScreenName.HomeScreen)}>
    <Text style={styles.backButtonText}>{'‹'}</Text>
  </CustomButton>
);

const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={ScreenName.Splash}>
        <Stack.Screen
          name={ScreenName.Splash}
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenName.GameScreen}
          component={GameScreen}
          options={() => ({
            title: Strings.screenGameScreensTitle,
            headerBackTitle: '',
            headerTitleAlign: 'center',
            headerLeft: CustomBackButton,
          })}
        />
        <Stack.Screen
          name={ScreenName.ResultsScreen}
          component={ResultsScreen}
          options={() => ({
            title: Strings.screenResultsTitle,
            headerBackTitle: '',
            headerTitleAlign: 'center',
            headerLeft: CustomBackButton,
          })}
        />
        <Stack.Screen
          name={ScreenName.HomeScreen}
          component={HomeScreen}
          options={{
            title: Strings.screenHomeScreenTitle,
            headerTitleAlign: 'center',
            headerLeft: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 10,
  },
  backButtonText: {
    fontSize: 34,
    color: '#007AFF',
    padding: 5,
  },
});

export default AppNavigator;
