import React, { useState, useEffect } from 'react';

import TicketsApiService from '../../api-services/tickets.js';

import AppMenu from './app-menu/AppMenu.js';
import FloatingNewButton from './new-button/NewButton.js';
import TicketsList from './tickets-list/TicketsList.js';

import './Tickets.scss';


const TicketsPage = () => {

  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(undefined);

  // componentDidMount
  useEffect(() => {
    TicketsApiService.getTickets()
    .then(
      (result) => {
        setTickets(result);
      },
      (error) => {
        setError(true);
      }
    );
  }, []);

  return (
    <div className="tickets-page">
      <AppMenu />
      <FloatingNewButton />

      <TicketsList tickets={tickets} />
    </div>
  );
};

export default TicketsPage;
