import React from 'react';
import {Button, Form, InputGroup} from 'react-bootstrap';
import {X} from 'react-bootstrap-icons';


const NameListEntry = ({ name, index, dispatch}) => {

  // API CALLS

  const handleListNav = e => {
    dispatch({type: "NAVIGATION", index, payload: e});
  }

  const changeName = e => {
    dispatch({type: "CHANGE", index, payload: e.target.value});
  }

  const removeEntry = () => {
    dispatch({type: "REMOVE", index});
  }


  // HTML

  return (
    <InputGroup key={index} className="pl-2 pt-1">
      <Form.Control type="text" value={name} onChange={changeName} onKeyDown={handleListNav} />
      <Button variant="link" onClick={removeEntry}>
        <X color="grey" />
      </Button>
    </InputGroup>
  );
};

export default NameListEntry;
