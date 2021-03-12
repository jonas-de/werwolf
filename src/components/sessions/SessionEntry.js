import {Accordion, Badge, Button, Card, Col, Form, Row} from 'react-bootstrap';
import {Trash} from 'react-bootstrap-icons';
import React from 'react';

const SessionEntry = ({session, index, dispatch, roles}) => {

  const roleObject = {};
  for (const role of roles) {
    roleObject[role.id] = {
      name: role.name,
      type: role.type,
    }
  }

  const iKey = String(index);

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
          <Accordion.Toggle as={Col} xs="auto" eventKey={iKey}>
            <h4>{session.name}</h4>
          </Accordion.Toggle>
          <Col as={Form.Group} xs="6" lg="4">
            <strong>Max. Mitglieder je Session: {session.size}</strong>
            <Form.Control inline type="range" min="1" max="5" step="1" value={session.size} onChange={updateSize} />
          </Col>
          <Accordion.Toggle as={Col} eventKey={iKey}>
            <Button variant="link" style={{float: 'right'}} onClick={deleteSession}>
              <Trash color="red" />
            </Button>
          </Accordion.Toggle>
        </Row>
      </Card.Header>
      <Accordion.Collapse eventKey={iKey}>
        <Card.Body>
          <Row>
            { Object.entries(session.roles).map(([id, value]) => {
              return (
                <Col xs="6" sm="4" md="3" lg="2" key={id}>
                  <Form.Check type="checkbox">
                    <Form.Check.Input type="checkbox" checked={value} onChange={e => updateRole(e, id)}/>
                    <Form.Check.Label>
                      <h4><Badge variant={roleObject[id].type}>
                        {roleObject[id].name}
                      </Badge></h4>
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
