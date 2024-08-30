import React from 'react';
import { useNavigate } from 'react-router-dom';
import siteLogo from '../../assets/bizmunch-icon-grey.png';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-900">
      {/* Header */}
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

      {/* Hero Section */}
      <section className="relative flex justify-center items-center bg-cover bg-center h-[500px] animate-fadeIn slow" style={{ backgroundImage: 'url(path-to-your-image.jpg)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4 animate-slideInLeft">Welcome to Biz MuncH</h1>
          <p className="text-xl animate-slideInRight delay-1s">Join us today and transform your life.</p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="flex justify-center space-x-6 mt-10 px-6">
        <div className="bg-white border-2 border-orange-500 rounded-lg p-8 w-1/4 shadow-lg transform transition-transform hover:scale-110 hover:shadow-2xl animate-fadeIn delay-2s">
          <div className="text-5xl text-orange-500 mb-4 animate-bounceOnce">📝</div>
          <h3 className="text-2xl text-orange-500 mb-2">About Us</h3>
          <p className="font-bold text-lg">More</p>
        </div>
        <div className="bg-white border-2 border-orange-500 rounded-lg p-8 w-1/4 shadow-lg transform transition-transform hover:scale-110 hover:shadow-2xl animate-fadeIn delay-3s">
          <div className="text-5xl text-orange-500 mb-4 animate-bounceOnce">🎁</div>
          <h3 className="text-2xl text-orange-500 mb-2">Benefits</h3>
          <p className="font-bold text-lg">More</p>
        </div>
        <div className="bg-white border-2 border-orange-500 rounded-lg p-8 w-1/4 shadow-lg transform transition-transform hover:scale-110 hover:shadow-2xl animate-fadeIn delay-4s">
          <div className="text-5xl text-orange-500 mb-4 animate-bounceOnce">⚙️</div>
          <h3 className="text-2xl text-orange-500 mb-2">How it works</h3>
          <p className="font-bold text-lg">More</p>
        </div>
        <div className="bg-white border-2 border-orange-500 rounded-lg p-8 w-1/4 shadow-lg transform transition-transform hover:scale-110 hover:shadow-2xl animate-fadeIn delay-5s">
          <div className="text-5xl text-green-500 mb-4 animate-bounceOnce">💲</div>
          <h3 className="text-2xl text-orange-500 mb-2">Pricing</h3>
          <p className="font-bold text-lg">More</p>
        </div>
      </section>

      {/* About Section */}
      <section className="my-16 mx-10 p-8 bg-white border-2 border-orange-500 rounded-lg shadow-lg text-center animate-fadeIn delay-6s">
        <h2 className="text-4xl text-orange-500 font-bold mb-6">About Club</h2>
        <p className="text-xl text-gray-600 mb-8">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </section>
    </div>
  );
};

export default Homepage;
