import http from '../config/http';
import * as constants from '../constants/reviews';
import * as notifications from './notifications';

export const getReviews = (data) => async (dispatch) => {
  try {
    dispatch(getReviewsInit(data));

    const reviews = await http.post('/reviews/find', data);

    dispatch(getReviewsSuccess(reviews));
  }
  catch (error) {
    dispatch(getReviewsFailure());
    dispatch(notifications.onNotificationErrorInit(error.message ? error.message : error));
  }
};

export const getReviewsInit = (params) => ({ type: constants.GET_REVIEWS_INIT, payload: params });
export const getReviewsSuccess = (data) => ({ type: constants.GET_REVIEWS_SUCCESS, payload: data });
export const getReviewsFailure = () => ({ type: constants.GET_REVIEWS_ERROR });

export const saveReviews = (data) => async (dispatch, getState) => {
  try {
    dispatch(saveReviewsInit());

    const response = await http.post('/reviews', data);

    dispatch(notifications.onNotificationSuccessInit('Review saved successfully'));
    dispatch(saveReviewsSuccess());
    dispatch(getReviews({ pageNumber: 0, pageSize: getState().reviews.pageSize }));

    return response;
  }
  catch (error) {
    dispatch(saveReviewsFailure());
    dispatch(notifications.onNotificationErrorInit(error.message ? error.message : error));

    throw error;
  }
};

export const saveReviewsInit = () => ({ type: constants.SAVE_REVIEWS_INIT });
export const saveReviewsSuccess = () => ({ type: constants.SAVE_REVIEWS_SUCCESS });
export const saveReviewsFailure = () => ({ type: constants.SAVE_REVIEWS_ERROR });
