import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import {Linking} from 'react-native';
import Strings from '../../utils/strings';
import {navigate} from '../../navigation/navigationRef';
import {ScreenName} from '../../navigation/screenNames';

// Mock the navigation function with the correct relative path
jest.mock('../../navigation/navigationRef', () => ({
  navigate: jest.fn(),
}));

// Mock the Linking module to return a promise
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(() => Promise.resolve()),
}));

describe('HomeScreen', () => {
  it('renders correctly with expected texts', () => {
    const {getByText} = render(<HomeScreen />);

    // Check header texts
    expect(getByText(Strings.welcomePart1)).toBeTruthy();
    expect(getByText(Strings.welcomePart2)).toBeTruthy();

    // Check explanation texts
    expect(getByText(Strings.instruction1)).toBeTruthy();
    expect(getByText(Strings.instruction2)).toBeTruthy();

    // Check button texts
    expect(getByText(Strings.howToPlayVideo)).toBeTruthy();
    expect(getByText(Strings.homeScreen_playBtn)).toBeTruthy();
    expect(getByText(Strings.homeScreen_viewResult)).toBeTruthy();
  });

  it('navigates to GameScreen when "Play Game" is pressed', () => {
    const {getByText} = render(<HomeScreen />);
    const playGameButton = getByText(Strings.homeScreen_playBtn);
    fireEvent.press(playGameButton);
    expect(navigate).toHaveBeenCalledWith(ScreenName.GameScreen);
  });

  it('navigates to ResultsScreen when "View Results" is pressed', () => {
    const {getByText} = render(<HomeScreen />);
    const viewResultsButton = getByText(Strings.homeScreen_viewResult);
    fireEvent.press(viewResultsButton);
    expect(navigate).toHaveBeenCalledWith(ScreenName.ResultsScreen);
  });

  it('opens tutorial URL when the tutorial button is pressed', () => {
    const {getByText} = render(<HomeScreen />);
    const tutorialButton = getByText(Strings.howToPlayVideo);
    fireEvent.press(tutorialButton);
    expect(Linking.openURL).toHaveBeenCalledWith(Strings.tutorialUrl);
  });
});
