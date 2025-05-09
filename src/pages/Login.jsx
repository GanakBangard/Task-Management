import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { authActions } from '../store/auth'; // adjust path as needed

const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const history = useNavigate();
  const dispatch = useDispatch(); // ← Redux dispatch

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    navigate("/");
  }

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post("http://localhost:1000/api/v1/log-in", Data);
        console.log(response);

        // ✅ Dispatch login action to update isLoggedIn = true
        dispatch(authActions.login());

        // Clear form and navigate to Home
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        history("/"); // you defined "/" for <Home />
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className='h-[98vh] flex justify-center items-center'>
      <div className='bg-gray-800 p-2 w-2/6 rounded-md flex flex-col'>
        <div className='flex justify-center text-2xl font-semibold my-1'><h2>Login</h2></div>
        <input type="username" placeholder='Username' className='bg-gray-700 p-2 mx-3 my-2 rounded' name='username' value={Data.username} onChange={change} />
        <input type="password" placeholder='Password' className='bg-gray-700 p-2 mx-3 my-2 rounded' name='password' value={Data.password} onChange={change} />
        <div className='flex items-center justify-between'>
          <button className='bg-blue-500 text-xl font-semibold p-2 mx-3 my-2 rounded text-black' onClick={submit}>Login</button>
          <Link to="/Signup" className='text-gray-500 p-2 mx-3 my-2 underline hover:text-gray-200'>Not having an account? Signup here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
