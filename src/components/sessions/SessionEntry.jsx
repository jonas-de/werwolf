import {Accordion, Button, Card, Col, Form, Row, useAccordionButton} from 'react-bootstrap';
import {Trash} from 'react-bootstrap-icons';
import RoleBadge from '../RoleBadge';

// only the session name opens and closes the accordion item
const SessionToggle = ({eventKey, children}) => {
  const toggle = useAccordionButton(eventKey);
  return (
    <Col xs="auto" onClick={toggle} style={{cursor: 'pointer'}}>
      {children}
    </Col>
  );
}

const SessionEntry = ({session, index, dispatch, roles, roleOwners}) => {

  const roleObject = {};
  for (const role of roles) {
    roleObject[role.id] = {
      name: role.name,
      type: role.type,
    }
  }

  // keyed by the unique name so the open state stays with the session when another one is deleted
  const eventKey = session.name;

  const updateSize = (e) => {
    dispatch({type: "SIZE", index, payload: Number(e.target.value)});
  }
  const updateRole = (e, id) => {
    dispatch({type: "ROLE", index, payload: {id, value: e.target.checked}});
  }

  const deleteSession = () => {
    dispatch({type: "DELETE", index: index});
  }

  return (
    <Card>
      <Card.Header >
        <Row style={{alignItems: "center"}}>
          <SessionToggle eventKey={eventKey}>
            <h4>{session.name}</h4>
          </SessionToggle>
          <Col xs="6" lg="4">
            <strong>Max. Mitglieder je Session: {session.size}</strong>
            <Form.Range min="1" max="5" step="1" value={session.size} onChange={updateSize} />
          </Col>
          <Col>
            <Button variant="link" style={{float: 'right'}} onClick={deleteSession}>
              <Trash color="red" />
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body>
          <Row>
            { Object.entries(session.roles).map(([id, value]) => {
              const owner = roleOwners[id];
              const takenElsewhere = owner !== undefined && owner !== session.name;
              return (
                <Col xs="6" sm="4" md="3" lg="2" key={id} title={takenElsewhere ? `Bereits in ${owner}` : undefined}>
                  <Form.Check type="checkbox" id={`session-${index}-role-${id}`}>
                    <Form.Check.Input type="checkbox" checked={value} disabled={takenElsewhere && !value} onChange={e => updateRole(e, id)}/>
                    <Form.Check.Label>
                      <h4><RoleBadge type={roleObject[id].type}>
                        {roleObject[id].name}
                      </RoleBadge></h4>
                    </Form.Check.Label>
                  </Form.Check>
                </Col>
              )
            })}
          </Row>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

export default SessionEntry;
