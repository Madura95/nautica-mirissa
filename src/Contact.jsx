import React, { useState } from "react";
import Header from "./Header";
import './Contact.css';
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "./firebase";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submissionStat, setSubmissionStat] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      await addDoc(collection(firestore, 'contact'), formData);
      setSubmissionStat('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form: ', error);
      setSubmissionStat('Failed to send message.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,  // Spread the existing data
      [name]: value     // Update the specific field
    }));
  };

  return (
    <>
      <Header />
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out.</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={formData.name}
              onChange={handleChange} 
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange} 
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea 
              name="message" 
              id="message" 
              rows="5"
              value={formData.message}
              onChange={handleChange} 
              required>
            </textarea>
          </div>

          <button type="submit">Send Message</button>
        </form>
        {submissionStat && <p id="success-message">{submissionStat}</p>}
      </div>
    </>
  )
}

export default Contact;