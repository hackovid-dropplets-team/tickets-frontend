import React, { useState, useEffect } from 'react';

import TicketsApiService from '../../api-services/tickets.js';

import ReturnBar from '../../shared/return-bar/ReturnBar.js';


const DetailTicketPage = (props) => {

  const [ticketId, ] = useState(props.match.params.id);
  const [ticketData, setTicketData] = useState();
  const [error, setError] = useState(undefined);

  useEffect(() => {
    TicketsApiService.getTicket(ticketId)
    .then(
      (result) => {
        setTicketData(result);
      },
      (error) => {
        setError(true);
      }
    );
  }, [ticketId]);

  return (
    <div className="new-ticket-page">
      <ReturnBar title={"Detall publicació " + ticketId} />
      <h2>{ticketData ? ticketData.title : ""}</h2>
      <p>{ticketData ? ticketData.description : ""}</p>
      <p><b>Latitud: </b>{ticketData ? ticketData.latitude : ""}</p>
      <p><b>Longitud: </b>{ticketData ? ticketData.longitude : ""}</p>
      <p><b>Email de contacte: </b>{ticketData ? ticketData.email_contact : ""}</p>
    </div>
  );
};

export default DetailTicketPage;
