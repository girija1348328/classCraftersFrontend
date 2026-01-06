export const selectQuiz = (state) => state.quiz.data;
export const selectQuizLoading = (state) => state.quiz.loading;
export const selectQuizError = (state) => state.quiz.error;
export const selectAttemptId = (state) => state.quiz.attemptId;

export const selectQuizResult = (state) => state.quiz.result;