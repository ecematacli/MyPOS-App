import React, { useContext, Fragment } from 'react'

import {
  NotificationsContext,
  Notification,
} from '../../../contexts/NotificationsContext'
import { NotificationSnackbar } from './notification-snackbar'

export const Notifications = () => {
  const { notifications, removeNotification } = useContext(NotificationsContext)

  return (
    <Fragment>
      {notifications.map((n: Notification) => (
        <NotificationSnackbar
          key={n.id}
          open
          handleClose={() => removeNotification(n.id)}
          snackbarContent={n.message}
          severity={n.severity}
        />
      ))}
    </Fragment>
  )
}
