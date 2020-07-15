import types, {Actions} from '../Store/actions';

interface ReviewUser {
  id: number;
  firtName: string;
  lastName: string;
  avatar: string;
}

export interface ReviewModel {
  id: number;
  comment: string;
  user: ReviewUser;
}

export interface ReviewState {
  list: ReviewModel[];
  currentReview: string;
}

export const reviewInitialState = {
  list: [],
  currentReview: '',
};

const saveReviewList = (data: any) => {
  return data.map((item: any) => {
    return {
      id: item.id,
      comment: item.comment,
      user: {
        id: item.user.id,
        firtName: item.user.profile.first_name,
        lastName: item.user.profile.last_name,
        avatar: item.user.profile.avatar_uri,
      },
    };
  });
};

export const reviewReducer = (state = reviewInitialState, action: Actions) => {
  switch (action.type) {
    case types.GETTING_ALL_REVIEWS_SUCCESS:
      return {
        ...state,
        list: saveReviewList(action.payload),
      };
    case types.SET_REVIEW_TEXT:
      return {
        ...state,
        currentReview: action.payload,
      };
    case types.RESET_REVIEW_TEXT:
      return {
        ...state,
        currentReview: '',
      };
    default:
      return state;
  }
};
