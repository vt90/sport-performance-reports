import * as constants from '../constants/reviews';

const initalState = {
  pageNumber: 0,
  pageSize: 5,
  totalItems: null,
  reviewInfoList: null,
  isLoading: {
    getReviews: null,
    saveReview: null,
  },
};

export const reviewsReducer = (state = initalState, action) => {
  switch (action.type) {
    case constants.GET_REVIEWS_INIT:
      return {...state, pageNumber: action.payload.pageNumber, pageSize: action.payload.pageSize, isLoading: { ...state.isLoading, getReviews: true }};
    case constants.GET_REVIEWS_SUCCESS:
      return {
        ...state,
        reviewInfoList: action.payload.rows,
        totalItems: action.payload.count,
        isLoading: { ...state.isLoading, getReviews: false }
      };
    case constants.GET_REVIEWS_ERROR:
      return {...state, isLoading: { ...state.isLoading, getReviews: false }};
    case constants.SAVE_REVIEWS_INIT:
      return {...state, isLoading: { ...state.isLoading, saveReview: true }};
    case constants.SAVE_REVIEWS_SUCCESS:
      return {...state, isLoading: { ...state.isLoading, saveReview: false }};
    case constants.SAVE_REVIEWS_ERROR:
      return {...state, isLoading: { ...state.isLoading, saveReview: false }};
    default:
      return state;
  }
};
