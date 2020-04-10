import React, { useState } from 'react';

import { Redirect } from 'react-router';

import AuthApiService from '../../../api-services/auth.js';

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
import Alert from '@material-ui/lab/Alert';

import './Login.scss';


const LoginForm = (props) => {

  const [username, setUsername] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(undefined);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    AuthApiService.postAuthLogin(username, mail, password)
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

  return success ? (
    <Redirect to="/" />
  ) : (
    <div className="login-form">
      <h1>Benvingut</h1>
      <p className="p-title">Inicia sessió</p>

      <form onSubmit={handleSubmit}>
        <Card className="form-card">

          <CardContent>
            <FormControl component="fieldset">
              <InputLabel htmlFor="input-with-icon-adornment">Usuari *</InputLabel>
              <Input
                id="input-with-icon-adornment"
                value={username}
                onChange={event => setUsername(event.target.value)}
                autoFocus
                />
            </FormControl>

            <FormControl component="fieldset">
              <InputLabel htmlFor="input-with-icon-adornment">Correu</InputLabel>
              <Input
                id="input-with-icon-adornment"
                value={mail}
                onChange={event => setMail(event.target.value)}
                />
            </FormControl>

            <FormControl component="fieldset">
              <InputLabel htmlFor="adornment-password">Contrasenya *</InputLabel>
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

          <CardActions className="actions-container">
            {submitting && <CircularProgress size={24} className="login-loader" />}

            <div className="buttons-container">
              <Button
                type="submit"
                variant="contained"
                className={"login-button" + (success===false ? " error" : "")}
                disabled={submitting}
                >
                Entreu
              </Button>
            </div>
          </CardActions>
        </Card>
        {success===false && <Alert severity="error" className="login-error-message">Credencials incorrectes</Alert>}
        <p className="p-register">No teniu compte?</p>
        <Button className={"register-button" + (success===false ? " error" : "")} color="primary" onClick={() => props.setToggleForm(true)}>Creeu-lo</Button>
      </form>
    </div>
  );
};

export default LoginForm;
