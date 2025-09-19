# KMRL Document Management Dashboard

A modern, responsive web application built with Vite + ReactJS and TailwindCSS for comprehensive document management at Kochi Metro Rail Limited (KMRL).

## 🚀 Features

### Information Latency Solutions
- **AI-Powered Document Upload**: Supports PDF and image files with simulated OCR text extraction
- **Auto-Summarization**: AI-generated summaries of key document points
- **Fast Keyword Search**: Advanced search with filters by department, type, date, and compliance flags
- **Smart Highlights**: Department-specific and role-based document summaries

### Siloed Awareness Solutions
- **Multi-Department Dashboards**: Dedicated views for Engineering, Procurement, HR, and Safety departments
- **Smart Notifications**: Cross-department alerts for relevant documents and actions
- **Dependency Tracking**: Visual representation of cross-department document dependencies
- **Shared Document Visibility**: Easy access to documents relevant across departments

### Compliance Exposure Solutions
- **Compliance Tagging**: Automatic flagging of compliance and regulatory documents
- **Deadline Alerts**: Reminders for important deadlines and required acknowledgments
- **Audit Trail**: Complete compliance log and history for auditing purposes
- **Regulatory Updates**: Tracking of compliance status and updates

### Knowledge Attrition Solutions
- **Automatic Versioning**: All documents and summaries are versioned automatically
- **User Comments**: Comments and annotations by logged-in users
- **Global Search**: Advanced search with filters for contributors, date, and topic
- **Historical Retrieval**: Quick access to historic information and document evolution

### Duplicated Effort Solutions
- **Canonical Summaries**: Single source of truth for document summaries across departments
- **Edit History**: Complete tracking of all edits and version history
- **Duplicate Detection**: Notifications when users attempt to upload similar files
- **Collaboration Features**: Real-time collaboration and document sharing

## 🛠️ Technology Stack

- **Frontend**: React 19.1.1 with functional components
- **Build Tool**: Vite 7.1.2
- **Styling**: TailwindCSS 3.x with custom design system
- **Routing**: React Router DOM
- **Icons**: Heroicons
- **State Management**: React Context API
- **Responsive Design**: Mobile-first approach with TailwindCSS

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd kmrl-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🏗️ Project Structure

```
kmrl-dashboard/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Layout.jsx          # Main layout wrapper
│   │   │   ├── Header.jsx          # Top navigation header
│   │   │   └── Sidebar.jsx         # Side navigation
│   │   └── DocumentUpload.jsx      # Document upload modal
│   ├── contexts/
│   │   ├── DocumentContext.jsx     # Document state management
│   │   └── NotificationContext.jsx # Notification state management
│   ├── data/
│   │   └── mockData.js            # Mock data for development
│   ├── pages/
│   │   ├── Dashboard.jsx          # Main dashboard
│   │   ├── DepartmentDashboard.jsx # Department-specific views
│   │   ├── SearchPage.jsx         # Advanced search interface
│   │   └── NotificationsPage.jsx  # Notifications management
│   ├── App.jsx                    # Main application component
│   ├── main.jsx                   # Application entry point
│   └── index.css                  # Global styles with TailwindCSS
├── tailwind.config.js             # TailwindCSS configuration
├── postcss.config.js              # PostCSS configuration
├── vite.config.js                 # Vite configuration
└── package.json                   # Project dependencies
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue shades (#3b82f6 to #1e3a8a)
- **Metro**: Cyan shades (#0ea5e9 to #0c4a6e)
- **Status Colors**:
  - Success: Green (#10b981)
  - Warning: Yellow (#f59e0b)
  - Error: Red (#ef4444)
  - Info: Blue (#3b82f6)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: Consistent shadow and border styling
- **Buttons**: Primary and secondary variants with hover states
- **Input Fields**: Focus states with primary color accent
- **Navigation**: Responsive sidebar with department-specific styling

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile**: Collapsible sidebar, stacked layouts
- **Tablet**: Optimized spacing and touch targets
- **Desktop**: Full sidebar navigation, multi-column layouts

## 🔧 Configuration

### TailwindCSS Configuration
The project uses a custom TailwindCSS configuration with:
- Extended color palette for KMRL branding
- Custom component classes for consistent styling
- Responsive breakpoints optimized for the dashboard

### Vite Configuration
Standard Vite configuration with React plugin for optimal development experience.

## 🚀 Key Features Implementation

### 1. Document Upload with AI Simulation
- Drag-and-drop file upload interface
- Simulated OCR text extraction
- AI-powered summary generation
- Compliance flag detection
- Progress tracking and status updates

### 2. Advanced Search System
- Real-time search with debouncing
- Multiple filter options (department, type, date, compliance)
- Highlighted search results
- AI summary integration in search results

### 3. Notification System
- Real-time notifications with React Context
- Priority-based alert system
- Cross-department relevance tracking
- Action-required notifications

### 4. Department Dashboards
- Department-specific document views
- Cross-department document visibility
- Compliance tracking per department
- Statistics and analytics

### 5. Mobile Responsiveness
- Collapsible navigation
- Touch-friendly interfaces
- Optimized layouts for all screen sizes
- Progressive enhancement

## 🔮 Future Enhancements

### Planned Features
- **Real AI Integration**: Replace mock AI with actual OCR and summarization services
- **Backend Integration**: Connect to real document storage and processing APIs
- **User Authentication**: Implement proper user management and role-based access
- **Real-time Collaboration**: Live document editing and commenting
- **Advanced Analytics**: Document usage analytics and insights
- **API Integration**: Connect to existing KMRL systems and databases

### Technical Improvements
- **Performance Optimization**: Code splitting and lazy loading
- **Accessibility**: WCAG 2.1 compliance improvements
- **Testing**: Unit and integration test coverage
- **PWA Features**: Offline support and app-like experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is developed for Kochi Metro Rail Limited (KMRL) and is intended for internal use.

## 🆘 Support

For support and questions:
- Create an issue in the project repository
- Contact the development team
- Refer to the documentation in the `/docs` directory

## 🏆 Acknowledgments

- Built with modern React patterns and best practices
- Designed with accessibility and usability in mind
- Optimized for performance and scalability
- Created with love for the KMRL team ❤️

---

**KMRL Document Management Dashboard** - Streamlining document workflows for Kochi Metro Rail Limited