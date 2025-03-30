import React, { useState } from "react";
import axios from "axios";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const Contact = () => {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [status, setStatus] = useState("");
  useDocumentTitle("TuneHub | Contact");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/contact/send-message",
        formData
      );
      setStatus("Message sent successfully!");
    } catch (error) {
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="heading-text text-center">Contact with Us</h1>
      <div className="border p-5 max-w-md mx-auto rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="">
          <div className="mb-4">
            <label htmlFor="email" className="font-bold ">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 pr-10 rounded outline-none"
              placeholder="yourname@example.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="font-bold ">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2 pr-10 rounded outline-none"
              rows="4"
              placeholder="Write your message here..."
            ></textarea>
          </div>
          <button type="submit" className="w-full uppercase">
            Send
          </button>
        </form>
        {status && (
          <p className="mt-4 text-center font-semibold text-red-500">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default Contact;
