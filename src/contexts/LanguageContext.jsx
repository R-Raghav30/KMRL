import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

// Malayalam translations
const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    documentHub: 'Document Hub',
    smartSearch: 'Smart Search',
    notifications: 'Notifications',
    knowledgeAttrition: 'Knowledge Attrition',
    analytics: 'Analytics',
    settings: 'Settings',
    
    // Departments
    engineering: 'Engineering',
    procurement: 'Procurement',
    humanResources: 'Human Resources',
    safety: 'Safety',
    
    // Dashboard
    welcomeMessage: 'Welcome to KMRL Document Management System',
    totalDocuments: 'Total Documents',
    pendingReviews: 'Pending Reviews',
    complianceScore: 'Compliance Score',
    documentsThisWeek: 'Documents This Week',
    recentDocuments: 'Recent Documents',
    departmentStatus: 'Department Status',
    priorityAlerts: 'Priority Alerts',
    departments: 'Departments',
    
    // Common
    viewAll: 'View All',
    search: 'Search',
    searchPlaceholder: 'Search documents, summaries, or keywords...',
    adminUser: 'Admin User',
    chiefEngineer: 'Chief Engineer',
    online: 'Online',
    
    // Knowledge Attrition
    knowledgeAttritionPrevention: 'Knowledge Attrition Prevention',
    livingKnowledgeBase: 'Living Knowledge Base with RAG Q&A Layer - Preserving institutional knowledge through AI',
    ragQAChat: 'RAG Q&A Chat',
    exitInterviews: 'Exit Interviews',
    knowledgeGraph: 'Knowledge Graph',
    techStack: 'Tech Stack',
    documentsProcessed: 'Documents Processed',
    exitInterviewsCount: 'Exit Interviews',
    knowledgeNodes: 'Knowledge Nodes',
    qaPairs: 'Q&A Pairs',
    
    // Buttons
    send: 'Send',
    scheduleInterview: 'Schedule Interview',
    viewTranscript: 'View Transcript',
    downloadAudio: 'Download Audio',
    
    // Status
    processed: 'Processed',
    processing: 'Processing',
    active: 'Active',
    highPriority: 'High Priority',
    underReview: 'Under Review',
    approved: 'Approved',
    pending: 'Pending'
  },
  ml: {
    // Navigation
    dashboard: 'ഡാഷ്ബോർഡ്',
    documentHub: 'ഡോക്യുമെന്റ് ഹബ്',
    smartSearch: 'സ്മാർട്ട് തിരയൽ',
    notifications: 'അറിയിപ്പുകൾ',
    knowledgeAttrition: 'അറിവ് നഷ്ടം',
    analytics: 'വിശകലനം',
    settings: 'ക്രമീകരണങ്ങൾ',
    
    // Departments
    engineering: 'എഞ്ചിനീയറിംഗ്',
    procurement: 'സാധനസാമഗ്രി',
    humanResources: 'മാനവവിഭവങ്ങൾ',
    safety: 'സുരക്ഷ',
    
    // Dashboard
    welcomeMessage: 'KMRL ഡോക്യുമെന്റ് മാനേജ്മെന്റ് സിസ്റ്റത്തിലേക്ക് സ്വാഗതം',
    totalDocuments: 'മൊത്തം ഡോക്യുമെന്റുകൾ',
    pendingReviews: 'താമസിച്ച അവലോകനങ്ങൾ',
    complianceScore: 'കംപ്ലയൻസ് സ്കോർ',
    documentsThisWeek: 'ഈ ആഴ്ചയിലെ ഡോക്യുമെന്റുകൾ',
    recentDocuments: 'സമീപകാല ഡോക്യുമെന്റുകൾ',
    departmentStatus: 'വകുപ്പ് നില',
    priorityAlerts: 'പ്രാധാന്യ അലേർട്ടുകൾ',
    departments: 'വകുപ്പുകൾ',
    
    // Common
    viewAll: 'എല്ലാം കാണുക',
    search: 'തിരയുക',
    searchPlaceholder: 'ഡോക്യുമെന്റുകൾ, സംഗ്രഹങ്ങൾ അല്ലെങ്കിൽ കീവേഡുകൾ തിരയുക...',
    adminUser: 'അഡ്മിൻ ഉപയോക്താവ്',
    chiefEngineer: 'മുഖ്യ എഞ്ചിനീയർ',
    online: 'ഓൺലൈൻ',
    
    // Knowledge Attrition
    knowledgeAttritionPrevention: 'അറിവ് നഷ്ടം തടയൽ',
    livingKnowledgeBase: 'RAG Q&A ലെയറുള്ള ലിവിംഗ് നോളജ് ബേസ് - AI വഴി സ്ഥാപന അറിവ് സംരക്ഷിക്കൽ',
    ragQAChat: 'RAG Q&A ചാറ്റ്',
    exitInterviews: 'പുറപ്പെടൽ അഭിമുഖങ്ങൾ',
    knowledgeGraph: 'അറിവ് ഗ്രാഫ്',
    techStack: 'ടെക് സ്റ്റാക്ക്',
    documentsProcessed: 'പ്രോസസ്സ് ചെയ്ത ഡോക്യുമെന്റുകൾ',
    exitInterviewsCount: 'പുറപ്പെടൽ അഭിമുഖങ്ങൾ',
    knowledgeNodes: 'അറിവ് നോഡുകൾ',
    qaPairs: 'Q&A ജോഡികൾ',
    
    // Buttons
    send: 'അയയ്ക്കുക',
    scheduleInterview: 'അഭിമുഖം ഷെഡ്യൂൾ ചെയ്യുക',
    viewTranscript: 'ട്രാൻസ്ക്രിപ്റ്റ് കാണുക',
    downloadAudio: 'ഓഡിയോ ഡൗൺലോഡ് ചെയ്യുക',
    
    // Status
    processed: 'പ്രോസസ്സ് ചെയ്തു',
    processing: 'പ്രോസസ്സ് ചെയ്യുന്നു',
    active: 'സജീവം',
    highPriority: 'ഉയർന്ന പ്രാധാന്യം',
    underReview: 'അവലോകനത്തിൽ',
    approved: 'അംഗീകരിച്ചു',
    pending: 'താമസിക്കുന്നു'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('kmrl-language');
    return savedLanguage || 'en';
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('kmrl-language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ml' : 'en');
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
