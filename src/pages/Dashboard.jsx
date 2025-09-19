// src/pages/Dashboard.jsx
import React from "react";
import {
  DocumentTextIcon,
  BellIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const documents = [
    { name: "Safety Policy", type: "PDF" },
    { name: "Training Manual", type: "DOC" },
    { name: "Budget Report", type: "XLS" },
    { name: "Project Plan", type: "PPT" },
    { name: "Notes", type: "TXT" },
    { name: "Metro Station Map", type: "IMG" },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-700 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-extrabold">🚆 Kochi Metro Document Hub</h1>
        <p className="text-lg text-teal-100">
          Smart Knowledge & Compliance Platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border-l-4 border-teal-600 rounded-xl shadow-md p-6 bg-white">
          <div className="flex items-center space-x-4">
            <div className="bg-teal-500 text-white p-3 rounded-full shadow-lg">
              <DocumentTextIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Total Documents
              </h3>
              <p className="text-2xl font-extrabold text-teal-600">245</p>
              <p className="text-sm text-gray-500">+12% from last month</p>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-yellow-500 rounded-xl shadow-md p-6 bg-white">
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-500 text-white p-3 rounded-full shadow-lg">
              <ShieldCheckIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Compliance Score
              </h3>
              <p className="text-2xl font-extrabold text-yellow-600">92%</p>
              <p className="text-sm text-gray-500">Well above threshold</p>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-blue-600 rounded-xl shadow-md p-6 bg-white">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg">
              <UserGroupIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Active Users</h3>
              <p className="text-2xl font-extrabold text-blue-600">58</p>
              <p className="text-sm text-gray-500">+5 new this week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Documents - Metro Line Style */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          📑 Recent Documents
        </h2>
        <div className="relative border-l-4 border-teal-500 pl-6 space-y-6">
          <div className="flex items-center space-x-4">
            <CheckCircleIcon className="h-6 w-6 text-green-500 absolute -left-3 bg-white rounded-full" />
            <div>
              <p className="font-semibold text-gray-800">Safety Policy.pdf</p>
              <p className="text-sm text-gray-500">Approved • 2 days ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ClockIcon className="h-6 w-6 text-yellow-500 absolute -left-3 bg-white rounded-full" />
            <div>
              <p className="font-semibold text-gray-800">Training Manual.docx</p>
              <p className="text-sm text-gray-500">Pending • 5 days ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <XCircleIcon className="h-6 w-6 text-red-500 absolute -left-3 bg-white rounded-full" />
            <div>
              <p className="font-semibold text-gray-800">Budget Report.xlsx</p>
              <p className="text-sm text-gray-500">Rejected • 1 week ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-gray-900 rounded-2xl p-6 shadow-lg text-white">
        <h2 className="text-xl font-bold mb-4">🔔 Notifications</h2>
        <ul className="space-y-3">
          <li className="flex items-center space-x-3">
            <BellIcon className="h-5 w-5 text-yellow-400" />
            <span>Policy Update required by HR Department</span>
          </li>
          <li className="flex items-center space-x-3">
            <BellIcon className="h-5 w-5 text-red-400" />
            <span>Compliance Alert: Document Expired</span>
          </li>
        </ul>
      </div>

      {/* All Document Types */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Document Types Overview
            </h2>
            <p className="text-gray-600 mt-1">
              Distribution of document types across the system
            </p>
          </div>
          <DocumentTextIcon className="h-8 w-8 text-teal-600" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {["PDF", "DOC", "XLS", "PPT", "TXT", "IMG"].map((type, index) => {
            const typeDocs = documents.filter((doc) => doc.type === type);
            const count = typeDocs.length;
            const colors = [
              "bg-teal-500",
              "bg-blue-500",
              "bg-yellow-500",
              "bg-green-600",
              "bg-red-500",
              "bg-purple-500",
            ];
            return (
              <div
                key={type}
                className="p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl ${colors[index]} shadow-md`}
                  >
                    <DocumentTextIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {count}
                  </span>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {type} Documents
                  </p>
                  <p className="text-sm text-gray-600">
                    {Math.round((count / documents.length) * 100)}% of total
                    documents
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
