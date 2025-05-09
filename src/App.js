import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AllTask from "./pages/AllTask";
import ImportantTask from "./pages/ImportantTask";
import CompletedTask from "./pages/CompletedTask";
import IncompleteTask from "./pages/IncompleteTask";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/auth";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for token and id in localStorage
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login()); // Update the Redux store with login state
    }
  
    // If the user is not logged in and is not already on /Signup or /Login, redirect to /Signup
    if (!isLoggedIn && !["/Signup", "/Login"].includes(location.pathname)) {
      navigate("/Signup");
    }
  
    // ✅ Only redirect to "/" if the current route is Signup or Login
    if (isLoggedIn && ["/Signup", "/Login"].includes(location.pathname)) {
      navigate("/"); // Redirect to the home page if logged in and on auth page
    }
  
  }, [isLoggedIn, navigate, location.pathname, dispatch]);
  

  return (
    <div className="bg-gray-900 text-white p-2 h-screen relative">
      <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<AllTask />} />
        <Route path="ImportantTask" element={<ImportantTask />} />
        <Route path="CompletedTask" element={<CompletedTask />} />
        <Route path="IncompleteTask" element={<IncompleteTask />} />
      </Route>

        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
