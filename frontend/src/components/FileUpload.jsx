import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';

const FileUpload = ({ onFileSelect, accept = "image/*", maxSizeMB = 2, children }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateAndProcessFile = (file) => {
    if (!file) return;

    if (accept.startsWith('image/') && !file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file.');
      return;
    }

    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      return;
    }

    onFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const triggerSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={`relative rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
        isDragActive
          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
          : 'border-transparent hover:border-orange-300 dark:hover:border-slate-600'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={triggerSelect}
    >
      <input
        type="file"
        accept={accept}
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
      />
      {/* We can optionally render an overlay if dragging, or just wrap the children */}
      {isDragActive && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 dark:bg-slate-800/80 rounded-2xl backdrop-blur-sm">
          <p className="text-orange-600 font-bold text-lg">Drop image here!</p>
        </div>
      )}
      {children}
    </div>
  );
};

export default FileUpload;
