import {Dimensions} from 'react-native';

const pageHieght = Dimensions.get('window').height;
const pageWidth = Dimensions.get('window').width;

const sizes = {
  PageHieght: pageHieght,
  PageWidth: pageWidth,
};

export default sizes;
