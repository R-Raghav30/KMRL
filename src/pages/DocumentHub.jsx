import React, { useState } from "react";
import { documents } from "../data/mockData";
import {
  BuildingOffice2Icon,
  DocumentIcon,
  FunnelIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const DocumentHub = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept =
      departmentFilter === "All Departments" || doc.department === departmentFilter;
    const matchesStatus =
      statusFilter === "All Status" || doc.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const deptCounts = documents.reduce((acc, doc) => {
    acc[doc.department] = (acc[doc.department] || 0) + 1;
    return acc;
  }, {});
  const statusCounts = documents.reduce((acc, doc) => {
    acc[doc.status] = (acc[doc.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen font-sans">
      {/* Kerala Metro header */}
      <header className="bg-gradient-to-r from-sky-700 to-sky-500 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
            Kerala Metro Document Hub
          </h1>
          <p className="text-sky-100 text-sm mt-1 md:mt-0">
            Smart Access to Official Metro Documents
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="backdrop-blur-sm bg-white/80 border border-sky-200 p-5 rounded-2xl shadow-md mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="🔎 Search by title or uploader..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-sky-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="border border-sky-200 rounded-lg px-4 py-2 focus:ring-sky-500"
            >
              <option>All Departments</option>
              {[...new Set(documents.map((d) => d.department))].map((dept) => (
                <option key={dept}>{dept}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-sky-200 rounded-lg px-4 py-2 focus:ring-sky-500"
            >
              <option>All Status</option>
              {[...new Set(documents.map((d) => d.status))].map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>

            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">
              <FunnelIcon className="h-5 w-5" />
              Sort by Date
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Documents list */}
          <section className="lg:col-span-3">
            <h2 className="text-xl font-semibold text-sky-800 mb-4 flex items-center gap-2">
              <DocumentIcon className="h-6 w-6 text-sky-600" />
              Documents ({filteredDocuments.length})
            </h2>

            <div className="flex flex-col gap-4">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white border border-sky-100 rounded-xl shadow hover:shadow-lg transition p-5"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {doc.department} • {doc.fileType.toUpperCase()} • {doc.fileSize}
                      </p>
                    </div>
                    <span className="text-sm text-sky-700 font-semibold">
                      v{doc.version}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-sky-100 text-sky-700 capitalize">
                      {doc.status}
                    </span>
                    {doc.complianceFlags.map((flag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700"
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
                <p className="text-gray-500 italic text-center">
                  No documents match your filters.
                </p>
              )}
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white border-l-4 border-sky-600 p-4 rounded-xl shadow">
              <h3 className="font-semibold text-sky-700 mb-3 flex items-center gap-2">
                <BuildingOffice2Icon className="h-5 w-5 text-sky-600" />
                By Department
              </h3>
              <ul className="space-y-2 text-sm">
                {Object.entries(deptCounts).map(([dept, count]) => (
                  <li key={dept} className="flex justify-between">
                    <span>{dept}</span>
                    <span className="text-gray-500">{count}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border-l-4 border-sky-600 p-4 rounded-xl shadow">
              <h3 className="font-semibold text-sky-700 mb-3 flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-sky-600" />
                By Status
              </h3>
              <ul className="space-y-2 text-sm">
                {Object.entries(statusCounts).map(([status, count]) => (
                  <li key={status} className="flex justify-between capitalize">
                    <span>{status}</span>
                    <span className="text-gray-500">{count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <footer className="text-center text-gray-500 text-sm py-6 bg-sky-50">
        © 2025 Kerala Metro – Smart Document Hub
      </footer>
    </div>
  );
};

export default DocumentHub;
