export const selectTimetables = (state) => state.timeTable.timetables;
export const selectTimetablesByTeacher = (state) => state.timeTable.timetablesByTeacher;
export const selectTimetablesLoading = (state) => state.timeTable.loading;
export const selectTimetablesError = (state) => state.timeTable.error;