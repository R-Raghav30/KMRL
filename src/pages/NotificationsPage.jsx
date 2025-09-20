import React, { useState } from 'react';
import {
  BellIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useNotifications } from '../contexts/NotificationContext';
import { departments } from '../data/mockData';

const NotificationsPage = () => {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
    getUnreadCount,
  } = useNotifications();

  const [filter, setFilter] = useState('all');
  const unreadCount = getUnreadCount();

  const filteredNotifications =
    filter === 'all'
      ? notifications
      : filter === 'unread'
      ? notifications.filter((n) => !n.read)
      : notifications.filter((n) => n.type === filter);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getIcon = (type, priority) => {
    if (priority === 'high')
      return <ExclamationTriangleIcon className="h-7 w-7 text-red-500" />;
    switch (type) {
      case 'compliance':
        return <CheckCircleIcon className="h-7 w-7 text-emerald-500" />;
      case 'deadline':
        return <ClockIcon className="h-7 w-7 text-yellow-500" />;
      case 'cross-department':
        return <InformationCircleIcon className="h-7 w-7 text-sky-500" />;
      default:
        return <BellIcon className="h-7 w-7 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-sky-600 rounded-2xl p-6 shadow-md text-white flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-wide">Metro Notifications</h1>
          <p className="text-sky-100 text-sm">
            Real-time updates from Kerala Metro departments
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            Mark All as Read
          </button>
        )}
      </header>

      {/* Stats */}
      <section className="grid sm:grid-cols-4 gap-6">
        {[
          {
            label: 'Total',
            value: notifications.length,
            color: 'from-sky-500 to-sky-600',
            icon: BellIcon,
          },
          {
            label: 'Unread',
            value: unreadCount,
            color: 'from-red-500 to-red-600',
            icon: ExclamationTriangleIcon,
          },
          {
            label: 'High Priority',
            value: notifications.filter((n) => n.priority === 'high' && !n.read).length,
            color: 'from-yellow-400 to-yellow-500',
            icon: ClockIcon,
          },
          {
            label: 'Action Required',
            value: notifications.filter((n) => n.actionRequired && !n.read).length,
            color: 'from-emerald-500 to-emerald-600',
            icon: CheckCircleIcon,
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-5 text-white shadow-md bg-gradient-to-br ${stat.color} flex items-center`}
          >
            <stat.icon className="h-8 w-8 opacity-90" />
            <div className="ml-4">
              <p className="text-sm uppercase tracking-wide opacity-90">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-3">
        {[
          { value: 'all', label: 'All' },
          { value: 'unread', label: 'Unread' },
          { value: 'compliance', label: 'Compliance' },
          { value: 'deadline', label: 'Deadlines' },
          { value: 'cross-department', label: 'Cross-Dept' },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              filter === f.value
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notifications */}
      <section className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((n) => (
            <div
              key={n.id}
              className={`bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition relative ${
                n.read ? 'opacity-80' : ''
              }`}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">{getIcon(n.type, n.priority)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3
                        className={`text-base font-semibold ${
                          n.read ? 'text-gray-600' : 'text-gray-900'
                        }`}
                      >
                        {n.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-700">{n.message}</p>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500">
                        <span>
                          {departments.find((d) => d.id === n.department)?.name}
                        </span>
                        <span>• {formatTimestamp(n.timestamp)}</span>
                        {n.actionRequired && (
                          <span className="text-emerald-600 font-medium">Action Required</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!n.read && (
                        <button
                          onClick={() => markAsRead(n.id)}
                          className="text-xs font-medium text-emerald-600 hover:underline"
                        >
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => removeNotification(n.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white/70 rounded-2xl border border-gray-200 shadow-sm">
            <BellIcon className="mx-auto h-10 w-10 text-gray-400" />
            <h3 className="mt-3 text-lg font-semibold text-gray-700">
              No {filter === 'all' ? '' : filter} notifications
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You’re all caught up with Kerala Metro updates.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default NotificationsPage;
