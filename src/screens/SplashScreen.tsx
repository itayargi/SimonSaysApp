import React, {useEffect, useRef} from 'react';
import {ActivityIndicator, Animated, StyleSheet, View} from 'react-native';
import {resetAndNavigate} from '../navigation/navigationRef';
import {ScreenName} from '../navigation/screenNames';
import Strings from '../utils/strings';
import {SplashScreenNavigationProp} from '../utils/types';

interface Props {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<Props> = ({navigation}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Run a parallel animation: fade in and scale up the text
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    // After 3000ms, navigate to the Game screen
    const timer = setTimeout(() => {
      resetAndNavigate(ScreenName.HomeScreen);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, opacity, scale]);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.animatedText, {opacity, transform: [{scale}]}]}>
        {Strings.splashText}
      </Animated.Text>
      <ActivityIndicator
        size="large"
        color="#fff"
        style={styles.activityIndicator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  activityIndicator: {
    marginTop: 20,
  },
});

export default SplashScreen;
