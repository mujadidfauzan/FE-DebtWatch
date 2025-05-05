import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-white p-4">
      <div className="w-full max-w-xs flex flex-col items-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">DebtWatch</h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
        </p>

        <div className="w-full space-y-4">
          <Button 
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-full"
            onClick={handleLoginClick}
          >
            Log In
          </Button>
          <Button
            variant="outline"
            className="w-full bg-yellow-100 hover:bg-yellow-200 border-yellow-200 text-yellow-800 font-semibold py-3 rounded-full"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Button>
        </div>

        <button 
          className="mt-6 text-sm text-gray-500 hover:text-gray-700"
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
};

export default AuthPage; 