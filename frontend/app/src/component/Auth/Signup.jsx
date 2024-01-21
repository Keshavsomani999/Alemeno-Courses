import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux"

const Signup = () => {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const showTab = (tabName) => {
    setActiveTab(tabName);
  };

  const handleLoginSubmit = async (e) => {
    dispatch({
        type:"login_Request"
      })
    e.preventDefault();
    
    try {
        
      const response = await axios.post('http://localhost:4000/api/v1/login', loginData);
      dispatch({
        type:"login_Success",
        payload:loginData
      })
      console.log('Login successful', response.data);
        navigate('/');
      setLoginData({
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    console.log(signupData);
    try {
      const response = await axios.post('http://localhost:4000/api/v1/register', signupData);

      console.log('Signup successful', response.data);
      navigate('/');

      setSignupData({
        name: '',
        email: '',
        password: '',
      });

      // Optionally, you can automatically switch to the login tab after successful signup
      showTab('login');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;

    if (formType === 'login') {
      setLoginData({
        ...loginData,
        [name]: value,
      });
    } else {
      setSignupData({
        ...signupData,
        [name]: value,
      });
    }
  };

  return (
    <div className='LoginBody'>
      <div className="Login-form-container">
        <div className="tab">
          <button
            className={activeTab === 'login' ? 'active' : ''}
            onClick={() => showTab('login')}
          >
            Login
          </button>
          <button
            className={activeTab === 'signup' ? 'active' : ''}
            onClick={() => showTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {activeTab === 'login' && (
          <div className="Loginform">
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) => handleInputChange(e, 'login')}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => handleInputChange(e, 'login')}
                required
              />
              <button type="submit">Login</button>
            </form>
          </div>
        )}

        {activeTab === 'signup' && (
          <div className="Loginform">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Username"
                value={signupData.name}
                onChange={(e) => handleInputChange(e, 'signup')}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={signupData.email}
                onChange={(e) => handleInputChange(e, 'signup')}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signupData.password}
                onChange={(e) => handleInputChange(e, 'signup')}
                required
              />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
