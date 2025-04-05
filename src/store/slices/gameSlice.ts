import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface BestResult {
  name: string;
  score: number;
}

interface GameState {
  sequence: string[];
  currentScore: number;
  bestResults: BestResult[];
}

const initialState: GameState = {
  sequence: [],
  currentScore: 0,
  bestResults: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addColorToSequence(state, action: PayloadAction<string>) {
      state.sequence.push(action.payload);
      state.currentScore = state.sequence.length;
    },
    resetGame(state) {
      state.sequence = [];
      state.currentScore = 0;
    },
    addBestResult(state, action: PayloadAction<BestResult>) {
      state.bestResults.push(action.payload);
      // Sort in descending order and keep top 10 results
      state.bestResults.sort((a, b) => b.score - a.score);
      if (state.bestResults.length > 10) {
        state.bestResults = state.bestResults.slice(0, 10);
      }
    },
  },
});

export const {addColorToSequence, resetGame, addBestResult} = gameSlice.actions;
export default gameSlice.reducer;
