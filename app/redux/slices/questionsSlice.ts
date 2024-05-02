import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
interface initialeStateProps {
  NumberOfAnsweredQuestions: number;
  score: number;
}

const initialState: initialeStateProps = {
  NumberOfAnsweredQuestions: 0,
  score: 0,
};

const questionsSlice = createSlice({
  name: "questionsSlice",
  initialState,
  reducers: {
    setNumberOfAnsweredQuestions(state, action: PayloadAction<number>) {
      const value = state.NumberOfAnsweredQuestions + action.payload;
      state.NumberOfAnsweredQuestions = value;
    },
    setScore(state, action: PayloadAction<number>) {
      state.score = state.score + action.payload;
    },
  },
});

export const { setNumberOfAnsweredQuestions, setScore } =
  questionsSlice.actions;
export const selectQuestionsSlice = (state: RootState) =>
  state.questionsSlice.questions;
export default questionsSlice.reducer;
