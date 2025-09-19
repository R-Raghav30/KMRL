import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  GlobeAltIcon,
  LanguageIcon
} from '@heroicons/react/24/outline';
import { useNotifications } from '../../contexts/NotificationContext';
import { useLanguage } from '../../contexts/LanguageContext';

const Header = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { getUnreadCount } = useNotifications();
  const unreadCount = getUnreadCount();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search page with query parameter
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      // Clear the search input
      setSearchQuery('');
    }
  };

  return (
    <header className="header-kerala">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side */}
        <div className="flex items-center space-x-6">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          {/* Kerala Metro Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <GlobeAltIcon className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-display font-bold text-white">Kerala Metro</h1>
              <p className="text-xs text-white/80">Document Management Portal</p>
            </div>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gov-400" />
              </div>
                  <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-96 pl-12 pr-12 py-3 border-0 rounded-xl leading-5 bg-black/90 backdrop-blur-sm placeholder-gov-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-blue transition-all duration-300"
                  />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gov-400 hover:text-gov-600 transition-colors duration-300"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 flex items-center space-x-2"
                title={`Switch to ${language === 'en' ? 'Malayalam' : 'English'}`}
              >
                <LanguageIcon className="h-5 w-5" />
                <span className="text-sm font-medium hidden sm:block">
                  {language === 'en' ? 'മലയാളം' : 'English'}
                </span>
              </button>

              {/* Notifications */}
              <div className="relative">
                <button className="p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 relative">
                  <BellIcon className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-traditional-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-semibold animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>

              {/* User menu */}
              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-semibold text-white">Dr. Rajesh Kumar</p>
                  <p className="text-xs text-white/80">{t('chiefEngineer')}</p>
                </div>
                <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300">
                  <UserCircleIcon className="h-8 w-8" />
                </button>
              </div>
            </div>
      </div>

      {/* Mobile search bar */}
      <div className="lg:hidden px-6 pb-4">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gov-400" />
            </div>
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-12 pr-12 py-3 border-0 rounded-xl leading-5 bg-white/90 backdrop-blur-sm placeholder-gov-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white transition-all duration-300"
                />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gov-400 hover:text-gov-600 transition-colors duration-300"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
