import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const FloatingNewButton = () => {

  return (
    <div className="floating-new-button">
      <Fab variant="extended" color="primary">
        <AddIcon />
        Nova necessitat
      </Fab>
    </div>
  );
}
export default FloatingNewButton;
