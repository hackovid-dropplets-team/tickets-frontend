import React, { useState } from 'react';

import LoginForm from './login/Login.js';
import RegisterForm from './register/Register.js';

import './Auth.scss';


const AuthPage = () => {

  const [toggleForm, setToggleForm] = useState(false);

  return (
    <div className="auth-page">
      {toggleForm ? (
        <RegisterForm setToggleForm={setToggleForm} />
      ) : (
        <LoginForm setToggleForm={setToggleForm} />
      )}
    </div>
  );
};

export default AuthPage;
