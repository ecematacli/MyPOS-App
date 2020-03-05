import React, { useContext } from 'react';

import {
  NotificationsContext,
  Notification
} from '../../../contexts/NotificationsContext';
import CustomSnackbar from './CustomSnackbar';

const Notifications = () => {
  const { notifications, removeNotification } = useContext(
    NotificationsContext
  );

  return notifications.map((n: Notification) => (
    <CustomSnackbar
      key={n.id}
      open
      handleClose={() => removeNotification(n.id)}
      snackbarContent={n.message}
      severity={n.severity}
    />
  ));
};

export default Notifications;
