'use client';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';
import { app, auth } from './config'; // Use the updated import
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA verified');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
        }
      });
    }
  }, [auth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleOTPchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      const formattedPhoneNumber = "+91" + phoneNumber;
      console.log('Attempting to send OTP to:', formattedPhoneNumber);

      if (window.recaptchaVerifier) {
        const result = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);
        setConfirmationResult(result);
        setOtpSent(true);
        setPhoneNumber('');
        alert('OTP has been sent');
      } else {
        console.error('RecaptchaVerifier not initialized');
        setError('Failed to initialize reCAPTCHA. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!confirmationResult) {
        throw new Error('No confirmation result available');
      }
      const userCredential = await confirmationResult.confirm(otp);
      console.log('User signed in:', userCredential.user);
      alert('OTP verified successfully');
      router.push('/home');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login with OTP</h1>
      <div id="recaptcha-container"></div>
      {!otpSent ? (
        <>
          <input
            type="tel"
            value={phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            pattern="[0-9]{10}"
            required
          />
          <button onClick={handleSendOtp} disabled={loading}>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={otp}
            onChange={handleOTPchange}
            placeholder="Enter OTP"
            required
          />
          <button onClick={handleOtpSubmit} disabled={loading}>
            {loading ? 'Verifying...' : 'Submit OTP'}
          </button>
        </>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
