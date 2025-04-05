import {PixelRatio} from 'react-native';
import sizes from './sizes';

export const responsiveFontSize = (size: number) => {
  const scale = sizes.PageWidth / 375; // 375px זה רוחב סטנדרטי של אייפון X
  return Math.round(PixelRatio.roundToNearestPixel(size * scale * 0.9));
};
