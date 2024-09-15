import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './login.css'; // Use the same CSS file to maintain consistent styling

const EmailVerified = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      if (!token) {
        setMessage('Invalid token.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/verify-email?token=${token}`);
        const result = await response.json();
        setMessage(result.message);
      } catch (error) {
        setMessage('An error occurred during verification.');
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="login">
      <div className="container">
        <div className="titleContainer">Email Verification</div>
        <div className="text-red-500 mb-4">{message}</div>
        <div className="signupOption">
          <span>
            <b onClick={() => window.location.href = '/login'} className="signupLink">Go to Login</b>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmailVerified;
