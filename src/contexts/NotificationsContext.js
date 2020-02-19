import React, { createContext, useState } from 'react';

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, messageType) => {
    setNotifications([
      ...notifications,
      { id: Math.random(), message, messageType }
    ]);
  };

  const removeNotification = id => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <NotificationsContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
