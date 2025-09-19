import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  DocumentTextIcon,
  ClockIcon,
  TagIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { useDocuments } from '../contexts/DocumentContext';
import { departments, searchFilters } from '../data/mockData';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    type: '',
    dateRange: '',
    complianceFlag: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  const { searchDocuments } = useDocuments();

  // Handle URL query parameter
  useEffect(() => {
    const queryFromUrl = searchParams.get('q');
    if (queryFromUrl) {
      setSearchQuery(queryFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchQuery || Object.values(filters).some(filter => filter)) {
      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, filters]);

  const performSearch = async () => {
    setIsSearching(true);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const results = searchDocuments(searchQuery, filters);
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      department: '',
      type: '',
      dateRange: '',
      complianceFlag: ''
    });
    setSearchQuery('');
    setSearchParams({});
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(filter => filter).length;
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Document Search</h1>
        <p className="mt-1 text-sm text-gray-500">
          Search across all documents, summaries, and metadata
        </p>
      </div>

      {/* Search Bar */}
      <div className="card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search documents, summaries, keywords, or tags..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  // Update URL with search query
                  if (e.target.value.trim()) {
                    setSearchParams({ q: e.target.value.trim() });
                  } else {
                    setSearchParams({});
                  }
                }}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
              {isSearching && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
                showFilters || getActiveFiltersCount() > 0
                  ? 'bg-primary-50 border-primary-300 text-primary-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FunnelIcon className="h-5 w-5" />
              <span>Filters</span>
              {getActiveFiltersCount() > 0 && (
                <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {getActiveFiltersCount()}
                </span>
              )}
            </button>
            
            {getActiveFiltersCount() > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-600 hover:text-gray-800 font-medium"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <select
                  value={filters.department}
                  onChange={(e) => handleFilterChange('department', e.target.value)}
                  className="input-field"
                >
                  <option value="">All Departments</option>
                  {searchFilters.departments.map(dept => (
                    <option key={dept.value} value={dept.value}>
                      {dept.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="input-field"
                >
                  <option value="">All Types</option>
                  {searchFilters.documentTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  className="input-field"
                >
                  <option value="">All Time</option>
                  {searchFilters.dateRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compliance Flag
                </label>
                <select
                  value={filters.complianceFlag}
                  onChange={(e) => handleFilterChange('complianceFlag', e.target.value)}
                  className="input-field"
                >
                  <option value="">All Documents</option>
                  {searchFilters.complianceFlags.map(flag => (
                    <option key={flag.value} value={flag.value}>
                      {flag.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Results */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Search Results
          </h2>
          <span className="text-sm text-gray-500">
            {searchResults.length} document{searchResults.length !== 1 ? 's' : ''} found
          </span>
        </div>

        {searchResults.length > 0 ? (
          <div className="space-y-6">
            {searchResults.map((doc) => (
              <div key={doc.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <img 
                    src={doc.thumbnail} 
                    alt={doc.title}
                    className="h-20 w-24 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 
                          className="text-lg font-medium text-gray-900 mb-2"
                          dangerouslySetInnerHTML={{ 
                            __html: highlightText(doc.title, searchQuery) 
                          }}
                        />
                        <p 
                          className="text-sm text-gray-600 mb-3 line-clamp-2"
                          dangerouslySetInnerHTML={{ 
                            __html: highlightText(doc.summary, searchQuery) 
                          }}
                        />
                        
                        {/* AI Summary */}
                        <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            <span className="text-xs font-medium text-blue-700">AI Summary</span>
                          </div>
                          <p 
                            className="text-sm text-blue-800"
                            dangerouslySetInnerHTML={{ 
                              __html: highlightText(doc.aiSummary, searchQuery) 
                            }}
                          />
                        </div>
                        
                        {/* Metadata */}
                        <div className="flex items-center space-x-6 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <DocumentTextIcon className="h-4 w-4" />
                            <span>{departments.find(d => d.id === doc.department)?.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ClockIcon className="h-4 w-4" />
                            <span>{doc.uploadDate}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <UserIcon className="h-4 w-4" />
                            <span>Version {doc.version}</span>
                          </div>
                          <span>{doc.size}</span>
                        </div>
                        
                        {/* Tags */}
                        {doc.tags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {doc.tags.map((tag) => (
                              <span 
                                key={tag}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                                dangerouslySetInnerHTML={{ 
                                  __html: highlightText(tag, searchQuery) 
                                }}
                              />
                            ))}
                          </div>
                        )}
                        
                        {/* Compliance Flags */}
                        {doc.complianceFlags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {doc.complianceFlags.map((flag) => (
                              <span key={flag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                <TagIcon className="h-3 w-3 mr-1" />
                                {flag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          {doc.type}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
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
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No documents found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery || getActiveFiltersCount() > 0
                ? 'Try adjusting your search terms or filters'
                : 'Enter a search term or apply filters to find documents'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
