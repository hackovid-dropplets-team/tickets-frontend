import React, { useState, useEffect } from 'react';

import TicketsApiService from '../../api-services/tickets.js';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AppMenu from './app-menu/AppMenu.js';

import './Tickets.scss';


const TicketsPage = () => {

  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(undefined);

  // componentDidMount
  useEffect(() => {
    TicketsApiService.getTickets()
    .then(
      (result) => {
        console.log(result.data);
        setTickets(result.data);
      },
      (error) => {
        setError(true);
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tickets-page">
      <AppMenu />

      <div className="tickets-list">
        {tickets && tickets.map((ticket, i) => (
          <Card className="ticket-card">
            <CardContent>
              <Typography className="ticket-description" variant="h5" component="h2">
                {ticket.description}
              </Typography>
              <Typography className="ticket-title" color="textSecondary" gutterBottom>
                {ticket.title}
              </Typography>
              <Typography className="ticket-description" variant="body2" component="p">
                {"Usuari " + ticket.user_id}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Veure més</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
