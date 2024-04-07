"use client"
import React from 'react';
import axios from 'axios';

export default function TicketForm() {
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const clientID = document.getElementById('clientID').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const data = {
      ticketId: clientID,
      subject: subject,
      sender: "representative",
      message: message
    };

    try {
      const response = await axios.put('http://ec2-13-233-98-115.ap-south-1.compute.amazonaws.com:3000/ticket/updateTicket', data);
      console.log(response);
      alert("Request Sent")
      // Handle successful response here, e.g., clear form or show success message
    } catch (error) {
      console.error(error);
      // Handle errors here, e.g., show error message to the user
    }
  };

  return (
    <div className="Ticket-Form items-center gap-5 flex flex-col p-4 bg-[#406AFF] mt-36 rounded-2xl h-[35rem] w-[25rem]">
      <h1 className="text-white text-2xl font-bold">Create Ticket</h1>
      <div className="flex gap-5">
        <h2 className="text-white text-2xl">UserID:</h2>
        <input type="text" id="clientID" name="clientID" className="border-2 rounded-xl" />
      </div>
      <div className="flex gap-5">
        <h2 className="text-white text-2xl">Category:</h2>
        <select id="subject" name="subject" className="border-2 rounded-xl">
          <option value="Fraud">Fraud</option>
          <option value="Card">Card</option>
          <option value="General">General</option>
          <option value="Investment">Investment</option>
          <option value="Loan">Loan</option>
        </select>
      </div>
      <div className="flex flex-col gap-5 items-center">
        <h2 className="text-white text-2xl">Description:</h2>
        <textarea id="message" name="message" className="border-2 rounded-xl w-[20rem] h-[10rem]" />
      </div>
      <button className="bg-white p-5 rounded-3xl mt-5 hover:scale-110 transition-all" onClick={handleSubmit}>
        Submit Ticket
      </button>
    </div>
  );
}
