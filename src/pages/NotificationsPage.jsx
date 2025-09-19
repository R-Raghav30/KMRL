import React, { useState } from 'react';
import { 
  BellIcon, 
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useNotifications } from '../contexts/NotificationContext';
import { departments } from '../data/mockData';

const NotificationsPage = () => {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    removeNotification,
    getUnreadCount 
  } = useNotifications();
  
  const [filter, setFilter] = useState('all');
  const unreadCount = getUnreadCount();

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === filter);

  const getNotificationIcon = (type, priority) => {
    if (priority === 'high') {
      return <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />;
    }
    
    switch (type) {
      case 'compliance':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case 'deadline':
        return <ClockIcon className="h-6 w-6 text-yellow-500" />;
      case 'cross-department':
        return <InformationCircleIcon className="h-6 w-6 text-blue-500" />;
      default:
        return <BellIcon className="h-6 w-6 text-gray-500" />;
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') {
      return 'bg-red-50 border-red-200';
    }
    
    switch (type) {
      case 'compliance':
        return 'bg-green-50 border-green-200';
      case 'deadline':
        return 'bg-yellow-50 border-yellow-200';
      case 'cross-department':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-1 text-sm text-gray-500">
            Stay updated with important alerts and cross-department activities
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="btn-secondary"
            >
              Mark All as Read
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-500">
              <BellIcon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total</p>
              <p className="text-2xl font-semibold text-gray-900">{notifications.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-red-500">
              <ExclamationTriangleIcon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Unread</p>
              <p className="text-2xl font-semibold text-gray-900">{unreadCount}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-500">
              <ClockIcon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">High Priority</p>
              <p className="text-2xl font-semibold text-gray-900">
                {notifications.filter(n => n.priority === 'high' && !n.read).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-500">
              <CheckCircleIcon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Action Required</p>
              <p className="text-2xl font-semibold text-gray-900">
                {notifications.filter(n => n.actionRequired && !n.read).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filter:</span>
          <div className="flex space-x-2">
            {[
              { value: 'all', label: 'All' },
              { value: 'unread', label: 'Unread' },
              { value: 'compliance', label: 'Compliance' },
              { value: 'deadline', label: 'Deadlines' },
              { value: 'cross-department', label: 'Cross-Department' }
            ].map((filterOption) => (
              <button
                key={filterOption.value}
                onClick={() => setFilter(filterOption.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  filter === filterOption.value
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`card border-l-4 ${
                notification.read ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type, notification.priority)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className={`text-sm font-medium ${
                          notification.read ? 'text-gray-600' : 'text-gray-900'
                        }`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary-500 rounded-full" />
                        )}
                        {notification.priority === 'high' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                            High Priority
                          </span>
                        )}
                      </div>
                      
                      <p className={`mt-1 text-sm ${
                        notification.read ? 'text-gray-500' : 'text-gray-700'
                      }`}>
                        {notification.message}
                      </p>
                      
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                        <span>
                          {departments.find(d => d.id === notification.department)?.name}
                        </span>
                        <span>•</span>
                        <span>{formatTimestamp(notification.timestamp)}</span>
                        {notification.actionRequired && (
                          <>
                            <span>•</span>
                            <span className="text-yellow-600 font-medium">Action Required</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <BellIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'all' 
                ? 'You have no notifications yet.'
                : `No ${filter} notifications found.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
