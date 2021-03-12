import React from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import {DashSquare, PlusSquare, Trash} from 'react-bootstrap-icons';


const ControlButtons = ({ dispatch }) => {

  // API CALLS

  const removeLast = () => {
    dispatch({type: "REMOVE_LAST"});
  }

  const addEntry = () => {
    dispatch({type: "ADD"});
  }

  const clear = () => {
    dispatch({type: "CLEAR"});
  }


  // HTML

  return (
    <ButtonGroup style={{float: 'right'}}>
      <Button variant="link" onClick={removeLast}>
        <DashSquare color="grey" width="24" height="24" />
      </Button>
      <Button variant="link" onClick={addEntry}>
        <PlusSquare color="grey" width="24" height="24" />
      </Button>
      <Button variant="link" onClick={clear}>
        <Trash color="red" width="16" height="16" />
      </Button>
    </ButtonGroup>
  );
};

export default ControlButtons;
