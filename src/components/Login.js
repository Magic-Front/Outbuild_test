import React, { useState } from 'react';
import PasswordInput from './PasswordInput';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Validate email
    if (!validateEmail(email)) {
        setError('Invalid email format.');
        return;
      }

    // Validate password
    if (password.length < 6 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
        setError('Password must be at least 6 characters long and contain both letters and numbers.');
        return;
      }

    // Hardcoded credentials
    const validEmail = 'prologin@prologin.com';
    const validPassword = 'ProLogin123456';

    // Validate credentials
    if (email === validEmail && password === validPassword) {
      localStorage.setItem('user', JSON.stringify({ email })); // Replace with actual token if needed
      navigate('/dashboard'); // Redirect to dashboard
    } else {
        setError('Incorrect email or password.'); // Show error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl">
        <div className="mb-4 text-center" >
          <span className="text-2xl font-bold">ProLogin</span>
        </div>
        <div className="bg-white p-6 rounded shadow-md">
        {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleLogin}>
            <h2 className="text-xl mb-4">Email</h2>
            <input 
              type="text" 
              className="border border-gray-300 p-2 w-full mb-4 rounded" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <h2 className="text-xl mb-4">Password</h2>
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className='text-right mt-4'>
                <button type="submit" className="bg-blue-500 text-white p-2 w-2/3 rounded hover:bg-green-700 transition">
                    Login
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;