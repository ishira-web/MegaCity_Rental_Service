import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';

function Receipt() {
  const location = useLocation();
  const bookingDetails = location.state?.bookingDetails || {};

  // Destructure booking details with default values
  const {
    name = 'N/A',
    email = 'N/A',
    phone = 'N/A',
    pickup = 'N/A',
    dropoff = 'N/A',
    distance = 'N/A',
    duration = 'N/A',
    fare = 'N/A',
    paymentMethod = 'N/A',
  } = bookingDetails;

  // Function to handle downloading the receipt as a PDF
  const downloadReceipt = () => {
    const doc = new jsPDF();

    // Add receipt title
    doc.setFontSize(18);
    doc.text('Cab Booking Receipt', 10, 20);

    // Add receipt details
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 10, 30);
    doc.text(`Email: ${email}`, 10, 40);
    doc.text(`Phone: ${phone}`, 10, 50);
    doc.text(`Pickup Location: ${pickup}`, 10, 60);
    doc.text(`Drop-off Location: ${dropoff}`, 10, 70);
    doc.text(`Distance: ${distance}`, 10, 80);
    doc.text(`Duration: ${duration}`, 10, 90);
    doc.text(`Fare: Rs. ${fare}`, 10, 100);
    doc.text(`Payment Method: ${paymentMethod}`, 10, 110);

    // Save the PDF
    doc.save('receipt.pdf');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Booking Receipt</h2>
      <div className="space-y-3">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Pickup Location:</strong> {pickup}</p>
        <p><strong>Drop-off Location:</strong> {dropoff}</p>
        <p><strong>Distance:</strong> {distance}</p>
        <p><strong>Duration:</strong> {duration}</p>
        <p><strong>Fare:</strong> Rs. {fare}</p>
        <p><strong>Payment Method:</strong> {paymentMethod}</p>
      </div>
      <button
        onClick={downloadReceipt}
        className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Download Receipt as PDF
      </button>
    </div>
  );
}

export default Receipt;