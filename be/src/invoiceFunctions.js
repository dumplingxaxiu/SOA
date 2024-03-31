// invoiceFunctions.js

const generateInvoicePDF = require('../src/app/utils/generateInvoicePDF');
const sendInvoiceEmail = require('../src/app/utils/sendInvoiceEmail');

const createAndSendInvoice = async () => {
    const invoiceData = {
        invoiceId: 'INV001',
        date: '2024-03-31',
        amount: '$100'
    };
    const invoiceFilePath = './invoice.pdf';

    await generateInvoicePDF(invoiceData, invoiceFilePath);
    await sendInvoiceEmail('recipient@example.com', invoiceFilePath);
}

module.exports = createAndSendInvoice;
