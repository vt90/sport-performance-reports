import * as constants from '../constants/notifications';

const initialState = {
  notificationMessage: null,
  notificationType: null,
};

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ON_NOTIFICATION_SUCCESS_INIT:
      return { ...state, notificationMessage: action.payload.notification, notificationType: action.payload.type };
    case constants.ON_NOTIFICATION_ERROR_INIT:
      return { ...state, notificationMessage: action.payload.notification, notificationType: action.payload.type };
    case constants.ON_NOTIFICATION_WARNING_INIT:
      return { ...state, notificationMessage: action.payload.notification, notificationType: action.payload.type };
    case constants.ON_NOTIFICATION_CLOSE:
      return { ...state, notificationMessage: null, notificationType: null };
    default:
      return state;
  }
};
