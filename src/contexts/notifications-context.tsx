import React, { createContext, useState } from 'react'
import { AlertColor } from '@mui/material/Alert'

export interface Notification {
  id: number
  message: string
  severity: AlertColor
}

interface NotificationsContext {
  notifications: Notification[]
  addNotification: (message: string, severity: string) => void
  removeNotification: (id: number) => void
}

export const NotificationsContext = createContext<NotificationsContext>({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
})

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (message: string, severity: AlertColor): void => {
    setNotifications([
      ...notifications,
      { id: Math.random(), message, severity },
    ])
  }

  const removeNotification = (id: number): void => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  return (
    <NotificationsContext.Provider
      value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationsContext.Provider>
  )
}
