import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {NavigationContainer} from '@react-navigation/native';
import GameScreen from '../GameScreen';
import Strings from '../../utils/strings';

const mockStore = configureStore([]);
const store = mockStore({
  game: {
    sequence: [],
    currentScore: 0,
    bestResults: [],
  },
});

describe('GameScreen', () => {
  it('renders correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <GameScreen />
        </NavigationContainer>
      </Provider>,
    );

    // Verify that the "New Game" button is rendered.
    expect(getByText(Strings.newGameButton)).toBeTruthy();

    // Verify that the current score is rendered.
    // This assumes Strings.currentScore contains a substring like "current score".
    expect(getByText(new RegExp(Strings.currentScore, 'i'))).toBeTruthy();
  });
});
