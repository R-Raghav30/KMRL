import React, { useState, useRef } from 'react';
import { 
  CloudArrowUpIcon, 
  DocumentTextIcon, 
  PhotoIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { useDocuments } from '../contexts/DocumentContext';
import { useNotifications } from '../contexts/NotificationContext';

const DocumentUpload = ({ onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('engineering');
  const [documentTitle, setDocumentTitle] = useState('');
  const [documentTags, setDocumentTags] = useState('');
  const fileInputRef = useRef(null);
  
  const { addDocument } = useDocuments();
  const { addNotification } = useNotifications();

  const departments = [
    { id: 'engineering', name: 'Engineering' },
    { id: 'procurement', name: 'Procurement' },
    { id: 'hr', name: 'Human Resources' },
    { id: 'safety', name: 'Safety' }
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
      progress: 0,
      aiSummary: '',
      extractedText: '',
      complianceFlags: []
    }));
    
    setUploadedFiles(prev => [...prev, ...fileArray]);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const simulateUpload = async (file) => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        file.progress += Math.random() * 30;
        if (file.progress >= 100) {
          file.progress = 100;
          file.status = 'uploaded';
          clearInterval(interval);
          resolve();
        }
        setUploadedFiles(prev => [...prev]);
      }, 200);
    });
  };

  const simulateAIProcessing = async (file) => {
    file.status = 'processing';
    setUploadedFiles(prev => [...prev]);
    
    // Simulate OCR text extraction
    await new Promise(resolve => setTimeout(resolve, 2000));
    file.extractedText = `Extracted text from ${file.name}: This document contains important information about metro operations, safety protocols, and technical specifications. The content includes detailed procedures, compliance requirements, and operational guidelines.`;
    
    // Simulate AI summary generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    file.aiSummary = `AI Summary: This document outlines key operational procedures and safety protocols for metro systems. Key highlights include: technical specifications for signal systems, safety compliance requirements, maintenance schedules, and emergency procedures. The document is relevant for engineering and safety departments.`;
    
    // Simulate compliance flag detection
    await new Promise(resolve => setTimeout(resolve, 1000));
    file.complianceFlags = ['safety-compliance', 'technical-specifications'];
    
    file.status = 'completed';
    setUploadedFiles(prev => [...prev]);
  };

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) return;
    
    setUploading(true);
    
    try {
      // Simulate file upload
      for (const file of uploadedFiles) {
        await simulateUpload(file);
      }
      
      setUploading(false);
      setProcessing(true);
      
      // Simulate AI processing
      for (const file of uploadedFiles) {
        await simulateAIProcessing(file);
      }
      
      setProcessing(false);
      
      // Add documents to context
      uploadedFiles.forEach(file => {
        if (file.status === 'completed') {
          const newDocument = {
            title: documentTitle || file.name,
            type: file.type.includes('pdf') ? 'PDF' : 'IMG',
            size: formatFileSize(file.size),
            uploadDate: new Date().toISOString().split('T')[0],
            lastModified: new Date().toISOString().split('T')[0],
            department: selectedDepartment,
            uploadedBy: '1', // Current user ID
            status: 'active',
            version: '1.0',
            tags: documentTags.split(',').map(tag => tag.trim()).filter(tag => tag),
            summary: file.extractedText,
            aiSummary: file.aiSummary,
            complianceFlags: file.complianceFlags,
            crossDepartmentRelevance: file.complianceFlags.includes('safety-compliance') ? ['safety'] : [],
            fileUrl: `/documents/${file.name}`,
            thumbnail: file.type.includes('image') ? URL.createObjectURL(file.file) : 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop'
          };
          
          addDocument(newDocument);
        }
      });
      
      // Add notification
      addNotification({
        type: 'success',
        title: 'Documents Uploaded Successfully',
        message: `${uploadedFiles.length} document(s) have been uploaded and processed with AI analysis.`,
        department: selectedDepartment,
        priority: 'medium',
        timestamp: new Date().toISOString(),
        read: false,
        actionRequired: false
      });
      
      onClose();
      
    } catch (error) {
      console.error('Upload error:', error);
      setUploading(false);
      setProcessing(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />;
      case 'uploaded':
        return <CheckCircleIcon className="w-4 h-4 text-blue-500" />;
      case 'processing':
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      case 'completed':
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upload Documents</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
              dragActive 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <p className="text-lg font-medium text-gray-900">
                Drag and drop files here, or click to select
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Supports PDF, DOC, DOCX, XLS, XLSX, and image files
              </p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 btn-primary"
            >
              Select Files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>

          {/* Document Details */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Document Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Title
                  </label>
                  <input
                    type="text"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    placeholder="Enter document title"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="input-field"
                  >
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={documentTags}
                  onChange={(e) => setDocumentTags(e.target.value)}
                  placeholder="e.g., safety, compliance, technical"
                  className="input-field"
                />
              </div>
            </div>
          )}

          {/* File List */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Uploaded Files</h3>
              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      {file.type.includes('image') ? (
                        <PhotoIcon className="h-8 w-8 text-gray-400" />
                      ) : (
                        <DocumentTextIcon className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)} • {file.type}
                      </p>
                      {file.status === 'uploaded' && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                      {file.status === 'processing' && (
                        <div className="mt-2 flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                          <span className="text-xs text-blue-600">AI Processing...</span>
                        </div>
                      )}
                      {file.status === 'completed' && (
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center space-x-2">
                            <CheckCircleIcon className="h-4 w-4 text-green-500" />
                            <span className="text-xs text-green-600">Processing Complete</span>
                          </div>
                          {file.complianceFlags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {file.complianceFlags.map((flag) => (
                                <span key={flag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                  {flag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Processing Status */}
          {(uploading || processing) && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    {uploading ? 'Uploading files...' : 'AI Processing in progress...'}
                  </p>
                  <p className="text-xs text-blue-700">
                    {uploading 
                      ? 'Please wait while files are being uploaded'
                      : 'Extracting text, generating summaries, and analyzing compliance requirements'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              className="btn-secondary"
              disabled={uploading || processing}
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={uploadedFiles.length === 0 || uploading || processing}
              className="btn-primary"
            >
              {uploading ? 'Uploading...' : processing ? 'Processing...' : 'Upload & Process'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
