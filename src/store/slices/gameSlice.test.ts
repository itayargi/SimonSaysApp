import gameReducer, { addColorToSequence, resetGame, addBestResult } from './gameSlice';

describe('game reducer', () => {
  const initialState = {
    sequence: [],
    currentScore: 0,
    bestResults: [],
  };

  it('should handle initial state', () => {
    expect(gameReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addColorToSequence', () => {
    const actual = gameReducer(initialState, addColorToSequence('red'));
    expect(actual.sequence).toEqual(['red']);
    expect(actual.currentScore).toEqual(1);
  });

  it('should handle resetGame', () => {
    const modifiedState = { sequence: ['red', 'blue'], currentScore: 2, bestResults: [] };
    const actual = gameReducer(modifiedState, resetGame());
    expect(actual.sequence).toEqual([]);
    expect(actual.currentScore).toEqual(0);
  });

  it('should handle addBestResult and sort best results', () => {
    const stateWithResults = { ...initialState, bestResults: [] };
    const result1 = { name: 'Alice', score: 3 };
    const result2 = { name: 'Bob', score: 5 };
    let state = gameReducer(stateWithResults, addBestResult(result1));
    state = gameReducer(state, addBestResult(result2));
    expect(state.bestResults).toEqual([result2, result1]);
  });
});
