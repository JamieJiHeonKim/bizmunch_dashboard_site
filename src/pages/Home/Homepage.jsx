import React from 'react';
import { useNavigate } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import siteLogo from '../../assets/bizmunch-icon-grey.png';
import backgroundImage from '../../assets/backgroundImage.jpg';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();

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

      <section id="about-section" className="homepage-section">
        <div className="homepage-section-title">About Us</div>
        <div className="homepage-section-content">
          Biz MuncH is a B2B mobile application designed exclusively for company employees, offering them access to special deals and discounts at local restaurants.
        </div>
      </section>

      <section id="how-it-works-section" className="homepage-section bg-gray-100">
        <div className="homepage-section-title">How It Works</div>
        <div className="homepage-section-content">
          Our platform is crafted to enhance your daily life, making it easier for you to enjoy your lunch breaks, after-work meals, and everything in between.
        </div>
      </section>

      <section id="pricing-section" className="homepage-section">
        <div className="homepage-section-title">Pricing</div>
        <div className="homepage-section-content">
          We offer competitive pricing for businesses of all sizes to provide exclusive discounts to their employees.
        </div>
      </section>

      <section id="privacy-policy-section" className="homepage-section bg-gray-100">
        <div className="homepage-section-title">Privacy Policy</div>
        <div className="homepage-section-content">
          Your privacy is important to us. Learn how we protect and manage your data.
        </div>
      </section>
    </div>
  );
};

export default Homepage;
