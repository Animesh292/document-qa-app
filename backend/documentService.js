const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'uploads');

/**
 * Get list of all uploaded documents
 */
function getDocuments() {
  try {
    if (!fs.existsSync(uploadsDir)) {
      return [];
    }

    const files = fs.readdirSync(uploadsDir);
    
    return files
      .filter(file => file.endsWith('.txt'))
      .map(file => {
        const filePath = path.join(uploadsDir, file);
        const stats = fs.statSync(filePath);
        
        // Extract original name (remove timestamp prefix)
        const parts = file.split('-');
        const originalName = parts.length > 2 ? parts.slice(2).join('-') : file;
        
        return {
          filename: file,
          originalName: originalName,
          size: stats.size,
          uploadedAt: stats.birthtime
        };
      })
      .sort((a, b) => b.uploadedAt - a.uploadedAt); // Most recent first
      
  } catch (error) {
    console.error('Error getting documents:', error);
    return [];
  }
}

/**
 * Get content of a specific document
 */
function getDocumentContent(filename) {
  try {
    const filePath = path.join(uploadsDir, filename);
    
    if (!fs.existsSync(filePath)) {
      throw new Error('Document not found');
    }
    
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error('Error reading document:', error);
    throw error;
  }
}

/**
 * Delete a document
 */
function deleteDocument(filename) {
  try {
    const filePath = path.join(uploadsDir, filename);
    
    if (!fs.existsSync(filePath)) {
      return { success: false, message: 'Document not found' };
    }
    
    fs.unlinkSync(filePath);
    return { success: true, message: 'Document deleted successfully' };
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}

module.exports = {
  getDocuments,
  getDocumentContent,
  deleteDocument
};
