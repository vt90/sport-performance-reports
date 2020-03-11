import http from '../config/http';
import cookie from 'react-cookies';
import * as constants from '../constants/reports';
import * as notifications from './notifications';
import { push } from 'react-router-redux';
import {USER_COOKIE_KEY} from "../constants/constants";
import {EXIT_USER} from "../constants/reports";
import moment from 'moment';

export const checkUser = (userId) => async (dispatch) => {
  dispatch(checkUserInit(userId));

  try {
    const response = await http.get(`/healthdata/checkuser/${userId}`);

    console.log('response is: ', response);
    if (!response) {
      throw { message: 'Invalid or unknown user! Please register tot the platform' };
    }

    const searchDates = await http.get(`/healthdata/usersearchrange/${userId}`);

    const cookieExpirationDate = moment().add(1, 'week').toDate();
    cookie.save(USER_COOKIE_KEY, { userId, cookieExpirationDate });

    dispatch(checkUserSuccess({ ...searchDates, userId }));

    return searchDates;
  }
  catch (error) {
    dispatch(checkUserFailure());
    dispatch(notifications.onNotificationErrorInit(error.message ? error.message : error));
    dispatch(push('/'));
  }
};

export const removeUserData = (userId) => async (dispatch) => {
  dispatch(removeUserInit());

  try {
    const response = await http.delete(`/healthdata/removeuser/${userId}`);
    dispatch(removeUserSuccess());
    dispatch(exitUser());
    dispatch(notifications.onNotificationSuccessInit('Your data has been removed completely!'));
    dispatch(push('/'));

    return response;
  }
  catch (error) {
    dispatch(removeUserFailure());
    dispatch(notifications.onNotificationErrorInit(error.message ? error.message : error));
  }
};

export const findReports = ({ userId, startDate, endDate, activityType }) => async (dispatch) => {
  dispatch(findReportsInit());

  try {
    const url = activityType ? `/healthdata/find/${activityType}` : '/healthdata/find';
    const reports = await http.post(url, {
      userId, startDate, endDate
    });

    dispatch(findReportsSuccess(reports));

    return reports;
  }
  catch (error) {
    dispatch(findReportsFailure());
    dispatch(notifications.onNotificationErrorInit(error));
  }
};

export const changeSearchCriteria = ({ userId, startDate, endDate, activityType }) => (dispatch) => {
  dispatch(changeSearchCriteriaInit({ startDate, endDate, activityType }));
  dispatch(findReports({userId, startDate, endDate, activityType}));
};

export const checkUserInit = (userId) => ({ type: constants.CHECK_USER_INIT, payload: userId });
export const checkUserSuccess = (data) => ({ type: constants.CHECK_USER_SUCCESS, payload: data });
export const checkUserFailure = () => ({ type: constants.CHECK_USER_FAILURE });
export const exitUser = () => ({ type: EXIT_USER });

export const findReportsInit = () => ({ type: constants.FIND_REPORTS_INIT });
export const findReportsSuccess = (data) => ({ type: constants.FIND_REPORTS_SUCCESS, payload: data });
export const findReportsFailure = () => ({ type: constants.FIND_REPORTS_FAILURE });

export const changeSearchCriteriaInit = (data) => ({ type: constants.CHANGE_REPORTS_SEARCH_CRITERIA, payload: data });

export const removeUserInit = () => ({ type: constants.REMOVE_USER_INIT });
export const removeUserSuccess = () => ({ type: constants.REMOVE_USER_SUCCESS });
export const removeUserFailure = () => ({ type: constants.REMOVE_USER_FAILURE });


/* ToDo remove for production */
export const getAllHealthData = () => async (dispatch) => {
  try {
    const response = await http.get('/healthdata');

    dispatch(getAllHealthDataSuccess(response));
  }
  catch (error) {
    dispatch(notifications.onNotificationErrorInit(error));
  }
};

export const getAllHealthDataSuccess = (data) => ({ type: 'GET_ALL_HEALTH_DATA', payload: data });
