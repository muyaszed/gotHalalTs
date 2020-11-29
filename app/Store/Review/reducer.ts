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

const saveReviewList = (state: ReviewState, data: any) => {
  return data.map((item: any) => {
    return {
      id: item.id,
      comment: item.comment,
      user: {
        id: item.user.id,
        firtName:
          item.user.profile.first_name && item.user.profile.last_name
            ? item.user.profile.first_name
            : 'Anonymous',
        lastName:
          item.user.profile.first_name && item.user.profile.last_name
            ? item.user.profile.last_name
            : '',
        avatar:
          item.user.facebook_auth && item.user.settings.facebook_avatar
            ? item.user.facebook_auth.fb_avatar
            : item.user.profile.avatar_uri,
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
        list: saveReviewList(state, action.payload),
      };
    default:
      return state;
  }
};
