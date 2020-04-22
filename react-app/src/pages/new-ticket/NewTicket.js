import React, {useState} from 'react';

import ReturnBar from '../../shared/return-bar/ReturnBar.js';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import TicketsApiService from "../../api-services/tickets";
import { Redirect } from "react-router-dom";

import './NewTicket.scss';

const NewTicketPage = (props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState('');
    const [redirectToMyTickets, setRedirectToMyTickets] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (title !== '' && description !== '') {
            setSubmitting(true);
            TicketsApiService.postNewTicket(title, description)
                .then(
                    (result) => {
                        // redirect
                        setSuccess(true);
                        setSubmitting(false);
                        setRedirectToMyTickets(true);
                    },
                    (error) => {
                        setSuccess(false);
                        setSubmitting(false);
                        setErrorMessage("S'ha produït un error, proveu en un altre moment");
                    }
                );
        } else {
            setSuccess(false);
            setErrorMessage("Els camps no poden estar buits");
        }
    }

    return (
        <div className="new-ticket-page">
          {redirectToMyTickets===true && <Redirect to='/myTickets' />}
          <ReturnBar title="Publiqueu una nova necessitat" />
          <h2>FORMULARI</h2>

            <form onSubmit={handleSubmit}>
                <Card className="form-card">

                    <CardContent>
                        <FormControl component="fieldset">
                            <InputLabel htmlFor="input-with-icon-adornment">Títol *</InputLabel>
                            <Input
                                id="input-with-icon-adornment"
                                value={title}
                                onChange={event => setTitle(event.target.value)}
                                autoFocus
                            />
                        </FormControl>

                        <FormControl component="fieldset">
                            <InputLabel htmlFor="input-with-icon-adornment">Descripció *</InputLabel>
                            <Input
                                id="input-with-icon-adornment"
                                value={description}
                                onChange={event => setDescription(event.target.value)}
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
                        </div>
                    </CardActions>
                    {success===false && <Alert severity="error" className="newTicket-error-message">{errorMessage}</Alert>}
                </Card>
            </form>
        </div>
    );
};

export default NewTicketPage;
