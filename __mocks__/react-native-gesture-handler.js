const React = require('react');
const {View} = require('react-native');

module.exports = {
  // Provide a basic mock for the root view:
  GestureHandlerRootView: View,
  // **Add the missing PanGestureHandler export**
  PanGestureHandler: View,
  Swipeable: () => null,
  DrawerLayout: () => null,
  State: {},
  TouchableNativeFeedback: View,
  // If you have a default export, you can uncomment the following:
  // default: {},
};
