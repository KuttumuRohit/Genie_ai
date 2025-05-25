// components/Signup.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Robot from './Robot';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3060/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('User registered successfully!');
        // Optionally redirect to login:
        // navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="flex bg-black">
      {/* Signup Form Section */}
      <div className="w-3/5 min-h-screen flex flex-col md:flex-row items-center justify-center bg-black text-white font-manrope px-4 md:px-20 py-10 space-y-8 md:space-y-0 md:space-x-16">
        <div className="max-w-md w-full space-y-8">
          <div>
            <p className="text-lg text-gray-300 font-semibold">START FOR FREE</p>
            <h2 className="text-6xl font-bold mt-2">
              Create new account <span className="text-blue-500">.</span>
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Already a member?{' '}
              <Link to="/login" className="text-blue-500 underline">
                Log in
              </Link>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-zinc-900 text-white text-lg p-4 rounded-2xl placeholder:text-white"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-zinc-900 text-white text-lg p-4 rounded-2xl placeholder:text-white"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-zinc-900 text-white text-lg p-4 rounded-2xl placeholder:text-white"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white text-lg font-semibold w-full py-4 rounded-2xl hover:bg-blue-600 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Robot Section */} 
      <div className="w-2/5 bg-black flex items-center justify-center">
        <Robot />
      </div>
    </div>
  );
};

export default Signup;
