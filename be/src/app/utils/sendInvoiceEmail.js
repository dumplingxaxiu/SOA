// sendInvoiceEmail.js
const sendMail = require('../utils/sendEmail');
const credentials = require("../../credentials");

const sendInvoiceEmail = async (email, invoiceFilePath) => {
    const options = {
        from: credentials.email.emailAddress,
        to: email,
        subject: 'Invoice',
        text: 'Please find the attached invoice.',
        attachments: [
            {
                filename: 'invoice.pdf',
                path: invoiceFilePath
            }
        ]
    };

    // Send email with invoice PDF attachment
    await sendMail(options, (err, info) => {
        if (err) {
            console.log("Error sending invoice email:", err);
        } else {
            console.log("Invoice email sent successfully:", info);
        }
    });
};

module.exports = sendInvoiceEmail;
