import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  DocumentTextIcon,
  ClockIcon,
  TagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useDocuments } from "../contexts/DocumentContext";
import { departments, searchFilters } from "../data/mockData";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    department: "",
    type: "",
    dateRange: "",
    complianceFlag: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const { searchDocuments } = useDocuments();

  useEffect(() => {
    const queryFromUrl = searchParams.get("q");
    if (queryFromUrl) setSearchQuery(queryFromUrl);
  }, [searchParams]);

  useEffect(() => {
    if (searchQuery || Object.values(filters).some((f) => f)) {
      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, filters]);

  const performSearch = async () => {
    setIsSearching(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const results = searchDocuments(searchQuery, filters);
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleFilterChange = (key, val) =>
    setFilters((p) => ({ ...p, [key]: val }));

  const clearFilters = () => {
    setFilters({ department: "", type: "", dateRange: "", complianceFlag: "" });
    setSearchQuery("");
    setSearchParams({});
  };

  const activeCount = Object.values(filters).filter(Boolean).length;

  const highlight = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(
      regex,
      '<mark class="bg-emerald-200 text-emerald-900">$1</mark>'
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl p-6 shadow-md">
        <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-wide">
          Kerala Metro Document Finder
        </h1>
        <p className="text-emerald-100 mt-1 text-sm">
          Search across all departments, summaries & compliance flags
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-md p-5 border border-emerald-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-emerald-500" />
              <input
                type="text"
                placeholder="Search documents, tags, or keywords..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim()) {
                    setSearchParams({ q: e.target.value.trim() });
                  } else setSearchParams({});
                }}
                className="w-full pl-10 pr-3 py-3 rounded-lg border border-emerald-300 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 placeholder-gray-400"
              />
              {isSearching && (
                <div className="absolute right-3 top-3">
                  <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition ${
                showFilters || activeCount
                  ? "bg-emerald-50 border-emerald-400 text-emerald-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <FunnelIcon className="h-5 w-5" />
              Filters
              {activeCount > 0 && (
                <span className="bg-emerald-600 text-white text-xs rounded-full px-2 py-0.5">
                  {activeCount}
                </span>
              )}
            </button>
            {activeCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-emerald-700 hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-gray-200 pt-6">
            <FilterSelect
              label="Department"
              value={filters.department}
              onChange={(v) => handleFilterChange("department", v)}
              options={searchFilters.departments}
            />
            <FilterSelect
              label="Document Type"
              value={filters.type}
              onChange={(v) => handleFilterChange("type", v)}
              options={searchFilters.documentTypes}
            />
            <FilterSelect
              label="Date Range"
              value={filters.dateRange}
              onChange={(v) => handleFilterChange("dateRange", v)}
              options={searchFilters.dateRanges}
            />
            <FilterSelect
              label="Compliance Flag"
              value={filters.complianceFlag}
              onChange={(v) => handleFilterChange("complianceFlag", v)}
              options={searchFilters.complianceFlags}
            />
          </div>
        )}
      </div>

      {/* Results */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-emerald-100">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-emerald-700">
            Search Results
          </h2>
          <span className="text-sm text-gray-500">
            {searchResults.length} document
            {searchResults.length !== 1 && "s"} found
          </span>
        </div>

        {searchResults.length > 0 ? (
          <div className="space-y-6">
            {searchResults.map((doc) => (
              <div
                key={doc.id}
                className="border border-emerald-200 rounded-xl p-5 hover:shadow-lg transition bg-emerald-50/40"
              >
                <div className="flex gap-4">
                  <img
                    src={doc.thumbnail}
                    alt={doc.title}
                    className="h-20 w-24 object-cover rounded-lg border border-emerald-200"
                  />
                  <div className="flex-1">
                    <h3
                      className="text-lg font-semibold text-gray-900 mb-2"
                      dangerouslySetInnerHTML={{
                        __html: highlight(doc.title, searchQuery),
                      }}
                    />
                    <p
                      className="text-sm text-gray-700 mb-3 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: highlight(doc.summary, searchQuery),
                      }}
                    />

                    {/* AI Summary */}
                    <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3 mb-3">
                      <p
                        className="text-sm text-cyan-800"
                        dangerouslySetInnerHTML={{
                          __html: highlight(doc.aiSummary, searchQuery),
                        }}
                      />
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-5 text-xs text-gray-600 mb-2">
                      <Meta icon={<DocumentTextIcon />} text={departments.find(d => d.id === doc.department)?.name} />
                      <Meta icon={<ClockIcon />} text={doc.uploadDate} />
                      <Meta icon={<UserIcon />} text={`Version ${doc.version}`} />
                      <span>{doc.size}</span>
                    </div>

                    {/* Tags */}
                    {doc.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {doc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs"
                            dangerouslySetInnerHTML={{
                              __html: highlight(tag, searchQuery),
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Flags */}
                    {doc.complianceFlags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {doc.complianceFlags.map((flag) => (
                          <span
                            key={flag}
                            className="inline-flex items-center px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs"
                          >
                            <TagIcon className="h-3 w-3 mr-1" />
                            {flag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="px-3 py-1 bg-emerald-600 text-white text-xs rounded-full">
                      {doc.type}
                    </span>
                    <div className="flex gap-2">
                      <button className="text-sm text-emerald-700 hover:underline">
                        View
                      </button>
                      <button className="text-sm text-gray-700 hover:underline">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No documents found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery || activeCount
                ? "Try adjusting search terms or filters"
                : "Enter a search term or apply filters to start"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const FilterSelect = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-emerald-800 mb-1">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-emerald-300 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-sm"
    >
      <option value="">All</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const Meta = ({ icon, text }) => (
  <div className="flex items-center gap-1">
    {React.cloneElement(icon, { className: "h-4 w-4 text-emerald-500" })}
    <span>{text}</span>
  </div>
);

export default SearchPage;
