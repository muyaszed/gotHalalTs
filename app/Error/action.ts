import types from '../Store/actions';

export type ErrorAction =
  | ReturnType<typeof resetErrorFlags>
  | ReturnType<typeof showErrorDialog>
  | ReturnType<typeof closeErrorDialog>
  | ReturnType<typeof saveErrorMessage>;

export const showErrorDialog = () => ({
  type: types.SHOW_ERROR_DIALOG,
});

export const closeErrorDialog = () => ({
  type: types.CLOSE_ERROR_DIALOG,
});

export const saveErrorMessage = (message: string) => ({
  type: types.SAVE_ERROR_MESSAGE,
  payload: message,
});

export const resetErrorFlags = () => ({
  type: types.RESET_ERROR_FLAGS,
});
