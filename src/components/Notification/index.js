import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/notifications';
import { NOTIFICATION_TYPES } from '../../constants/notifications';
import './index.css';

import Snackbar from 'material-ui/Snackbar';

import Success from 'material-ui/svg-icons/action/check-circle';
import Warning from 'material-ui/svg-icons/alert/warning';
import Error from 'material-ui/svg-icons/alert/error';
import muiThemeable from "material-ui/styles/muiThemeable";

const Notification = ({ notification, onNotificationClose, muiTheme: { palette } }) => {
  let notificationIcon;
  let duration;

  switch (notification.notificationType) {
    case NOTIFICATION_TYPES.SUCCESS:
      notificationIcon = <Success className="Notification-Icon" style={{ color: palette.notificationSuccess }} />;
      duration = 2000;
      break;
    case NOTIFICATION_TYPES.WARNING:
      notificationIcon = <Warning className="Notification-Icon" style={{ color: palette.notificationWarning }} />;
      duration = 5000;
      break;
    case NOTIFICATION_TYPES.ERROR:
      notificationIcon = <Error className="Notification-Icon" style={{ color: palette.notificationError }} />;
      duration = 5000;
      break;
    default:
      break;
  }

  const snackbarMessage = (
    <div className="flex align-center">
      {notificationIcon}&nbsp;
      <p>{ notification.notificationMessage }</p>
    </div>
  );
  return (
    <Snackbar
      className="Notification"
      open={!!notification.notificationMessage}
      message={snackbarMessage}
      autoHideDuration={duration}
      onActionClick={onNotificationClose}
      onRequestClose={onNotificationClose}
    />
  );
};

const mapStateToProps = (state) => ({
  notification: state.notifications,
});

const mapDispatchToProps = (dispatch) => ({
  onNotificationClose: () =>  {
    setTimeout(() => dispatch(actions.onNotificationClose()), 300)
  },
});

const withTheme = muiThemeable()(Notification);

export default connect(mapStateToProps, mapDispatchToProps)(withTheme);
