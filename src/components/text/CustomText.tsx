import React, {forwardRef} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {REGULAR} from '../../utils/fonts';

const CustomText = forwardRef<Text, TextProps>(
  ({children, style, ...rest}, ref) => {
    return (
      <Text style={[defaultTextStyles.text, style]} ref={ref} {...rest}>
        {children}
      </Text>
    );
  },
);

export const defaultTextStyles = StyleSheet.create({
  text: {
    fontFamily: REGULAR,
  },
});

export default CustomText;
