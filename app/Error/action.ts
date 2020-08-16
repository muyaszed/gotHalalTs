import types from '../Store/actions';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {RootState} from '../Store/reducers';

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

// export const triggerError = (message: string) => (
//   dispatch: ThunkDispatch<RootState, void, Action>,
// ) => {
//   console.log('in thunk', message);
//   dispatch(saveErrorMessage(message));
//   dispatch(showErrorDialog());
// };
