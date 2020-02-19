import React, { useContext } from 'react';

import { NotificationsContext } from '../../../contexts/NotificationsContext';
import CustomSnackbar from './CustomSnackbar';

const Notifications = () => {
  const { notifications, removeNotification } = useContext(
    NotificationsContext
  );

  return notifications.map(n => (
    <CustomSnackbar
      key={n.id}
      open
      handleClose={() => removeNotification(n.id)}
      snackbarContent={n.message}
      severity={n.messageType}
    />
  ));
};

export default Notifications;
