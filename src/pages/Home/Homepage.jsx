import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import siteLogo from '../../assets/bizmunch-icon-grey.png';
import backgroundImage from '../../assets/backgroundImage.jpg';
import './Homepage.css';

const Homepage = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="font-sans text-gray-900">
      <header className="homepage-header p-6 flex justify-between items-center homepage-animate-fadeIn">
        <div onClick={() => navigate('/home')} className="cursor-pointer">
          <img src={siteLogo} alt="Site Logo" className="h-24" />
        </div>
        <button 
          onClick={() => navigate('/admin/signin')} 
          className="bg-orange-500 text-white px-6 py-2 text-lg hover:bg-orange-600 shadow-md transform transition-transform hover:scale-105 homepage-animate-fadeIn delay-1s homepage-nav">
          Go to Dashboard Login
        </button>
      </header>

      <section 
        className="relative background-image homepage-section bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-12 homepage-animate-slideInLeft">Welcome to Biz MuncH</h1>
          <p className="text-2xl homepage-animate-slideInRight delay-1s mb-4">We offer exclusive discounts of local restaurants for you</p>
          <p className="text-2xl homepage-animate-slideInRight delay-1s">Bring some excitement to your daily life!</p>
        </div>
      </section>

      <section className="homepage-card-container">
        <div onClick={() => document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' })} className="homepage-card">
          <div className="homepage-card-icon">📝</div>
          <div className="homepage-card-title">About Us</div>
          <div className="homepage-card-more">More</div>
        </div>
        <div onClick={() => document.getElementById('how-it-works-section').scrollIntoView({ behavior: 'smooth' })} className="homepage-card">
          <div className="homepage-card-icon">⚙️</div>
          <div className="homepage-card-title">How It Works</div>
          <div className="homepage-card-more">More</div>
        </div>
        <div onClick={() => document.getElementById('pricing-section').scrollIntoView({ behavior: 'smooth' })} className="homepage-card">
          <div className="homepage-card-icon">💲</div>
          <div className="homepage-card-title">Pricing</div>
          <div className="homepage-card-more">More</div>
        </div>
        <div onClick={() => document.getElementById('privacy-policy-section').scrollIntoView({ behavior: 'smooth' })} className="homepage-card">
          <div className="homepage-card-icon">🔒</div>
          <div className="homepage-card-title">Privacy Policy</div>
          <div className="homepage-card-more">More</div>
        </div>
      </section>

      <section id="about-section" className="about-section">
        <h2 className="section-title">About Us</h2>
        <p className="section-description">
          We provide simplified access to discount coupons for local restaurants.<br/>
          A wide variety of digital coupons for various restaurants.<br/>
          From fast food to specialized dietary options.<br/>
          we aim to reduce both inconvenience and food costs,<br/>
          Let us enhance your everyday dining experience.
        </p>
        <div className="benefits-box">
          <ul className="benefits-list">
            <li>Exclusive Discounts at Local Restaurants</li>
            <li>Convenient Access via Mobile</li>
            <li>Personalized Restaurant Recommendations</li>
            <li>Effortless Dining with Easy-to-Redeem Coupons</li>
          </ul>
        </div>
      </section>

      <section id="how-it-works-section" className="homepage-section bg-gray-100">
        <div className="homepage-section-title">How It Works</div>
        <div className="homepage-section-content">
          Once registered, each user receives a selection of 10 local restaurants offering exclusive discounts. 
          Every Monday at midnight, the app refreshes the selection to give users new options, chosen completely at random. 
          Restaurants that have been selected before may be chosen again.
          <br /><br />
          Users can pin up to 2 favorite restaurants each week, ensuring that they remain in the rotation for the following week's selection. 
          This means that if you love a particular restaurant, you can easily pin it to continue enjoying its discounts.
          <br /><br />
          In addition to providing discounts, the app offers access to restaurant menus and Google Maps directions to make your dining experience even more convenient.
        </div>
      </section>

      <section id="pricing-section" className="homepage-section">
        <div className="homepage-section-title">Pricing</div>
        <div className="homepage-section-content">
          We offer competitive pricing for businesses of all sizes to provide exclusive discounts to their employees.
        </div>
      </section>

      <section id="privacy-policy-section" className="privacy-section">
        <div className="homepage-section-title">Privacy Policy</div>
        <div className="homepage-section-content">
          <p>We value your privacy and want to ensure that your data is handled securely.</p>
          <button onClick={toggleModal} className="view-privacy-btn">View Privacy Policy</button>
        </div>
      </section>

      {showModal && (
          <div className="modal">
              <div className="modal-content">
                  <span className="close" onClick={toggleModal}>&times;</span>
                  <h2>Privacy Policy</h2>
                  <p>
                      We collect and use information solely for the purposes of providing users with access 
                      to restaurant discounts. Your data will not be shared with third parties without your consent. 
                      By using this app, you agree to our terms of service and consent to the collection and use 
                      of your data as described in this policy.
                  </p>
              </div>
          </div>
        )}
    </div>
  );
};

export default Homepage;
