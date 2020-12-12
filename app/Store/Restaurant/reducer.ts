import {distanceBetweenLocation} from '../../Services/helper';
import types, {Actions} from '../actions';
// import createStore from '../store';

// const {store} = createStore();
interface OnlyIds {
  id: number;
}

interface BookmarkingUser extends OnlyIds {}

interface CheckingIns extends OnlyIds {}

interface Reviews extends OnlyIds {}

interface SocMed {
  [key: string]: string;
}

export interface RestaurantModel {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  postcode: string;
  category: string;
  cuisine: string;
  start: string;
  desc: string;
  sub_header: string;
  cover_uri: null | string;
  created_at: string;
  end: string;
  latitude: number;
  longitude: number;
  location: string;
  web: string;
  updated_at: number;
  contact_number: string;
  soc_med: SocMed;
  family_friendly: boolean;
  surau: boolean;
  disabled_accessibility: boolean;
  bookmarking_user: BookmarkingUser[];
  checking_ins: CheckingIns[];
  reviews: Reviews[];
  certificate_verification: string;
  confirmation_verification: string;
  logo_verification: string;
  halal_verifications: {
    id: number;
    user_id: number;
  }[];
  approved: boolean;
  distance: number;
}

export interface VerificationData {
  confirmation: boolean;
  certification: boolean;
  logo: boolean;
}

export interface SelectedReviewImage {
  name: string;
  type: string;
  uri: string;
}

export interface RestaurantInfo {
  mapModalVisible: boolean;
  useGoogleMap: boolean;
  selectedReviewImage: SelectedReviewImage | false;
  disableReviewSubmit: boolean;
  verificationData: VerificationData;
  verifyModalVisible: boolean;
  showReviewForm: boolean;
  reviewCancelModalVisible: boolean;
}

export interface RestaurantState {
  list: RestaurantModel[];
  isLoading: boolean;
  selectedRestaurantId: number | null;
  restaurantInfo: RestaurantInfo;
  error: string;
}

export const restaurantInitialState: RestaurantState = {
  list: [],
  isLoading: false,
  selectedRestaurantId: null,
  restaurantInfo: {
    mapModalVisible: false,
    useGoogleMap: false,
    selectedReviewImage: false,
    disableReviewSubmit: false,
    verificationData: {
      confirmation: false,
      certification: false,
      logo: false,
    },
    verifyModalVisible: false,
    showReviewForm: false,
    reviewCancelModalVisible: false,
  },
  error: '',
};

const updateVerificationData = (
  currentState: RestaurantState,
  data: VerificationData,
) => {
  if (data.confirmation) {
    return {
      ...currentState.restaurantInfo.verificationData,
      confirmation: !currentState.restaurantInfo.verificationData.confirmation,
    };
  }

  if (data.certification) {
    return {
      ...currentState.restaurantInfo.verificationData,
      certification: !currentState.restaurantInfo.verificationData
        .certification,
    };
  }

  if (data.logo) {
    return {
      ...currentState.restaurantInfo.verificationData,
      logo: !currentState.restaurantInfo.verificationData.logo,
    };
  }

  return {
    ...currentState.restaurantInfo.verificationData,
  };
};

const populateList = (
  data: RestaurantModel[],
  userLocation: {
    lat: number;
    long: number;
  },
  userDistanceSetting: string,
) => {
  return data.map((item) => ({
    ...item,
    distance: distanceBetweenLocation(
      userLocation.lat,
      userLocation.long,
      item.latitude,
      item.longitude,
      userDistanceSetting === 'mile' ? 'M' : 'K',
    ),
  }));
};

export const restaurantReducer = (
  state = restaurantInitialState,
  action: Actions,
): RestaurantState => {
  switch (action.type) {
    case types.GETTING_ALL_RESTAURANTS:
      return {
        ...state,
        isLoading: true,
      };
    case types.GETTING_ALL_RESTAURANTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: populateList(
          action.payload,
          action.userLocation,
          action.userDistanceSetting,
        ),
      };
    case types.GETTING_ALL_RESTAURANTS_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case types.SET_SELECTED_RESTAURANT:
      return {
        ...state,
        selectedRestaurantId: action.payload,
      };
    case types.SET_RESTAURANT_MAP_MODAL_VISIBLE:
      return {
        ...state,
        restaurantInfo: {
          ...state.restaurantInfo,
          mapModalVisible: action.payload,
        },
      };
    case types.SET_USE_GOOGLE_MAP:
      return {
        ...state,
        restaurantInfo: {
          ...state.restaurantInfo,
          useGoogleMap: action.payload,
        },
      };
    case types.SET_REVIEW_IMAGE:
      return {
        ...state,
        restaurantInfo: {
          ...state.restaurantInfo,
          selectedReviewImage: action.payload,
        },
      };
    case types.SET_REVIEW_SUBMIT_BUTTON_STATUS:
      return {
        ...state,
        restaurantInfo: {
          ...state.restaurantInfo,
          disableReviewSubmit: action.payload,
        },
      };
    case types.SET_VERIFICATION_DATA:
      return {
        ...state,
        restaurantInfo: {
          ...state.restaurantInfo,
          verificationData: updateVerificationData(state, action.payload),
        },
      };
    case types.SET_RESTAURANT_VERIFICATION_MODAL_VISIBLE:
      return {
        ...state,
        restaurantInfo: {
          ...state.restaurantInfo,
          verifyModalVisible: action.payload,
        },
      };
    case types.SET_SHOW_REVIEW_FORM:
      return {
        ...state,
        restaurantInfo: {
          ...state.restaurantInfo,
          showReviewForm: action.payload,
        },
      };
    case types.SET_REVIEW_CANCEL_MODAL_VISIBLE:
      return {
        ...state,
        restaurantInfo: {
          ...state.restaurantInfo,
          reviewCancelModalVisible: action.payload,
        },
      };
    default:
      return state;
  }
};
