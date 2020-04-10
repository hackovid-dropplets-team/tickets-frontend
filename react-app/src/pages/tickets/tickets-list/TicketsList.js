import React, { useState, useEffect } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Link } from "react-router-dom";


const TicketsList = (props) => {

  const tickets = props.tickets;

  return (
    <div className="tickets-list">
      {tickets && tickets.map((ticket, i) => (
        <Link to={"/detall/" + ticket.id} style={{ color: 'inherit', textDecoration: 'none' }}>
          <Card className="ticket-card">
            <CardContent>
              <Typography className="ticket-title" variant="h5" component="h2">
                {ticket.title}
              </Typography>
              <Typography className="ticket-description" color="textSecondary" gutterBottom>
                {ticket.description}
              </Typography>
              <Typography className="ticket-username" variant="body2" component="p">
                {"Usuari " + ticket.user_id}
              </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default TicketsList;
