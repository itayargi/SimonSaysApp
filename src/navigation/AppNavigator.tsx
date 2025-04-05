import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import Strings from '../utils/strings';
import {RootStackParamList} from '../utils/types';
import {navigationRef} from './navigationRef';
import {ScreenName} from './screenNames';
import GameScreen from '../screens/GameScreen';
import ResultsScreen from '../screens/ResultsScreen';

const Stack = createStackNavigator<RootStackParamList>();

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
          options={{title: Strings.screenGameScreensTitle, headerBackTitle:''}}
        />
        <Stack.Screen
          name={ScreenName.ResultsScreen}
          component={ResultsScreen}
          options={{title: Strings.screenResultsTitle, headerBackTitle:''}}
        />
        <Stack.Screen
          name={ScreenName.HomeScreen}
          component={HomeScreen}
          options={{title: Strings.screenHomeScreenTitle}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
