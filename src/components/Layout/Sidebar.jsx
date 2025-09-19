import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  DocumentTextIcon, 
  BellIcon, 
  MagnifyingGlassIcon,
  CogIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
  ClipboardDocumentListIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  DocumentArrowUpIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { departments } from '../../data/mockData';
import { useNotifications } from '../../contexts/NotificationContext';
import { useLanguage } from '../../contexts/LanguageContext';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { getUnreadCount } = useNotifications();
  const unreadCount = getUnreadCount();
  const { t } = useLanguage();

  const navigation = [
    { name: t('dashboard'), href: '/', icon: HomeIcon, description: 'Overview & Analytics' },
    { name: t('documentHub'), href: '/documents', icon: DocumentTextIcon, description: 'All Documents' },
    { name: t('smartSearch'), href: '/search', icon: MagnifyingGlassIcon, description: 'AI-Powered Search' },
    { name: t('notifications'), href: '/notifications', icon: BellIcon, badge: unreadCount, description: 'Alerts & Updates' },
    { name: t('knowledgeAttrition'), href: '/knowledge', icon: AcademicCapIcon, description: 'Living Knowledge Base & RAG Q&A' },
    { name: t('analytics'), href: '/analytics', icon: ChartBarIcon, description: 'Reports & Insights' },
    { name: t('settings'), href: '/settings', icon: CogIcon, description: 'System Configuration' },
  ];

  const departmentNavigation = departments.map(dept => ({
    name: t(dept.id),
    href: `/department/${dept.id}`,
    icon: dept.id === 'engineering' ? WrenchScrewdriverIcon :
          dept.id === 'procurement' ? ClipboardDocumentListIcon :
          dept.id === 'hr' ? UserGroupIcon :
          dept.id === 'safety' ? ShieldCheckIcon : BuildingOfficeIcon,
    color: dept.id === 'engineering' ? 'bg-kerala-500' :
           dept.id === 'procurement' ? 'bg-metro-500' :
           dept.id === 'hr' ? 'bg-traditional-500' :
           dept.id === 'safety' ? 'bg-gov-600' : 'bg-gov-500',
    description: dept.description
  }));

  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gov-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-center h-20 px-6 bg-kerala-gradient">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <BuildingOfficeIcon className="h-7 w-7 text-white" />
              </div>
              <div className="text-white">
                <h1 className="text-xl font-display font-bold">Kerala Metro</h1>
                <p className="text-xs text-white/80">Document Management</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-8 space-y-6 overflow-y-auto">
            {/* Main Navigation */}
            <div className="space-y-2">
              <h3 className="px-3 text-xs font-semibold text-gov-500 uppercase tracking-wider mb-4">
                Main Navigation
              </h3>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-300
                    ${isActive(item.href)
                      ? 'bg-kerala-100 text-kerala-700 border-r-4 border-kerala-500 shadow-kerala'
                      : 'text-gov-700 hover:bg-kerala-50 hover:text-kerala-700 hover:shadow-md'
                    }
                  `}
                  onClick={onClose}
                >
                  <item.icon className={`mr-4 h-5 w-5 flex-shrink-0 ${isActive(item.href) ? 'text-kerala-600' : 'text-gov-500 group-hover:text-kerala-600'}`} />
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-gov-500 group-hover:text-kerala-500">{item.description}</div>
                  </div>
                  {item.badge && item.badge > 0 && (
                    <span className="ml-auto bg-traditional-500 text-white text-xs rounded-full px-2 py-1 min-w-[24px] text-center font-semibold animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Departments */}
                <div className="space-y-2 pt-6 border-t border-gov-200">
                  <h3 className="px-3 text-xs font-semibold text-gov-500 uppercase tracking-wider mb-4">
                    {t('departments')}
                  </h3>
              {departmentNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-300
                    ${isActive(item.href)
                      ? 'bg-kerala-100 text-kerala-700 border-r-4 border-kerala-500 shadow-kerala'
                      : 'text-gov-700 hover:bg-kerala-50 hover:text-kerala-700 hover:shadow-md'
                    }
                  `}
                  onClick={onClose}
                >
                  <div className={`mr-4 h-8 w-8 rounded-xl ${item.color} flex items-center justify-center shadow-md`}>
                    <item.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-gov-500 group-hover:text-kerala-500 line-clamp-1">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </nav>

          {/* User Info */}
          <div className="p-6 border-t border-gov-200 bg-gov-50">
            <div className="flex items-center space-x-4">
              <img
                className="h-12 w-12 rounded-2xl shadow-md"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                alt="User avatar"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gov-900 truncate">
                  Dr. Rajesh Kumar
                </p>
                <p className="text-xs text-gov-600 truncate">
                  Chief Engineer
                </p>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-kerala-500 rounded-full mr-2"></div>
                  <span className="text-xs text-kerala-600 font-medium">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
