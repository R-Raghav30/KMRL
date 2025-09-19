import React, { useState } from "react";
import { documents } from "../../data/mockData";

const HRPage = () => {
  const [search, setSearch] = useState("");

  const filteredDocs = documents.filter(
    (doc) =>
      doc.department === "HumanResources" &&
      (doc.title.toLowerCase().includes(search.toLowerCase()) ||
        doc.uploadedBy.toLowerCase().includes(search.toLowerCase()) ||
        doc.status.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700">Human Resources</h1>
      <p className="text-gray-600 mb-4">Showing all HR documents</p>

      <input
        type="text"
        placeholder="Search documents..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg shadow-sm mb-4"
      />

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Uploaded By</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Version</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocs.length > 0 ? (
              filteredDocs.map((doc) => (
                <tr key={doc.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{doc.title}</td>
                  <td className="px-4 py-2">{doc.uploadedBy}</td>
                  <td className="px-4 py-2">{doc.uploadDate}</td>
                  <td className="px-4 py-2">{doc.version}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      doc.status === "approved"
                        ? "text-green-600"
                        : doc.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {doc.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No matching documents found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HRPage;
