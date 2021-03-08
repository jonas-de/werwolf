import React, {useState} from 'react';
import {Modal, Form, Badge, Button} from 'react-bootstrap';

const AddRoleModal = ({show, handleShow, save}) => {

  const [name, setName] = useState("");
  const [type, setType] = useState(3);
  const [group, setGroup] = useState(false);
  const [village, setVillage] = useState(false);
  const typeNames = ["Böse", "Bewohner", "Nachtaktiv", "Passiv", "Sonstiges"];
  const typeVariants = ["danger", "primary", "warning", "info", "secondary"];

  const updateType = (index) => {
    setType(index);
    setVillage((index === 1 || index === 3));
  }

  const saveRole = () => {
    handleShow(false);
    save({
      type: "NEW_SAVE",
      payload: {
        role: {
          name,
          variant: typeVariants[type],
          count: 1,
          enabled: true,
          group,
          sharedSession: village,
        }
      }
    });
    setName("");
    setType(3);
    setGroup(false);
    setVillage(false);
  }

  return (
    <Modal show={show} backdrop="static" onHide={() => handleShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Neue Rolle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control type="text" value={name} placeholder="Name" onChange={e => setName(e.target.value)} />
          <Form.Group>
            { typeNames.map((name, index) =>
              <Form.Check id={index} type="radio">
                <Form.Check.Input type="radio" checked={index === type} onChange={() => updateType(index)}/>
                <Form.Check.Label>
                  <h4><Badge variant={typeVariants[index]}>{name}</Badge></h4>
                </Form.Check.Label>
              </Form.Check>
            )}
          </Form.Group>
          <Form.Check label="Gruppe" type="checkbox" checked={group} onChange={e => setGroup(e.target.checked)} />
          <Form.Check label="Geteilte Dorfsession" type="checkbox" checked={village} onChange={e => setVillage(e.target.checked)} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={saveRole} disabled={name.length === 0}>Hinzufügen</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddRoleModal
