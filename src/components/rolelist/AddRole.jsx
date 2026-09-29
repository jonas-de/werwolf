import {useState} from 'react';
import {Button, Col, Form, Modal, Row} from 'react-bootstrap';
import RoleBadge from '../RoleBadge';
import {count, selectionMode, type as roleType, typeDescriptions} from '../../data/Roles';

const defaultShare = 0.33;

const AddRoleModal = ({show, handleShow, roles, save}) => {

  // list of existing role names to check for a duplicate
  const existingRoleNames = roles.map(role => role.name.toLowerCase());

  // the name of the role
  const [name, setName] = useState("");
  const trimmedName = name.trim();
  // checks if the name does not exist before
  const validName = !existingRoleNames.includes(trimmedName.toLowerCase());

  // the type of the role -- maps to one of the type definitions
  const [type, setType] = useState(roleType.passive);

  // switch if role is a group
  const [group, setGroup] = useState(false);
  // if role is a group set a share
  const [groupShare, setGroupShare] = useState(defaultShare);
  const validShare = groupShare > 0 && groupShare <= 1;

  const canSave = trimmedName.length > 0 && validName && (!group || validShare);

  const saveRole = () => {
    handleShow(false);
    save({
      type: "NEW_SAVE",
      payload: {
          id: Math.max(...roles.map(r => r.id)) + 1,
          name: trimmedName,
          type: type,
          count: group ? count.group : count.single,
          ...(group && {share: groupShare}),
          selection: selectionMode.manual,
          settings: [],
      }
    });
    setName("");
    setType(roleType.passive);
    setGroup(false);
    setGroupShare(defaultShare);
  }

  // pressing Enter would otherwise submit the form natively and reload the page
  const submit = e => {
    e.preventDefault();
    if (canSave) saveRole();
  }

  return (
    <Modal show={show} backdrop="static" onHide={() => handleShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Neue Rolle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* The form to add the new role */}
        <Form onSubmit={submit}>
          <Form.Control type="text" value={name} placeholder="Name" onChange={e => setName(e.target.value)} isInvalid={!validName}/>
          <Form.Group>
            { Object.entries(typeDescriptions).map(([key, name]) =>
              <Form.Check key={key} id={key} type="radio">
                <Form.Check.Input type="radio" checked={roleType[key] === type} onChange={() => setType(roleType[key])}/>
                <Form.Check.Label>
                  <h4><RoleBadge type={roleType[key]}>{name}</RoleBadge></h4>
                </Form.Check.Label>
              </Form.Check>
            )}
          </Form.Group>
          <Form.Check label="Gruppe" type="checkbox" checked={group} onChange={e => setGroup(e.target.checked)} />
          { group && (
            <Form.Group as={Row}>
              <Col xs="auto" style={{display: "flex", alignItems: "center"}}>
                <Form.Label>Anteil (0-1)</Form.Label>
              </Col>
              <Col>
                <Form.Control width="auto"
                  type="number" min="0.01" max="1" step="0.01" value={groupShare} isInvalid={!validShare}
                  onChange={e => setGroupShare(Number(e.target.value))} />
              </Col>
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={saveRole} disabled={!canSave}>Hinzufügen</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddRoleModal
