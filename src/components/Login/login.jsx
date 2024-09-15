import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct import statement
import './login.css'; // Import the new CSS file

export default function Login() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        const { token } = result;
        localStorage.setItem('token', token);

        // Decode token to get user info
        const decoded = jwtDecode(token);

        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify({
          id: decoded.id,
          email: decoded.email,
          is_admin: decoded.is_admin
        }));

        if (decoded.is_admin) {
          navigate('/admin/dashboard'); // Redirect to admin dashboard
        } else {
          navigate('/watchlist'); // Redirect to user watchlist
        }
      } else {
        setMessage(result.message || 'Login failed');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="titleContainer">Login</div>
        <div className="text-red-500 mb-4">{message}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputContainer">
            <label>Email</label>
            <input
              {...register('email')}
              type="email"
              placeholder="Enter your email"
              className={`${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <div className="errorLabel">{errors.email.message}</div>}
          </div>

          <div className="inputContainer">
            <label>Password</label>
            <input
              {...register('password')}
              type="password"
              placeholder="Enter your password"
              className={`${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && <div className="errorLabel">{errors.password.message}</div>}
          </div>

          <div className="inputContainer">
            <input
              type="submit"
              value="Login"
              className="inputButton"
            />
          </div>
        </form>
        
        {/* New Signup Option */}
        <div className="signupOption">
          <span>
            New to the site? <b onClick={() => navigate('/signup')} className="signupLink">Sign up now.</b>
          </span>
        </div>
      </div>
    </div>
  );
}
