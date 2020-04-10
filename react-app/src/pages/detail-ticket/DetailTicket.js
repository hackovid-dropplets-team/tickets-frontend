import React, { useState, useEffect } from 'react';

import TicketsApiService from '../../api-services/tickets.js';

import ReturnBar from '../../shared/return-bar/ReturnBar.js';


const DetailTicketPage = (props) => {

  const [ticketId, ] = useState(parseInt(props.match.params.id));
  const [ticketData, setTicketData] = useState();
  const [error, setError] = useState(undefined);

  useEffect(() => {
    TicketsApiService.getTicket(ticketId)
    .then(
      (result) => {
        console.log(result.data);
        setTicketData(result.data);
      },
      (error) => {
        setError(true);
      }
    );
  }, [ticketId]);

  return (
    <div className="new-ticket-page">
      <ReturnBar title={"Detall publicació " + ticketId} />

      <h2>DETALL {ticketData ? ticketData.title : ""}</h2>
    </div>
  );
};

export default DetailTicketPage;
