import * as constants from '../constants/notifications';

export const onNotificationSuccessInit = (notification) => ({
  type: constants.ON_NOTIFICATION_SUCCESS_INIT,
  payload: { notification, type: constants.NOTIFICATION_TYPES.SUCCESS }
});

export const onNotificationWarningInit = (notification) => ({
  type: constants.ON_NOTIFICATION_WARNING_INIT,
  payload: { notification, type: constants.NOTIFICATION_TYPES.WARNING }
});

export const onNotificationErrorInit = (notification) => ({
  type: constants.ON_NOTIFICATION_ERROR_INIT,
  payload: { notification, type: constants.NOTIFICATION_TYPES.ERROR }
});

export const onNotificationClose = () => ({ type: constants.ON_NOTIFICATION_CLOSE });
