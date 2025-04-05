import {StackNavigationProp} from '@react-navigation/stack';
import {ScreenName} from '../navigation/screenNames';

export type RootStackParamList = {
  [ScreenName.Splash]: undefined;
  [ScreenName.GameScreen]: undefined;
  [ScreenName.HomeScreen]: undefined;
  [ScreenName.ResultsScreen]: undefined;
};
export type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ScreenName.Splash
>;

// Define SimonColor
export type SimonColor = 'red' | 'green' | 'blue' | 'yellow';
