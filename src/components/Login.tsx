import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from '../store/configureStore';
import { login } from '../actions/authActions';
import Constants from '../constants';

const Login: React.FC = () => {
  const dispatch = useDispatch<any>();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isAgreeChecked, setIsAgreeChecked] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isButtonEnabled = isEmailValid && password.length > 0 && isAgreeChecked;

  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(newEmail)) {
      setEmailError(Constants.ERROR_MESSAGE);
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword.length < 8) {
      setPasswordError(Constants.PASSWORD_ERROR_MESSAGE);
    } else {
      setPasswordError('');
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreeChecked(e.target.checked);
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!emailError && !passwordError && isButtonEnabled) {
      dispatch(login({ email, password }));
    } else {
      if (!isAgreeChecked) {
        toast.error('Please agree to terms and conditions.', {
          position: 'top-right',
          autoClose: 5000, // Optional: Auto-close the toast after 5 seconds
        });
      }
    }
  };

  const buttonClass = isButtonEnabled ? 'enabled' : 'disabled';
  const buttonLabel = {
    color: isButtonEnabled ? 'white' : 'blue',
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className="login-form mt-5">
        <div className="form-group mb-4">
          <label htmlFor="inputEmail">{Constants.EMAIL}</label>
          <input
            type="email"
            className="form-control form-control-lg w-25"
            id="inputEmail"
            aria-describedby="emailHelp"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        </div>
        <div className="form-group mb-4">
          <label htmlFor="inputPassword">{Constants.PASSWORD}</label>
          <input
            type="password"
            id="inputPassword"
            className="form-control form-control-lg w-25"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        </div>
        <div className="form-check checkbox-lg w-25 mb-4">
          <input
            type="checkbox"
            checked={isAgreeChecked}
            onChange={handleCheckboxChange}
            className="form-check-input"
            id="inputCheck"
          />
          <label className="form-check-label" htmlFor="inputCheck">
            {`${Constants.AGREEMENT_MESSAGE} `}
            <strong>{Constants.TERMS_AND_CONDITIONS}</strong>{' '}
            {` ${Constants.AND} `} <strong>{Constants.PRIVACY_POLICY}</strong>
          </label>
        </div>
        <button
          type="submit"
          disabled={!isButtonEnabled || loading}
          className={`btn btn-primary w-25 mb-4 ${buttonClass}`}
          onClick={handleLogin}
        >
          <span style={buttonLabel}>{Constants.NEXT_BUTTON_LABEL}</span>
        </button>
      </form>
    </div>
  );
};

export default Login;
