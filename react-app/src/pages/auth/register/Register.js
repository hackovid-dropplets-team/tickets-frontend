import React, { useState } from 'react';

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
import Typography from '@material-ui/core/Typography';

import './Register.scss';


const RegisterForm = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const strongRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");
    if (password !== passwordRepeat) {
      setSuccess(false);
      setErrorMessage("Les contrasenyes no són idèntiques");
    } else {
      if (strongRegex.test(password)) {
        setSubmitting(true);

        AuthApiService.postAuthRegister(username, password)
        .then(
          (result) => {
            // redirect
            setSuccess(true);
            setSubmitting(false);
          },
          (error) => {
            setSuccess(false);
            setSubmitting(false);
            setErrorMessage("S'ha produït un error, proveu un altre nom d'usuari");
          }
        );
      } else {
        setSuccess(false);
        setErrorMessage("La contrasenya no és prou segura");
      }
    }
  }

  return (
    <div className="register-form">
      <h1>NOU REGISTRE</h1>

      <form onSubmit={handleSubmit}>
        <Card className="form-card">

          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Trieu un nom d'usuari i una contrasenya a continuació.
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              La contrasenya ha de contenir un mínim de 8 caràcters amb majúscules, minúscules i números.
            </Typography>

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
                      className={"register-password-icon" + (showPassword ? " visible" : "")}
                      >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                />
            </FormControl>

            <FormControl component="fieldset">
              <InputLabel htmlFor="adornment-password-repeat">Repetiu la contrasenya</InputLabel>
              <Input
                id="adornment-password-repeat"
                type={showPasswordRepeat ? 'text' : 'password'}
                value={passwordRepeat}
                onChange={event => setPasswordRepeat(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={() => {setShowPasswordRepeat(!showPasswordRepeat)}}
                      className={"register-password-icon" + (showPasswordRepeat ? " visible" : "")}
                      >
                      {showPasswordRepeat ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                />
            </FormControl>
          </CardContent>

          <CardActions className="actions-container">
            {submitting && <CircularProgress size={24} className="register-loader" />}
            {success===false && <p className="register-error-message">{errorMessage}</p> }

            <div className="buttons-container">
              <Button color="primary" onClick={() => props.setToggleForm(false)}>Torneu a l'inici</Button>

              <Button
                type="submit"
                variant="contained"
                className={"register-button" + (success===false ? " error" : "")}
                disabled={submitting}
                >
                Envieu
              </Button>
            </div>
          </CardActions>

        </Card>
      </form>
    </div>
  );
};

export default RegisterForm;
