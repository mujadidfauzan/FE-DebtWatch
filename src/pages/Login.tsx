import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 text-white p-4">
      <div className="w-full max-w-xs flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-12">Welcome</h1>

        <div className="w-full space-y-4 mb-6">
          <div className="space-y-1 text-left">
            <Label htmlFor="email" className="text-xs font-light text-gray-300">Username Or Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="example@example.com" 
              className="bg-blue-600 border-b border-gray-400 rounded-none placeholder-gray-400 focus:border-white focus:ring-0" 
            />
          </div>
          <div className="space-y-1 text-left relative">
            <Label htmlFor="password" className="text-xs font-light text-gray-300">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              className="bg-blue-600 border-b border-gray-400 rounded-none placeholder-gray-400 focus:border-white focus:ring-0" 
            />
          
            <span className="absolute right-2 top-6 text-gray-400 cursor-pointer">👁️</span> 
          </div>
        </div>

        <div className="w-full space-y-3">
          <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-full">
            Log In
          </Button>
           <button className="text-xs text-gray-300 hover:text-white mb-3 w-full text-center">
            Forgot Password?
          </button>
          <Button
            variant="outline"
            className="w-full bg-yellow-100 hover:bg-yellow-200 border-none text-yellow-900 font-semibold py-3 rounded-full"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 