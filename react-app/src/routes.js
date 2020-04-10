import React, { useState, useEffect } from 'react';

import { Route, Redirect } from 'react-router';
import { BrowserRouter as Router } from "react-router-dom";

import CircularProgress from '@material-ui/core/CircularProgress';

import { AuthPage } from './pages/auth';
import { TicketsPage } from './pages/tickets';
import { NewTicketPage } from './pages/new-ticket';
import { DetailTicketPage } from './pages/detail-ticket';


const AppRouter = (props) => {

  const loggedIn = props.loggedIn;

  const [urlIsLogin, setUrlIsLogin] = useState(
    window.location.pathname.substring(0, 11) === "/auth"
  );

  useEffect(() => {
    setUrlIsLogin(
      window.location.pathname.substring(0, 11) === "/auth"
    )
  }, [loggedIn]);

  const routes = (
    <React.Fragment>
      <Route exact path="/" component={TicketsPage} />
      <Route exact path="/auth/" component={AuthPage} />
      <Route exact path="/publicar" component={NewTicketPage} />
      <Route exact path="/detall/:id" component={DetailTicketPage} />
    </React.Fragment>
  );

  let content = null;

  if (loggedIn === true && urlIsLogin) {
    content = (
      <Redirect to="/" />
    )
  } else if (loggedIn === false && !urlIsLogin) {
    content = (
      <Redirect to="/auth"/>
    );
  } else if (loggedIn === undefined) {
    content = (
      <CircularProgress />
    );
  } else {
    content = routes;
  }

  return (
    <Router>
      {content}
    </Router>
  );
};

export default AppRouter;
