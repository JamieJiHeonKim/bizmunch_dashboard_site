import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import siteLogo from '../../assets/bizmunch-icon-grey.png';
import backgroundImage from '../../assets/backgroundImage.jpg';
import './Homepage.css';

Modal.setAppElement('#root');

const Homepage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    setModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = 'auto';
  }

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
        <div className="pricing-tiers">
          <p className="homepage-section-content">
              Our pricing is simple: <strong>$4 per worker per month.</strong><br/>
              For example, an office with 50 employees will cost <strong>$200/month</strong>.<br/><br/>
              Every employee gets access to our entire service, no hidden fees or extra charges.<br/>
              We strive to make our services affordable and accessible to all companies.
          </p>
        </div>
      </section>

      <section id="privacy-policy-section" className="privacy-section">
        <div className="homepage-section-title">Privacy Policy</div>
        <div className="homepage-section-content">
          <p>We value your privacy and want to ensure that your data is handled securely.</p>
          <button onClick={openModal} className="view-privacy-btn">View Privacy Policy</button>
        </div>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Privacy Policy Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h2>Privacy Policy</h2>
        </div>
        <div className="modal-body">
          <p>
            At <strong>Biz MuncH</strong>, we take your privacy seriously. This Privacy Policy outlines how we collect, 
            use, and protect your personal data in compliance with applicable laws and industry standards.
          </p>

          <h3>Information We Collect</h3>
          <p>We collect information directly from you when you use our mobile application. This includes:</p>
          <ul>
            <li><strong>Your email address and other contact details</strong> when you sign up or register an account.</li>
            <li><strong>Location data</strong>, if enabled, to provide recommendations for local restaurants.</li>
            <li><strong>Usage data</strong>, such as your interactions with the app, to help us improve our services.</li>
          </ul>

          <h3>How We Use Your Information</h3>
          <p>We use your information to:</p>
          <ul>
            <li>Provide you access to restaurant discounts and services.</li>
            <li>Improve your experience with personalized restaurant recommendations.</li>
            <li>Communicate updates, offers, and other important information about our service.</li>
          </ul>

          <h3>Sharing Your Information</h3>
          <p>
            <strong>Biz MuncH</strong> does not sell or share your personal information with third parties, 
            except for the purpose of providing our service to you (such as partnering with restaurants) 
            or when required by law.
          </p>

          <h3>Your Rights</h3>
          <p>
            You have the right to access, update, or delete your personal information at any time. 
            You can manage your account settings within the app or contact our support team for assistance.
          </p>

          <h3>Changes to This Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be communicated via the app 
            or email, and your continued use of Biz MuncH will signify your acceptance of those changes.
          </p>

          <h3>Contact Us</h3>
          <p>
            If you have any questions or concerns about our privacy practices, please contact us at 
            <strong> admin@bizmunch.com</strong>.
          </p>
        </div>
        <div className="modal-footer">
          <button onClick={closeModal} className="modal-close-btn">Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default Homepage;
