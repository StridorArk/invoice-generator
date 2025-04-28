import React from 'react';
import { jsPDF } from 'jspdf';

const InvoicePreview = ({ invoiceData }) => {
    const downloadPDF = () => {
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(18);
        doc.text('Invoice', 10, 10);

        // Add company details
        doc.setFontSize(12);
        doc.text(`Your Company: ${invoiceData.yourCompany || ''}`, 10, 20);
        doc.text(`First Name: ${invoiceData.yourFirstName || ''}`, 10, 30);
        doc.text(`Last Name: ${invoiceData.yourLastName || ''}`, 10, 40);
        doc.text(`Company Website: ${invoiceData.companyWebsite || ''}`, 10, 50);
        doc.text(`Company Address: ${invoiceData.companyAddress || ''}`, 10, 60);
        doc.text(`City, State ZIP: ${invoiceData.companyCityStateZip || ''}`, 10, 70);
        doc.text(`Country: ${invoiceData.companyCountry || ''}`, 10, 80);
        doc.text(`Phone No: ${invoiceData.companyPhone || ''}`, 10, 90);
        doc.text(`Email Address: ${invoiceData.companyEmail || ''}`, 10, 100);

        // Add client details
        doc.text(`Client's Company: ${invoiceData.clientCompany || ''}`, 10, 110);
        doc.text(`First Name: ${invoiceData.firstName || ''}`, 10, 120);
        doc.text(`Last Name: ${invoiceData.lastName || ''}`, 10, 130);
        doc.text(`Client's Address: ${invoiceData.clientAddress || ''}`, 10, 140);
        doc.text(`City, State ZIP: ${invoiceData.cityStateZip || ''}`, 10, 150);
        doc.text(`Country: ${invoiceData.country || ''}`, 10, 160);
        doc.text(`Client's Email: ${invoiceData.clientEmail || ''}`, 10, 170);

        // Add invoice header
        doc.text(`Invoice No.: ${invoiceData.invoiceNumber || ''}`, 10, 180);
        doc.text(`Invoice Date: ${invoiceData.invoiceDate || ''}`, 10, 190);
        doc.text(`Due Date: ${invoiceData.dueDate || ''}`, 10, 200);

        // Add items table
        let yPosition = 210;
        doc.text('Items:', 10, yPosition);
        yPosition += 10;

        invoiceData.items.forEach((item, index) => {
            doc.text(
                `${index + 1}. ${item.description} - ${item.quantity} x $${item.price.toFixed(2)} = $${(
                    item.quantity * item.price
                ).toFixed(2)}`,
                10,
                yPosition
            );
            yPosition += 10;
        });

        // Add total
        yPosition += 10;
        const total = invoiceData.items.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0
        );
        doc.text(`Total: $${total.toFixed(2)}`, 10, yPosition);

        // Save the PDF
        doc.save('invoice.pdf');
    };

    return (
        <div className="invoice-preview">
            <h2>Invoice Preview</h2>

            <h3>Company Details</h3>
            <p>Your Company: {invoiceData.yourCompany}</p>
            <p>First Name: {invoiceData.yourFirstName}</p>
            <p>Last Name: {invoiceData.yourLastName}</p>
            <p>Company Website: {invoiceData.companyWebsite}</p>
            <p>Company Address: {invoiceData.companyAddress}</p>
            <p>City, State ZIP: {invoiceData.companyCityStateZip}</p>
            <p>Country: {invoiceData.companyCountry}</p>
            <p>Phone No: {invoiceData.companyPhone}</p>
            <p>Email Address: {invoiceData.companyEmail}</p>

            <h3>Client Details</h3>
            <p>Client's Company: {invoiceData.clientCompany}</p>
            <p>First Name: {invoiceData.firstName}</p>
            <p>Last Name: {invoiceData.lastName}</p>
            <p>Client's Address: {invoiceData.clientAddress}</p>
            <p>City, State ZIP: {invoiceData.cityStateZip}</p>
            <p>Country: {invoiceData.country}</p>
            <p>Client's Email: {invoiceData.clientEmail}</p>

            <h3>Invoice Header</h3>
            <p>Invoice No.: {invoiceData.invoiceNumber}</p>
            <p>Invoice Date: {invoiceData.invoiceDate}</p>
            <p>Due Date: {invoiceData.dueDate}</p>

            <h3>Items</h3>
            <ul>
                {invoiceData.items.map((item, index) => (
                    <li key={index}>
                        {item.description} - {item.quantity} x ${item.price.toFixed(2)} = $
                        {(item.quantity * item.price).toFixed(2)}
                    </li>
                ))}
            </ul>

            <h3>Total: ${invoiceData.items.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2)}</h3>

            <button onClick={downloadPDF}>Download as PDF</button>
        </div>
    );
};

export default InvoicePreview;