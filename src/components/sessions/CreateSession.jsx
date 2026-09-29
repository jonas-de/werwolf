import {useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';

const CreateSession = ({sessions, show, handleShow, save}) => {

  const [name, setName] = useState("");
  const trimmedName = name.trim();
  const validName = !sessions.map(s => s.name.toLowerCase()).includes(trimmedName.toLowerCase());
  const canSave = trimmedName.length > 0 && validName;

  const saveNewSession = () => {
    handleShow(false);
    save({type: "NEW", payload: trimmedName});
    setName("");
  }

  // pressing Enter would otherwise submit the form natively and reload the page
  const submit = e => {
    e.preventDefault();
    if (canSave) saveNewSession();
  }

  return (
    <Modal show={show} backdrop="static" onHide={() => handleShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Neue Geteilte Session</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submit}>
          <Form.Control type="text" placeholder="Session" value={name} isInvalid={!validName} onChange={e => setName(e.target.value)}/>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={saveNewSession} disabled={!canSave}>Speichern</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateSession;
