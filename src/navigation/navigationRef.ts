import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParamList} from '../utils/types';
import {ScreenName} from './screenNames';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

//navigation function
export const navigate = (route: ScreenName, params?: any) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(route, params);
  }
};

//reset older screen and navigate

export const resetAndNavigate = (route: ScreenName, params = {}) => {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{name: route, params}],
    });
  }
};

export const goBack = () => {
  if (navigationRef.isReady()) navigationRef.goBack();
};

export const getCurrentRoute = () => {
  if (!navigationRef.isReady()) {
    return undefined;
  }

  let route: any = navigationRef.getRootState();

  while ('routes' in route) {
    // Traverse through the nested routes
    route = route.routes[route.index ?? 0];
  }

  return route?.name;
};
