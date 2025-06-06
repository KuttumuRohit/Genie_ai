import React from 'react';
import { Link } from 'react-router-dom';
import Robot from './Robot';

function HomePrivate() {
  return (
    <div className="flex flex-row h-screen bg-black text-white">
      {/* Left Side - Welcome Message */}
      <div className="w-1/2 flex flex-col justify-center p-6 m-8 space-y-6">
        <h1 className="text-5xl font-extrabold leading-tight font-manrope">
          Welcome back, Creator! 👋
        </h1>
        <p className="text-2xl text-gray-300 font-medium">
          Ready to supercharge your creativity with our AI agents?
        </p>
        <Link
          to="/agents"
          className="inline-block bg-blue-500 text-white text-xl font-semibold px-6 py-3 rounded-xl hover:bg-blue-600 transition duration-300 w-fit"
        >
          Go to Agents →
        </Link>
      </div>

      {/* Right Side - Robot */}
      <div className="w-1/2 h-4/5 flex items-center justify-center">
        <div className="w-full h-full p-0">
          <Robot />
        </div>
      </div>
    </div>
  );
}

export default HomePrivate;
