import React, { useState, useEffect } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const TicketsList = (props) => {

  const tickets = props.tickets;

  return (
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
  );
};

export default TicketsList;
