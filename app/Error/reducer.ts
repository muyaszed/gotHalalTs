import {Actions} from '../Store/actions';
import types from '../Store/actions';

export interface ErrorState {
  showModal: boolean;
  message: string;
  needLogOut: boolean;
  needReload: boolean;
}

const initialErrorState: ErrorState = {
  showModal: false,
  message: '',
  needLogOut: false,
  needReload: false,
};

const handleErrorMessage = (state: ErrorState, message: string) => {
  switch (message) {
    case 'Network Error':
      return {
        ...state,
        message: `There is a problem with the connection
        Please try again later.`,
        needReload: true,
      };
    case 'Signature has expired':
      return {
        ...state,
        message: `Sorry, your session has expired.
        You need to login again.`,
        needLogOut: true,
      };
    default:
      return state;
  }
};

export const errorReducer = (
  state = initialErrorState,
  action: Actions,
): ErrorState => {
  switch (action.type) {
    case types.SHOW_ERROR_DIALOG:
      return {
        ...state,
        showModal: true,
      };
    case types.CLOSE_ERROR_DIALOG:
      return {
        ...state,
        showModal: false,
      };
    case types.SAVE_ERROR_MESSAGE:
      return handleErrorMessage(state, action.payload);
    case types.RESET_ERROR_FLAGS:
      return {
        ...state,
        needLogOut: false,
        needReload: false,
      };
    default:
      return state;
  }
};
