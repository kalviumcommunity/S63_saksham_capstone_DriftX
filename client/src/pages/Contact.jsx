import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="bg-light py-12 animate-fade-in">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold text-dark mb-4">Contact Us</h1>
          <p className="text-lg text-gray mx-auto" style={{maxWidth: "800px"}}>
            Have questions about our products or services? We're here to help! Reach out to our team using the form below or contact us directly.
          </p>
        </div>

        <div className="row mb-16">
          {/* Contact Information */}
          <div className="col-lg-4 mb-6 mb-lg-0">
            <div className="bg-white rounded-lg shadow p-6 h-100 animate-slide-up">
              <h2 className="text-2xl font-semibold text-dark mb-6">Get In Touch</h2>
              
              <div className="mb-6">
                <div className="d-flex mb-4">
                  <div className="flex-shrink-0">
                    <FaMapMarkerAlt className="text-primary" style={{fontSize: "1.5rem"}} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-dark">Our Location</h3>
                    <p className="mt-1 text-gray">
                      123 Fashion Street<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="d-flex mb-4">
                  <div className="flex-shrink-0">
                    <FaPhone className="text-primary" style={{fontSize: "1.5rem"}} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-dark">Phone</h3>
                    <p className="mt-1 text-gray">+1 (555) 123-4567</p>
                    <p className="mt-1 text-gray">+1 (555) 765-4321</p>
                  </div>
                </div>
                
                <div className="d-flex mb-4">
                  <div className="flex-shrink-0">
                    <FaEnvelope className="text-primary" style={{fontSize: "1.5rem"}} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-dark">Email</h3>
                    <p className="mt-1 text-gray">info@driftx.com</p>
                    <p className="mt-1 text-gray">support@driftx.com</p>
                  </div>
                </div>
                
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <FaClock className="text-primary" style={{fontSize: "1.5rem"}} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-dark">Business Hours</h3>
                    <p className="mt-1 text-gray">Monday - Friday: 9am - 6pm</p>
                    <p className="mt-1 text-gray">Saturday: 10am - 4pm</p>
                    <p className="mt-1 text-gray">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="col-lg-8">
            <div className="bg-white rounded-lg shadow p-6 h-100 animate-slide-up" style={{animationDelay: "0.2s"}}>
              <h2 className="text-2xl font-semibold text-dark mb-6">Send Us a Message</h2>
              
              {submitSuccess && (
                <div className="alert alert-success mb-6">
                  <p>Thank you for your message! We'll get back to you as soon as possible.</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="row mb-6">
                  <div className="col-md-6 mb-4 mb-md-0">
                    <label htmlFor="name" className="form-label">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-control"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-control"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-control"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="form-control"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary d-flex align-items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner-border spinner-border-sm mr-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-12 animate-slide-up" style={{animationDelay: "0.4s"}}>
          <h2 className="text-2xl font-semibold text-dark mb-6">Find Us</h2>
          <div className="bg-gray-200 rounded-lg overflow-hidden" style={{height: "24rem"}}>
            {/* Placeholder for map - in a real app, you would use Google Maps or similar */}
            <div className="w-100 h-100 d-flex align-items-center justify-center bg-gray-300">
              <div className="text-center p-6">
                <FaMapMarkerAlt className="text-primary mx-auto mb-4" style={{fontSize: "3rem"}} />
                <h3 className="text-xl font-medium text-dark mb-2">Map Placeholder</h3>
                <p className="text-gray">
                  In a real application, an interactive map would be displayed here.<br />
                  Our store is located at 123 Fashion Street, New York, NY 10001.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow p-6 animate-slide-up" style={{animationDelay: "0.6s"}}>
          <h2 className="text-2xl font-semibold text-dark mb-6">Frequently Asked Questions</h2>
          
          <div className="mb-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-dark">What are your shipping options?</h3>
              <p className="mt-2 text-gray">
                We offer standard shipping (3-5 business days), express shipping (1-2 business days), and same-day delivery in select areas. Shipping costs vary based on location and chosen method.
              </p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium text-dark">How can I track my order?</h3>
              <p className="mt-2 text-gray">
                Once your order ships, you'll receive a tracking number via email. You can also view your order status by logging into your account and visiting the "My Orders" section.
              </p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium text-dark">What is your return policy?</h3>
              <p className="mt-2 text-gray">
                We accept returns within 30 days of purchase. Items must be in original condition with tags attached. Please visit our Returns page for more details on the process.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-dark">Do you offer international shipping?</h3>
              <p className="mt-2 text-gray">
                Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days, and customs fees may apply depending on your location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;