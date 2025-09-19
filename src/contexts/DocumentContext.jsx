import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { documents as initialDocuments, documentVersions, comments } from '../data/mockData';

const DocumentContext = createContext();

const documentReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DOCUMENT':
      return [...state, { ...action.payload, id: Date.now().toString() }];
    case 'UPDATE_DOCUMENT':
      return state.map(doc =>
        doc.id === action.payload.id ? { ...doc, ...action.payload.updates } : doc
      );
    case 'DELETE_DOCUMENT':
      return state.filter(doc => doc.id !== action.payload);
    case 'ADD_VERSION':
      return state.map(doc =>
        doc.id === action.payload.documentId
          ? { ...doc, version: action.payload.version, lastModified: action.payload.uploadDate }
          : doc
      );
    case 'ADD_COMMENT':
      return state.map(doc =>
        doc.id === action.payload.documentId
          ? { ...doc, comments: [...(doc.comments || []), action.payload.comment] }
          : doc
      );
    case 'LOAD_DOCUMENTS':
      return action.payload;
    default:
      return state;
  }
};

export const DocumentProvider = ({ children }) => {
  const [documents, dispatch] = useReducer(documentReducer, initialDocuments);

  const addDocument = (document) => {
    dispatch({ type: 'ADD_DOCUMENT', payload: document });
  };

  const updateDocument = (documentId, updates) => {
    dispatch({ type: 'UPDATE_DOCUMENT', payload: { id: documentId, updates } });
  };

  const deleteDocument = (documentId) => {
    dispatch({ type: 'DELETE_DOCUMENT', payload: documentId });
  };

  const addVersion = (documentId, versionData) => {
    dispatch({ type: 'ADD_VERSION', payload: { documentId, ...versionData } });
  };

  const addComment = (documentId, comment) => {
    dispatch({ type: 'ADD_COMMENT', payload: { documentId, comment } });
  };

  const getDocumentsByDepartment = (departmentId) => {
    return documents.filter(doc => doc.department === departmentId);
  };

  const getDocumentById = (documentId) => {
    return documents.find(doc => doc.id === documentId);
  };

  const getDocumentVersions = (documentId) => {
    return documentVersions.filter(version => version.documentId === documentId);
  };

  const getDocumentComments = (documentId) => {
    return comments.filter(comment => comment.documentId === documentId);
  };

  const searchDocuments = (query, filters = {}) => {
    let filteredDocs = documents;

    // Text search
    if (query) {
      const searchTerm = query.toLowerCase();
      filteredDocs = filteredDocs.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm) ||
        doc.summary.toLowerCase().includes(searchTerm) ||
        doc.aiSummary.toLowerCase().includes(searchTerm) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Department filter
    if (filters.department) {
      filteredDocs = filteredDocs.filter(doc => doc.department === filters.department);
    }

    // Document type filter
    if (filters.type) {
      filteredDocs = filteredDocs.filter(doc => doc.type === filters.type);
    }

    // Compliance flag filter
    if (filters.complianceFlag) {
      filteredDocs = filteredDocs.filter(doc => 
        doc.complianceFlags.includes(filters.complianceFlag)
      );
    }

    // Date range filter
    if (filters.dateRange) {
      const now = new Date();
      let startDate;
      
      switch (filters.dateRange) {
        case 'last-week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'last-month':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case 'last-quarter':
          startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        case 'last-year':
          startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = null;
      }

      if (startDate) {
        filteredDocs = filteredDocs.filter(doc => 
          new Date(doc.uploadDate) >= startDate
        );
      }
    }

    return filteredDocs;
  };

  const getCrossDepartmentDocuments = (departmentId) => {
    return documents.filter(doc => 
      doc.crossDepartmentRelevance.includes(departmentId)
    );
  };

  const getComplianceDocuments = () => {
    return documents.filter(doc => doc.complianceFlags.length > 0);
  };

  const getRecentDocuments = (limit = 10) => {
    return documents
      .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
      .slice(0, limit);
  };

  const value = useMemo(() => ({
    documents,
    addDocument,
    updateDocument,
    deleteDocument,
    addVersion,
    addComment,
    getDocumentsByDepartment,
    getDocumentById,
    getDocumentVersions,
    getDocumentComments,
    searchDocuments,
    getCrossDepartmentDocuments,
    getComplianceDocuments,
    getRecentDocuments
  }), [documents]);

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
};
