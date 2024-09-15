import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './signup.css'; // Add your CSS file

export default function SignUp() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  // Validation schema with optional role field
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    role: Yup.string().oneOf(['User', 'Admin'], 'Invalid role selected'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        navigate('/login');
      } else {
        setMessage(result.message || 'Signup failed');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="titleContainer">Sign Up</div>
        <div className="text-red-500 mb-4">{message}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputContainer">
            <label>Username</label>
            <input
              {...register('username')}
              type="text"
              placeholder="Enter your username"
              className={`${errors.username ? 'border-red-500' : ''}`}
            />
            {errors.username && <div className="errorLabel">{errors.username.message}</div>}
          </div>

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
            <label>Role</label>
            <select
              {...register('role')}
              className={`${errors.role ? 'border-red-500' : ''}`}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            {errors.role && <div className="errorLabel">{errors.role.message}</div>}
          </div>

          <div className="inputContainer">
            <input
              type="submit"
              value="Sign Up"
              className="inputButton"
            />
          </div>
        </form>

        {/* Navigate to Login */}
        <div className="loginOption">
          <span>
            Already have an account? <b onClick={() => navigate('/login')} className="loginLink">Sign in now.</b>
          </span>
        </div>
      </div>
    </div>
  );
}
