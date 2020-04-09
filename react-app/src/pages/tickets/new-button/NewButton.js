import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { Link } from "react-router-dom";

const FloatingNewButton = () => {

  return (
    <div className="floating-new-button">
      <Link to="/publicar" style={{ color: 'inherit', textDecoration: 'none' }}>
        <Fab variant="extended" color="primary">
          <AddIcon />
          Nova necessitat
        </Fab>
      </Link>
    </div>
  );
}
export default FloatingNewButton;
