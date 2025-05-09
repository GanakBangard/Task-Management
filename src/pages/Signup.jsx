import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");  // Redirect to home or dashboard if already logged in
    }
  }, [isLoggedIn, navigate]);

  const [Data, setData] = useState({ username: "", email: "", password: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (!Data.username || !Data.email || !Data.password) {
        alert("All fields are required");
        return;
      }

      const response = await axios.post("http://localhost:1000/api/v1/sign-in", Data);
      console.log("Signup success:", response.data);

      setData({ username: "", email: "", password: "" });

      // Navigate to Login after successful signup
      navigate("/Login");
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred during signup");
      }
    }
  };

  return (
    <div className='h-[98vh] flex justify-center items-center'>
      <div className='bg-gray-800 p-2 w-2/6 rounded-md flex flex-col'>
        <div className='flex justify-center text-2xl font-semibold my-1'>
          <h2>Sign up</h2>
        </div>

        <input
          type="text"
          placeholder='Username'
          className='bg-gray-700 p-2 mx-3 my-2 rounded'
          name='username'
          onChange={change}
          value={Data.username}
        />
        <input
          type="email"
          placeholder='Email'
          className='bg-gray-700 p-2 mx-3 my-2 rounded'
          name='email'
          onChange={change}
          value={Data.email}
        />
        <input
          type="password"
          placeholder='Password'
          className='bg-gray-700 p-2 mx-3 my-2 rounded'
          name='password'
          onChange={change}
          value={Data.password}
        />

        <div className='flex justify-between items-center'>
          <button
            className='bg-blue-500 text-xl font-semibold p-2 mx-3 my-2 rounded text-black'
            onClick={submit}
          >
            Sign up
          </button>
          <Link to="/Login" className='text-gray-500 p-2 mx-3 my-2 underline hover:text-gray-200'>
            Already having an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
