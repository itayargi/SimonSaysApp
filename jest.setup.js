/* jest.setup.js */
import 'react-native-gesture-handler/jestSetup';

jest.useFakeTimers();

// Existing mocks:
jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    GestureHandlerRootView: View,
    PanGestureHandler: (props) => <View {...props} />,
    NativeViewGestureHandler: (props) => <View {...props} />,
    Swipeable: () => null,
    DrawerLayout: () => null,
    State: {},
    TouchableNativeFeedback: View,
    default: {},
  };
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-restart', () => ({
  restart: jest.fn(),
}));
