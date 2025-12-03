export const selectPayment = (state) => state.payment.payments;
export const selectPaymentLoading = (state) => state.payment.loading;
export const selectPaymentError = (state) => state.payment.error;

export const selectFullFeeStructureById = (state) => state.payment.fullStructureById;
export const selectFeeStructureByIdLoading = (state) => state.payment.loading;
export const selectFeeStructureByIdError = (state) => state.payment.error;

export const selectPaymentsByInstitutionId = (state) => state.payment.paymentsByInstitutionId;
export const selectPaymentsByInstitutionIdLoading = (state) => state.payment.loading;
export const selectPaymentsByInstitutionIdError = (state) => state.payment.error;
