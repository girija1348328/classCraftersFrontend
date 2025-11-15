// Selectors for Jitsi state
export const selectJitsiRoomName = (state) => state.jitsi.roomName;
export const selectJitsiUserName = (state) => state.jitsi.userName;
export const selectJitsiToken = (state) => state.jitsi.token;
export const selectJitsiLoading = (state) => state.jitsi.loading;
export const selectJitsiError = (state) => state.jitsi.error;
export const selectJitsiActive = (state) => state.jitsi.isActive;
