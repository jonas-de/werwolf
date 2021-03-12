import React, {useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';

const CreateSession = ({sessions, show, handleShow, save}) => {

  const [name, setName] = useState("");
  const validName = !sessions.map(s => s.name.toLowerCase()).includes(name.toLowerCase());

  const saveNewSession = () => {
    handleShow(false);
    save({type: "NEW", payload: name});
    setName("");
  }

  return (
    <Modal show={show} backdrop="static" onHide={() => handleShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Neue Geteilte Session</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control type="text" placeholder="Session" value={name} isInvalid={!validName} onChange={e => setName(e.target.value)}/>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={saveNewSession} disabled={name.length === 0 || !validName}>Speichern</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateSession;
