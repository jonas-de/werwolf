import React, {useState} from 'react';
import {Badge, Button, Col, Form, Modal, Row} from 'react-bootstrap';
import {selectionMode, type as roleType, typeDescriptions} from '../../data/Roles';

const AddRoleModal = ({show, handleShow, roles, save}) => {

  // list of existing role names to check for a duplicate
  const existingRoleNames = roles.map(role => role.name.toLowerCase());

  // the name of the role
  const [name, setName] = useState("");
  // checks if the name does not exist before
  const validName = !existingRoleNames.includes(name.toLowerCase());

  // the type of the role -- maps to one of the type definitions
  const [type, setType] = useState(roleType.passive);

  // switch if role is a group
  const [group, setGroup] = useState(false);
  // if role is a group set a share
  const [groupShare, setGroupShare] = useState(0.33)



  const saveRole = () => {
    handleShow(false);
    save({
      type: "NEW_SAVE",
      payload: {
          id: Math.max(...roles.map(r => r.id)) + 1,
          name,
          type: type,
          count: group ? 0 : 1,
          share: groupShare,
          selection: selectionMode.manual,
          settings: [],
      }
    });
    setName("");
    setType(roleType.passive);
    setGroup(false);
    //setVillage(false);
  }

  return (
    <Modal show={show} backdrop="static" onHide={() => handleShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Neue Rolle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* The form to add the new role */}
        <Form>
          <Form.Control type="text" value={name} placeholder="Name" onChange={e => setName(e.target.value)} isInvalid={!validName}/>
          <Form.Group>
            { Object.entries(typeDescriptions).map(([key, name]) =>
              <Form.Check id={key} type="radio">
                <Form.Check.Input type="radio" checked={roleType[key] === type} onChange={() => setType(roleType[key])}/>
                <Form.Check.Label>
                  <h4><Badge variant={roleType[key]}>{name}</Badge></h4>
                </Form.Check.Label>
              </Form.Check>
            )}
          </Form.Group>
          <Form.Check label="Gruppe" type="checkbox" checked={group} onChange={e => setGroup(e.target.checked)} />
          { group && (
            <Form.Group as={Row}>
              <Col xs="auto" style={{display: "flex", alignItems: "center"}}>
                <Form.Label inline>Anteil (0-1)</Form.Label>
              </Col>
              <Col>
                <Form.Control width="auto"
                  type="number" min="0" max="1" step="0.01" value={groupShare}
                  onChange={e => setGroupShare(Number(e.target.value))} />
              </Col>
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={saveRole} disabled={name.length === 0 || !validName}>Hinzufügen</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddRoleModal
