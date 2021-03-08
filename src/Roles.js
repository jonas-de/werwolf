import React, {useReducer, useState} from 'react';
import {Form, Badge, Col, Button} from 'react-bootstrap';
import RoleTemplates from './RoleTemplates';
import {PeopleFill} from 'react-bootstrap-icons';
import AddRole from './AddRole';


const RoleEntry = ({role, index, max, dispatch}) => {

  const setEnabled = (e) => {
    dispatch({type: "ENABLED", payload: {index: index, value: e.target.checked}})
  }
  const setRest = (e) => {
    dispatch({type: "REST", payload: {index: index, value: e.target.checked}})
  }
  const setCount = (e) => {
    dispatch({type: "COUNT", payload: {index: index, value: e.target.value}})
  }

  const groupCount = role.count < role.min ? Math.round(role.defaultShare * max) : role.count;

  return (
    <Form.Row className="pl-2 py-1">
      <Col xs="auto" style={{display: "flex", alignItems: "center"}}>
        <Form.Check type="checkbox" checked={role.enabled || role.always} disabled={role.always} onChange={setEnabled}/>
      </Col>
      <Col xs="11" md="2">
        <h4><Badge variant={role.variant}>{role.name}</Badge></h4>
      </Col>
      { role.group && (
        <>
          <Col xs="2" md="1">
            <Form.Control type="number" step="1" min={role.min} max={max} value={groupCount} disabled={role.rest} onChange={setCount}/>
          </Col>
          <Col xs="4" sm="2">
            <Form.Control type="range" step="1" min={role.min} max={max} value={groupCount} disabled={role.rest} onChange={setCount}/>
          </Col>
          <Col>
            <Form.Check label="Rest" type="checkbox" checked={role.rest} onChange={setRest}/>
          </Col>
        </>
      )}
    </Form.Row>
  );
};


const Roles = () => {
  const roleReducer = (state, action) => {
    console.log(action);
    const newState = [...state];
    switch (action.type) {
      case "ENABLED":
        newState[action.payload.index].enabled = action.payload.value;
        return newState;
      case "REST":
        const newStateRest = newState.map(role => {
          return role.group ? { ...role, rest: false} : role
        });
        newStateRest[action.payload.index].rest = action.payload.value;
        return newStateRest;
      case "COUNT":
        newState[action.payload.index].count = Number(action.payload.value);
        return newState;
      case "NEW_SAVE":
        return [...state, action.payload.role];
    }
  }
  const [roles, dispatch] = useReducer(roleReducer, RoleTemplates);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div>
      <AddRole show={showAdd} handleShow={setShowAdd} save={dispatch} />
      <h2 className="p-2">
        <PeopleFill className="pr-1" />
        Rollen
       </h2>
      <Form className="p-2">
        { roles.map((role, index) => <RoleEntry role={role} max="5" index={index} dispatch={dispatch} />)}
      </Form>
      <Button variant="secondary" onClick={() => setShowAdd(true)}>Neue Rolle</Button>
    </div>
  );
};

export default Roles;
