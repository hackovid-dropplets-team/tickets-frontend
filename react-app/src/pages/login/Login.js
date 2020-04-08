import React, { useState } from 'react';

import AuthApiService from '../../api-services/auth.js';

import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import './Login.scss';


const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(undefined);

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log('passo per aquí');
    setSubmitting(true);

    AuthApiService.postAuthLogin(username, password)
    .then(
      (result) => {
        // redirect
        setSuccess(true);
        setSubmitting(false);
      },
      (error) => {
        setSuccess(false);
        setSubmitting(false);
      }
    );
  }

  //if success redirect to home /
  return (
    <div className="login-page">
      <h1>DROPPLETS</h1>

      <form onSubmit={handleSubmit}>
        <Card className="form-card">

          <CardContent>
            <FormControl component="fieldset">
              <InputLabel htmlFor="input-with-icon-adornment">Nom d'usuari</InputLabel>
              <Input
                id="input-with-icon-adornment"
                value={username}
                onChange={event => setUsername(event.target.value)}
                autoFocus
                />
            </FormControl>

            <FormControl component="fieldset">
              <InputLabel htmlFor="adornment-password">Contrasenya</InputLabel>
              <Input
                id="adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={event => setPassword(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={() => {setShowPassword(!showPassword)}}
                      className={"login-password-icon" + (showPassword ? " visible" : "")}
                      >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                />
            </FormControl>
          </CardContent>

          <CardActions className="login-button-container">
            <Button
              type="submit"
              variant="contained"
              className={"login-button" + (success===false ? " error" : "")}
              disabled={submitting}
              >
              Entrar
            </Button>
            {submitting && <CircularProgress size={24} className="login-loader" />}
            {success===false && <p className="login-error-message">Credencials incorrectes</p> }
          </CardActions>

        </Card>
      </form>
    </div>
  );
};

export default LoginPage;
