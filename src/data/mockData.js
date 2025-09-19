export const documents = [
  {
    id: "1",
    title: "Annual Budget Report",
    department: "Finance",
    uploadDate: "15/01/2024",
    uploadedBy: "Rajesh Kumar",
    version: "1.0",
    status: "approved",
    fileType: "pdf",
    fileSize: "2.4 MB",
    complianceFlags: ["annual-review", "financial-audit"],
  },
  {
    id: "2",
    title: "Station Maintenance Schedule",
    department: "Operations",
    uploadDate: "14/01/2024",
    uploadedBy: "Meera Menon",
    version: "2.1",
    status: "pending",
    fileType: "xlsx",
    fileSize: "1.8 MB",
    complianceFlags: [],
  },
];

export const documentVersions = [
  {
    id: "1",
    documentId: "1",
    version: "1.0",
    uploadDate: "15/01/2024",
    uploadedBy: "Rajesh Kumar",
    changes: "Initial version",
  },
  {
    id: "2",
    documentId: "1",
    version: "1.1",
    uploadDate: "16/01/2024",
    uploadedBy: "Rajesh Kumar",
    changes: "Updated financial projections",
  },
  {
    id: "3",
    documentId: "2",
    version: "2.0",
    uploadDate: "13/01/2024",
    uploadedBy: "Meera Menon",
    changes: "Initial version",
  },
  {
    id: "4",
    documentId: "2",
    version: "2.1",
    uploadDate: "14/01/2024",
    uploadedBy: "Meera Menon",
    changes: "Added new maintenance protocols",
  },
];

export const comments = [
  {
    id: 1,
    documentId: 1,
    user: "Rajesh Kumar",
    text: "Needs additional details",
    date: "16/01/2024",
  },
  {
    id: 2,
    documentId: 2,
    user: "Meera Menon",
    text: "Please clarify section 3",
    date: "15/01/2024",
  },
];

export const notifications = [
  {
    id: "1",
    title: "Document Approval",
    message: "Annual Budget Report has been approved",
    timestamp: "2024-01-16T09:30:00",
    type: "approval",
    read: false,
  },
  {
    id: "2",
    title: "New Comment",
    message: "Meera Menon commented on Station Maintenance Schedule",
    timestamp: "2024-01-15T14:45:00",
    type: "comment",
    read: false,
  },
  {
    id: "3",
    title: "Document Update",
    message: "Station Maintenance Schedule has been updated to version 2.1",
    timestamp: "2024-01-14T11:20:00",
    type: "update",
    read: true,
  },
  {
    id: "4",
    title: "Reminder",
    message: "Monthly department meeting tomorrow at 10:00 AM",
    timestamp: "2024-01-13T16:00:00",
    type: "reminder",
    read: true,
  },
];

export const departments = [
  {
    id: "Operations",
    name: "Operations",
    icon: "BuildingOffice2Icon",
    documentCount: 24,
  },
  {
    id: "Finance",
    name: "Finance",
    icon: "BanknotesIcon",
    documentCount: 18,
  },
  {
    id: "HumanResources",
    name: "Human Resources",
    icon: "UserGroupIcon",
    documentCount: 15,
  },
  {
    id: "Engineering",
    name: "Engineering",
    icon: "WrenchScrewdriverIcon",
    documentCount: 32,
  },
  {
    id: "SafetySecurity",
    name: "Safety & Security",
    icon: "ShieldCheckIcon",
    documentCount: 21,
  },
];

export const complianceFlags = [
  {
    id: "1",
    name: "Safety Compliance",
    status: "compliant",
    lastChecked: "2024-01-15",
    nextDue: "2024-04-15",
  },
  {
    id: "2",
    name: "Environmental Standards",
    status: "warning",
    lastChecked: "2024-01-10",
    nextDue: "2024-02-10",
  },
  {
    id: "3",
    name: "Operational Licenses",
    status: "compliant",
    lastChecked: "2023-12-20",
    nextDue: "2024-03-20",
  },
  {
    id: "4",
    name: "Staff Certifications",
    status: "non-compliant",
    lastChecked: "2024-01-05",
    nextDue: "2024-01-20",
  },
  {
    id: "5",
    name: "Equipment Inspections",
    status: "compliant",
    lastChecked: "2024-01-12",
    nextDue: "2024-02-12",
  },
];

export const searchFilters = {
  departments: [
    { id: "all", name: "All Departments" },
    { id: "Operations", name: "Operations" },
    { id: "Finance", name: "Finance" },
    { id: "HumanResources", name: "Human Resources" },
    { id: "Engineering", name: "Engineering" },
    { id: "SafetySecurity", name: "Safety & Security" },
  ],
  documentTypes: [
    { id: "all", name: "All Types" },
    { id: "pdf", name: "PDF" },
    { id: "docx", name: "Word" },
    { id: "xlsx", name: "Excel" },
    { id: "pptx", name: "PowerPoint" },
  ],
  dateRanges: [
    { id: "all", name: "Any Time" },
    { id: "today", name: "Today" },
    { id: "week", name: "This Week" },
    { id: "month", name: "This Month" },
    { id: "year", name: "This Year" },
  ],
  sortOptions: [
    { id: "relevance", name: "Relevance" },
    { id: "date_desc", name: "Newest First" },
    { id: "date_asc", name: "Oldest First" },
    { id: "name_asc", name: "Name (A-Z)" },
    { id: "name_desc", name: "Name (Z-A)" },
  ],
};
