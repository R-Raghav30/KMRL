import React, { useState } from "react";
import { documents } from "../data/mockData";

const DocumentHub = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Filter documents based on search, department, and status
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept =
      departmentFilter === "All Departments" ||
      doc.department === departmentFilter;

    const matchesStatus =
      statusFilter === "All Status" || doc.status === statusFilter;

    return matchesSearch && matchesDept && matchesStatus;
  });

  // Count docs by department and status
  const deptCounts = documents.reduce((acc, doc) => {
    acc[doc.department] = (acc[doc.department] || 0) + 1;
    return acc;
  }, {});

  const statusCounts = documents.reduce((acc, doc) => {
    acc[doc.status] = (acc[doc.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-2">All Documents</h1>
      <p className="text-gray-600 mb-6">
        Browse and manage documents from all departments
      </p>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="🔍 Search documents..."
          className="w-full md:w-1/3 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option>All Departments</option>
          {[...new Set(documents.map((d) => d.department))].map((dept) => (
            <option key={dept}>{dept}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option>All Status</option>
          {[...new Set(documents.map((d) => d.status))].map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>

        <button className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-100">
          ⬇ Sort by date
        </button>
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Document List */}
        <div className="md:col-span-3">
          <h2 className="font-semibold text-lg mb-4">
            Documents ({filteredDocuments.length})
          </h2>

          <div className="flex flex-col gap-4">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="bg-white p-4 rounded-lg shadow border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {doc.department} Department • {doc.fileType.toUpperCase()} •{" "}
                      {doc.fileSize}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">v{doc.version}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700 capitalize">
                    {doc.status}
                  </span>
                  {doc.complianceFlags.map((flag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700"
                    >
                      {flag}
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex justify-between text-sm text-gray-500">
                  <span>👤 {doc.uploadedBy}</span>
                  <span>📅 {doc.uploadDate}</span>
                </div>
              </div>
            ))}

            {filteredDocuments.length === 0 && (
              <p className="text-gray-500 italic">No documents found.</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3">By Department</h3>
            <ul className="space-y-2">
              {Object.entries(deptCounts).map(([dept, count]) => (
                <li key={dept} className="flex justify-between text-sm">
                  <span>{dept}</span>
                  <span className="text-gray-500">{count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3">By Status</h3>
            <ul className="space-y-2">
              {Object.entries(statusCounts).map(([status, count]) => (
                <li key={status} className="flex justify-between text-sm">
                  <span className="capitalize">{status}</span>
                  <span className="text-gray-500">{count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentHub;
