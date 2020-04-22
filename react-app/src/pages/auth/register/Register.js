import React, { useState } from 'react';

import AuthApiService from '../../../api-services/auth.js';
import {usePosition} from '../../../api-services/usePosition';

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
import Alert from '@material-ui/lab/Alert';
import InfoIcon from '@material-ui/icons/Info';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './Register.scss';
import {Redirect} from "react-router";

const RegisterForm = (props) => {

  const [username, setUsername] = useState('');
  const [mail, setMail] = useState('');
  const [radiAccio, setRadiAccio] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoOpen, setInfoOpen] = useState(false);

  const {latitude, longitude, error} = usePosition();

  const handleInfoOpen = () => {
    setInfoOpen(true);
  }

  const handleInfoClose = () => {
    setInfoOpen(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const strongRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");
    if (password !== passwordRepeat) {
      setSuccess(false);
      setErrorMessage("Les contrasenyes no són idèntiques");
    } else {
      if (strongRegex.test(password)) {
        setSubmitting(true);
        AuthApiService.postAuthRegister(username, mail, password, latitude, longitude, radiAccio)
        .then(
          (result) => {
            // redirect
            window.location.reload();
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
      <h1>Registre</h1>

      <form onSubmit={handleSubmit}>
        <Card className="form-card">

          <CardContent>
            <FormControl component="fieldset">
              <InputLabel htmlFor="input-with-icon-adornment">Nom *</InputLabel>
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
              <InputLabel htmlFor="input-with-icon-adornment">Radi d'acció</InputLabel>
              <Input
                  id="input-with-icon-adornment"
                  type={'number'}
                  value={radiAccio}
                  onChange={event => setRadiAccio(event.target.value)}
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
                      className={"register-password-icon" + (showPassword ? " visible" : "")}
                      >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                />
            </FormControl>

            <FormControl component="fieldset">
              <InputLabel htmlFor="adornment-password-repeat">Repetiu la contrasenya *</InputLabel>
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

            <div className="buttons-container">
              <Button
                type="submit"
                variant="contained"
                className={"register-button" + (success===false ? " error" : "")}
                disabled={submitting}
                >
                Envieu
              </Button>
              <IconButton
                aria-label="Toggle password visibility" onClick={handleInfoOpen}>
                  <InfoIcon></InfoIcon>
              </IconButton>
              <Dialog
                open={infoOpen}
                onClose={handleInfoClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Informació de la contrasenya"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                  La contrasenya ha de contenir un mínim de 8 caràcters amb majúscules, minúscules i números.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleInfoClose} color="primary">
                    D'acord
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </CardActions>
        </Card>
        {success===false && <Alert severity="error" className="register-error-message">{errorMessage}</Alert>}
        <Button className={"back-button"} color="primary" onClick={() => props.setToggleForm(false)}>Torneu a l'inici</Button>
      </form>
    </div>
  );
};

export default RegisterForm;
