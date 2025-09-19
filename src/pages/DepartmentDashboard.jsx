import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  DocumentTextIcon, 
  BellIcon, 
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowRightIcon,
  PlusIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { useDocuments } from '../contexts/DocumentContext';
import { useNotifications } from '../contexts/NotificationContext';
import { departments, complianceFlags } from '../data/mockData';

const DepartmentDashboard = () => {
  const { departmentId } = useParams();
  const [filter, setFilter] = useState('all');
  
  const { 
    getDocumentsByDepartment, 
    getCrossDepartmentDocuments, 
    getComplianceDocuments 
  } = useDocuments();
  
  const { getNotificationsByDepartment } = useNotifications();
  
  const department = departments.find(d => d.id === departmentId);
  const departmentDocuments = getDocumentsByDepartment(departmentId);
  const crossDepartmentDocs = getCrossDepartmentDocuments(departmentId);
  const notifications = getNotificationsByDepartment(departmentId);
  const complianceDocs = getComplianceDocuments().filter(doc => 
    doc.department === departmentId || doc.crossDepartmentRelevance.includes(departmentId)
  );

  // Debug logging
  console.log('DepartmentDashboard Debug:', {
    departmentId,
    department,
    departmentDocuments: departmentDocuments.length,
    crossDepartmentDocs: crossDepartmentDocs.length,
    notifications: notifications.length,
    complianceDocs: complianceDocs.length
  });

  const filteredDocuments = filter === 'all' 
    ? departmentDocuments 
    : filter === 'compliance' 
    ? complianceDocs 
    : departmentDocuments.filter(doc => doc.type === filter.toUpperCase());

  const stats = [
    {
      name: 'Department Documents',
      value: departmentDocuments.length.toString(),
      icon: DocumentTextIcon,
      color: 'bg-blue-500'
    },
    {
      name: 'Pending Reviews',
      value: notifications.filter(n => !n.read && n.actionRequired).length.toString(),
      icon: ClockIcon,
      color: 'bg-yellow-500'
    },
    {
      name: 'Compliance Items',
      value: complianceDocs.length.toString(),
      icon: ExclamationTriangleIcon,
      color: 'bg-red-500'
    },
    {
      name: 'Cross-Department',
      value: crossDepartmentDocs.length.toString(),
      icon: ArrowRightIcon,
      color: 'bg-green-500'
    }
  ];

  if (!department) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Department not found</h1>
        <p className="mt-2 text-gray-500">The requested department does not exist.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Department Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`p-4 rounded-xl ${department.color}`}>
            <span className="text-white text-2xl">{department.icon}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{department.name}</h1>
            <p className="text-gray-500">{department.description}</p>
          </div>
        </div>
        <button className="bg-kerala-gradient hover:shadow-kerala text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
          <PlusIcon className="h-5 w-5" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl shadow-gov border border-gov-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filter:</span>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gov-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-kerala-500 focus:border-kerala-500 transition-all duration-300 w-auto"
          >
            <option value="all">All Documents</option>
            <option value="compliance">Compliance</option>
            <option value="pdf">PDF</option>
            <option value="doc">Word</option>
            <option value="xls">Excel</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/search" className="border-2 border-kerala-500 text-kerala-600 hover:bg-kerala-500 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300">
            Advanced Search
          </Link>
          <Link to="/notifications" className="bg-kerala-gradient hover:shadow-kerala text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
            View Notifications
          </Link>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Documents List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-gov border border-gov-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {filter === 'all' ? 'Department Documents' : 
                 filter === 'compliance' ? 'Compliance Documents' : 
                 `${filter.toUpperCase()} Documents`}
              </h2>
              <span className="text-sm text-gray-500">
                {filteredDocuments.length} documents
              </span>
            </div>
            <div className="space-y-4">
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={doc.thumbnail} 
                        alt={doc.title}
                        className="h-16 w-20 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                              {doc.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {doc.summary}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>Version {doc.version}</span>
                              <span>•</span>
                              <span>{doc.uploadDate}</span>
                              <span>•</span>
                              <span>{doc.size}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-kerala-100 text-kerala-800">
                              {doc.type}
                            </span>
                            {doc.complianceFlags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {doc.complianceFlags.slice(0, 2).map((flag) => (
                                  <span key={flag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                    {complianceFlags.find(f => f.id === flag)?.name || flag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">AI Summary:</span>
                            <span className="text-sm text-gray-700 line-clamp-1">
                              {doc.aiSummary}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="text-sm text-kerala-600 hover:text-kerala-700 font-medium">
                              View Details
                            </button>
                            <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No documents found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {filter === 'all' 
                      ? 'No documents in this department yet.'
                      : `No ${filter} documents found.`
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-2xl shadow-gov border border-gov-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              <span className="text-sm text-gray-500">
                {notifications.filter(n => !n.read).length} unread
              </span>
            </div>
            <div className="space-y-3">
              {notifications.slice(0, 5).map((notification) => (
                <div key={notification.id} className={`p-3 rounded-lg border ${
                  notification.read ? 'bg-gray-50 border-gray-200' : 'bg-white border-red-200'
                }`}>
                  <div className="flex items-start">
                    <BellIcon className={`h-5 w-5 mt-0.5 ${
                      notification.priority === 'high' ? 'text-red-500' : 'text-gray-400'
                    }`} />
                    <div className="ml-3 flex-1">
                      <p className={`text-sm font-medium ${
                        notification.read ? 'text-gray-700' : 'text-gray-900'
                      }`}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.message}
                      </p>
                      {notification.actionRequired && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mt-2">
                          Action Required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cross-Department Documents */}
          {crossDepartmentDocs.length > 0 && (
            <div className="bg-white rounded-2xl shadow-gov border border-gov-200 p-6 hover:shadow-lg transition-all duration-300">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Cross-Department Documents
              </h2>
              <div className="space-y-3">
                {crossDepartmentDocs.slice(0, 3).map((doc) => (
                  <div key={doc.id} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <img 
                        src={doc.thumbnail} 
                        alt={doc.title}
                        className="h-10 w-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-blue-900 truncate">
                          {doc.title}
                        </p>
                        <p className="text-xs text-blue-600">
                          From {departments.find(d => d.id === doc.department)?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentDashboard;
