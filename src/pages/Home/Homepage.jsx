import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import siteLogo from '../../assets/bizmunch-icon-grey.png';
import backgroundImage from '../../assets/backgroundImage.jpg';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();

  const images = [
    require('../../assets/page_1.jpg'),
    require('../../assets/page_2.jpg'),
    require('../../assets/page_3.jpg'),
    require('../../assets/page_4.jpg'),
    require('../../assets/page_5.jpg'),
    require('../../assets/page_6.jpg'),
    require('../../assets/page_7.jpg'),
    require('../../assets/page_8.jpg')
  ];

  return (
    <div className="font-sans text-gray-900">
      <header className="flex justify-between items-center p-6 bg-white border-b border-orange-500 shadow-md animate-fadeIn">
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => navigate('/home')}
        >
          <img src={siteLogo} alt="Site Logo" className="h-24 animate-logoBounce" />
        </div>
        <button 
          onClick={() => navigate('/admin/signin')} 
          className="bg-orange-500 text-white px-6 py-2 rounded-full text-lg hover:bg-orange-600 shadow-md transform transition-transform hover:scale-105 animate-fadeIn delay-1s">
          Go to Dashboard Login
        </button>
      </header>

      <section 
        className="relative flex justify-center items-center bg-cover bg-center h-[500px] animate-fadeIn slow" 
        style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-12 animate-slideInLeft">Welcome to Biz MuncH</h1>
          <p className="text-xl animate-slideInRight delay-1s mb-4">We offer exclusive discounts of local restaurants for you!</p>
          <p className="text-xl animate-slideInRight delay-1s">Add a bit of excitement into your daily life!</p>
        </div>
      </section>
      <section className="flex justify-center space-x-6 mt-10 px-6 animate-fadeIn delay-6s">
        <div className="bg-white border-2 border-orange-500 rounded-lg p-8 w-1/4 shadow-lg transform transition-transform hover:scale-110 hover:shadow-2xl animate-fadeIn delay-2s">
          <div className="text-5xl text-orange-500 mb-4 animate-bounceOnce">📝</div>
          <h3 className="text-2xl text-orange-500 mb-2">About Us</h3>
          <p className="font-bold text-lg">More</p>
        </div>
        <div className="bg-white border-2 border-orange-500 rounded-lg p-8 w-1/4 shadow-lg transform transition-transform hover:scale-110 hover:shadow-2xl animate-fadeIn delay-3s">
          <div className="text-5xl text-orange-500 mb-4 animate-bounceOnce">⚙️</div>
          <h3 className="text-2xl text-orange-500 mb-2">How It Works</h3>
          <p className="font-bold text-lg">More</p>
        </div>
        <div className="bg-white border-2 border-orange-500 rounded-lg p-8 w-1/4 shadow-lg transform transition-transform hover:scale-110 hover:shadow-2xl animate-fadeIn delay-4s">
          <div className="text-5xl text-orange-500 mb-4 animate-bounceOnce">💲</div>
          <h3 className="text-2xl text-orange-500 mb-2">Pricing</h3>
          <p className="font-bold text-lg">More</p>
        </div>
        <div className="bg-white border-2 border-orange-500 rounded-lg p-8 w-1/4 shadow-lg transform transition-transform hover:scale-110 hover:shadow-2xl animate-fadeIn delay-5s">
          <div className="text-5xl text-green-500 mb-4 animate-bounceOnce">🔒</div>
          <h3 className="text-2xl text-orange-500 mb-2">Privacy Policy</h3>
          <p className="font-bold text-lg">More</p>
        </div>
      </section>

      <section className="flex justify-center items-start space-x-6 my-16 mx-10">
        <div className="about-container bg-white border-2 border-orange-500 rounded-lg shadow-lg p-8">
          <div className="flex justify-center items-center mb-6">
            <h2 className="text-3xl text-orange-500 font-bold">About</h2>
            <img src={siteLogo} alt="Site Logo" className="h-24 animate-logoBounce" style={{ marginBottom: '10px', marginLeft: '-16px' }} />
          </div>
          <p className="text-xl text-gray-600">
            Biz MuncH is a B2B mobile application designed exclusively for company employees, offering them access to special deals and discounts at local restaurants.
            <br /><br />
            Our platform is crafted to enhance your daily life, making it easier for you to enjoy your lunch breaks, after-work meals, and everything in between, without breaking the bank.
            <br /><br />
            <strong>Key Benefits for You:</strong>
            <ul className="list-disc list-inside">
              <li>Exclusive Discounts at Local Restaurants</li>
              <li>Convenient Access to Deals via Mobile</li>
              <li>Personalized Restaurant Recommendations</li>
              <li>Effortless Dining with Easy-to-Redeem Coupons</li>
            </ul>
          </p>
        </div>
        <div className='carousel-container'>
          <Carousel 
            showArrows={true}
            showStatus={true}
            showIndicators={true}
            infiniteLoop={true}
            showThumbs={false}
            autoPlay={false}
            interval={3000}
            transitionTime={500}
            swipeable={true}
            emulateTouch={true}
            dynamicHeight={false}
          >
            {images.map((image, index) => (
              <div key={index} className="carousel-slide">
                <img src={image} alt={`Screenshot ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>
      </section>

    </div>
  );
};

export default Homepage;