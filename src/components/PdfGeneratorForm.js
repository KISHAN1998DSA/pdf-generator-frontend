import React, { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import './PdfGeneratorForm.css';
import { BASE_URL } from '../config';

const PdfGeneratorForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/pdf/generate`, formData, {
        responseType: 'blob',
      });

      // Create a blob from the PDF Stream
      const file = new Blob([response.data], { type: 'application/pdf' });
      
      // Create a link element to trigger download
      const fileURL = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = 'generated-document.pdf';
      link.click();
      
      // Clean up
      URL.revokeObjectURL(fileURL);
      setFormData({ title: '', content: '' });
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pdf-form-container">
      <h2>Generate a PDF Document</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Document Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter document title"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Document Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            placeholder="Enter document content"
            rows="10"
          />
        </div>
        
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? (
            <span className="loading-container">
              <ClipLoader size={20} color="#ffffff" />
              <span>Generating PDF...</span>
            </span>
          ) : (
            'Generate PDF'
          )}
        </button>
      </form>
    </div>
  );
};

export default PdfGeneratorForm; 