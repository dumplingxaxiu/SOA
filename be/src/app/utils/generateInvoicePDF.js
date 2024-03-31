// generateInvoicePDF.js
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Function to generate invoice PDF
const generateInvoicePDF = (invoiceData, filePath) => {
    // Create a new PDF document
    const doc = new PDFDocument();

    // Pipe the PDF content to a writable stream
    doc.pipe(fs.createWriteStream(filePath));

    // Add content to the PDF document
    doc.fontSize(12).text('Invoice', { align: 'center' });
    doc.moveDown();

    // Add invoice details
    doc.fontSize(10).text(`Invoice ID: ${invoiceData.invoiceId}`);
    doc.fontSize(10).text(`Date: ${invoiceData.date}`);
    doc.fontSize(10).text(`Amount: ${invoiceData.amount}`);

    // End the document
    doc.end();
};

module.exports = generateInvoicePDF;
