import React from 'react';

import TicketsApiService from '../../api-services/tickets.js';

import ReturnBar from '../../shared/return-bar/ReturnBar.js';


const NewTicketPage = () => {

  return (
    <div className="new-ticket-page">
      <ReturnBar title="Publiqueu una nova necessitat" />

      <h2>FORMULARI</h2>
    </div>
  );
};

export default NewTicketPage;
