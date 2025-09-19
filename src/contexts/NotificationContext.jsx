import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { notifications as initialNotifications } from '../data/mockData';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [...state, { ...action.payload, id: Date.now().toString() }];
    case 'MARK_AS_READ':
      return state.map(notification =>
        notification.id === action.payload
          ? { ...notification, read: true }
          : notification
      );
    case 'MARK_ALL_AS_READ':
      return state.map(notification => ({ ...notification, read: true }));
    case 'REMOVE_NOTIFICATION':
      return state.filter(notification => notification.id !== action.payload);
    case 'CLEAR_ALL':
      return [];
    case 'LOAD_NOTIFICATIONS':
      return action.payload;
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [notifications, dispatch] = useReducer(notificationReducer, initialNotifications);

  const addNotification = (notification) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  };

  const markAsRead = (notificationId) => {
    dispatch({ type: 'MARK_AS_READ', payload: notificationId });
  };

  const markAllAsRead = () => {
    dispatch({ type: 'MARK_ALL_AS_READ' });
  };

  const removeNotification = (notificationId) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: notificationId });
  };

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
  };

  const getUnreadCount = () => {
    return notifications.filter(notification => !notification.read).length;
  };

  const getNotificationsByDepartment = (departmentId) => {
    return notifications.filter(notification => 
      notification.department === departmentId || 
      notification.type === 'cross-department'
    );
  };

  const getHighPriorityNotifications = () => {
    return notifications.filter(notification => 
      notification.priority === 'high' && !notification.read
    );
  };

  const value = {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    getUnreadCount,
    getNotificationsByDepartment,
    getHighPriorityNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
