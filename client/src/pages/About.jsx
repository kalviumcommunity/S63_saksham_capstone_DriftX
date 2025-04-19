import { FaShippingFast, FaAward, FaHeadset, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const About = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'John Smith',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      bio: 'John founded DriftX with a vision to create a premium shopping experience for customers worldwide.'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      bio: 'Sarah leads our design team, ensuring all products meet our high standards for quality and aesthetics.'
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      bio: 'Michael oversees our technology infrastructure, ensuring a seamless shopping experience for our customers.'
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      role: 'Customer Relations',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
      bio: 'Emily ensures that every customer receives exceptional service and support throughout their journey with us.'
    }
  ];

  return (
    <div className="bg-light">
      {/* Hero Section */}
      <div className="position-relative bg-primary">
        <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
            alt="About us hero" 
            className="w-100 h-100 object-cover opacity-20 animate-fade-in"
          />
        </div>
        <div className="position-relative container py-24">
          <h1 className="text-5xl font-extrabold text-white mb-6 text-center animate-slide-up">
            About DriftX
          </h1>
          <p className="text-xl text-light mb-8 mx-auto text-center animate-slide-up" style={{maxWidth: "800px"}}>
            We're on a mission to provide high-quality products with exceptional customer service.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="container py-16 animate-fade-in">
        <div className="row">
          <div className="col-lg-6 mb-10 mb-lg-0">
            <img 
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
              alt="Our story" 
              className="rounded-lg shadow-lg w-100 h-auto"
            />
          </div>
          <div className="col-lg-6">
            <h2 className="text-3xl font-bold text-dark mb-6">Our Story</h2>
            <p className="text-lg text-gray mb-6">
              Founded in 2020, DriftX began with a simple idea: to create a shopping experience that combines quality, convenience, and exceptional service.
            </p>
            <p className="text-lg text-gray mb-6">
              What started as a small online store has grown into a trusted marketplace offering a wide range of products to customers worldwide. Our commitment to quality and customer satisfaction remains at the heart of everything we do.
            </p>
            <p className="text-lg text-gray">
              Today, we continue to expand our product offerings while maintaining the personalized service that our customers have come to expect from DriftX.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-white py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">Our Values</h2>
            <p className="text-lg text-gray mx-auto" style={{maxWidth: "800px"}}>
              These core principles guide everything we do at DriftX
            </p>
          </div>
          
          <div className="row">
            <div className="col-md-4 mb-6 mb-md-0">
              <div className="text-center p-6 bg-light rounded-lg h-100 animate-slide-up">
                <div className="d-flex align-items-center justify-center w-16 h-16 bg-primary-light text-primary rounded-full mb-4 mx-auto">
                  <FaShippingFast className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-dark mb-2">Quality</h3>
                <p className="text-gray">We carefully curate our products to ensure they meet our high standards for quality and durability.</p>
              </div>
            </div>
            
            <div className="col-md-4 mb-6 mb-md-0">
              <div className="text-center p-6 bg-light rounded-lg h-100 animate-slide-up" style={{animationDelay: "0.2s"}}>
                <div className="d-flex align-items-center justify-center w-16 h-16 bg-primary-light text-primary rounded-full mb-4 mx-auto">
                  <FaAward className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-dark mb-2">Excellence</h3>
                <p className="text-gray">We strive for excellence in every aspect of our business, from product selection to customer service.</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="text-center p-6 bg-light rounded-lg h-100 animate-slide-up" style={{animationDelay: "0.4s"}}>
                <div className="d-flex align-items-center justify-center w-16 h-16 bg-primary-light text-primary rounded-full mb-4 mx-auto">
                  <FaHeadset className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-dark mb-2">Customer Focus</h3>
                <p className="text-gray">Our customers are at the center of everything we do. Your satisfaction is our top priority.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Our Team */}
      <div className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray mx-auto" style={{maxWidth: "800px"}}>
            The passionate individuals behind DriftX
          </p>
        </div>
        
        <div className="row">
          {teamMembers.map((member, index) => (
            <div key={member.id} className="col-sm-6 col-lg-3 mb-6">
              <div className="card h-100 animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="card-img-top h-64 object-cover"
                />
                <div className="card-body p-6">
                  <h3 className="text-xl font-semibold text-dark mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-primary text-white py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-lg text-light mx-auto" style={{maxWidth: "800px"}}>
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>
          
          <div className="row">
            <div className="col-md-4 mb-6 mb-md-0">
              <div className="text-center p-6 animate-slide-up">
                <div className="d-flex align-items-center justify-center w-16 h-16 bg-primary-dark text-white rounded-full mb-4 mx-auto">
                  <FaMapMarkerAlt className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                <p className="text-light">123 Commerce Street<br />New York, NY 10001</p>
              </div>
            </div>
            
            <div className="col-md-4 mb-6 mb-md-0">
              <div className="text-center p-6 animate-slide-up" style={{animationDelay: "0.2s"}}>
                <div className="d-flex align-items-center justify-center w-16 h-16 bg-primary-dark text-white rounded-full mb-4 mx-auto">
                  <FaEnvelope className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-light">info@driftx.com<br />support@driftx.com</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="text-center p-6 animate-slide-up" style={{animationDelay: "0.4s"}}>
                <div className="d-flex align-items-center justify-center w-16 h-16 bg-primary-dark text-white rounded-full mb-4 mx-auto">
                  <FaPhone className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-light">+1 (555) 123-4567<br />Mon-Fri, 9am-5pm EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;