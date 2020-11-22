import types, {Actions} from '../actions';

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
  photo: string;
}

export interface ReviewState {
  list: ReviewModel[];
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
      photo: item.photo_uri,
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
    default:
      return state;
  }
};