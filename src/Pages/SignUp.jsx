import axios from 'axios';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "",});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password!== formData.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await axios.post(import.meta.env.VITE_APP_API + "/admin/sign-in", {
        email: formData.email,
        password: formData.password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      setIsLoggedIn(true);
    } catch (error) {
      console.log(error.message);
      alert("Invalid email or password. Please try again.");
    }
  };

  if(isLoggedIn){
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-[100%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <p className="text-center text-gray-600 mt-4">
            Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
