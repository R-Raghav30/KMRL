import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DocumentProvider } from './contexts/DocumentContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import DepartmentDashboard from './pages/DepartmentDashboard';
import SearchPage from './pages/SearchPage';
import NotificationsPage from './pages/NotificationsPage';
import DocumentUpload from './components/DocumentUpload';
import KnowledgeAttritionPage from './pages/KnowledgeAttritionPage';
import DocumentHub from './pages/DocumentHub';
import EngineeringPage from './pages/department/EngineeringPage';
import FinancePage from './pages/department/FinancePage';
import HRPage from './pages/department/HRPage';
import OperationsPage from './pages/department/OperationsPage';
import SafetyPage from './pages/department/SafetyPage'; 



function App() {
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <Router>
      <LanguageProvider>
        <DocumentProvider>
          <NotificationProvider>
            <div className="App">
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/department/:departmentId" element={<DepartmentDashboard />} />
                  <Route path="/department/engineering" element={<EngineeringPage />} />
                  <Route path="/department/finance" element={<FinancePage />} />
                  <Route path="/department/hr" element={<HRPage />} />
                  <Route path="/department/operations" element={<OperationsPage />} />
                  <Route path="/department/safety" element={<SafetyPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/documents" element={<DocumentHub />} /> 
                  <Route path="/settings" element={<div>Settings Page - Coming Soon</div>} />
                  <Route path="/knowledge" element={<KnowledgeAttritionPage />} />
                  <Route path="/knowledge-attrition" element={<KnowledgeAttritionPage />} />
                </Routes>
              </Layout>
              
              {/* Document Upload Modal */}
              {showUploadModal && (
                <DocumentUpload onClose={() => setShowUploadModal(false)} />
              )}
            </div>
          </NotificationProvider>
        </DocumentProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
