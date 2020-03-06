import React, { useContext, Fragment } from 'react';

import {
  NotificationsContext,
  Notification
} from '../../../contexts/NotificationsContext';
import CustomSnackbar from './CustomSnackbar';

const Notifications: React.FC = () => {
  const { notifications, removeNotification } = useContext(
    NotificationsContext
  );

  return (
    <Fragment>
      {notifications.map((n: Notification) => (
        <CustomSnackbar
          key={n.id}
          open
          handleClose={() => removeNotification(n.id)}
          snackbarContent={n.message}
          severity={n.severity}
        />
      ))}
    </Fragment>
  );
};

export default Notifications;
