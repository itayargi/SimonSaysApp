import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {BOLD} from '../../utils/fonts';
import {responsiveFontSize} from '../../utils/functionUtils';
import CustomText from '../text/CustomText';

interface CustomButtonProps extends PressableProps {
  title?: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
  disabled?: boolean;
  children?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  children,
}) => {
  const defaultStyle: ViewStyle = children
    ? {}
    : {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
      };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [defaultStyle, style, pressed && styles.pressed]}>
      {children ? (
        children
      ) : (
        <CustomText style={[styles.buttonText, textStyle]}>{title}</CustomText>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.6,
    elevation: 0,
  },
  buttonText: {
    color: '#FFF',
    fontSize: responsiveFontSize(16),
    fontFamily: BOLD,
  },
});

export default CustomButton;
