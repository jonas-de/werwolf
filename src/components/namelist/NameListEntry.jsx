import {Button, Form, InputGroup} from 'react-bootstrap';
import {X} from 'react-bootstrap-icons';


const NameListEntry = ({ name, index, duplicate, dispatch}) => {

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
    <InputGroup className="ps-2 pt-1">
      <Form.Control type="text" value={name} onChange={changeName} onKeyDown={handleListNav} isInvalid={duplicate} />
      <Button variant="link" onClick={removeEntry}>
        <X color="grey" />
      </Button>
    </InputGroup>
  );
};

export default NameListEntry;
