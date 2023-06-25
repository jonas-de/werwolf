import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

//import {Container, Row, Col} from 'react-bootstrap';
import React, {useReducer} from 'react';
import NameList from './components/namelist/NameList';
import RoleList from './components/rolelist/RoleList';
import SessionSettings from './components/sessions/SessionSettings';
import Roles, {type as groupTypes} from './data/Roles';
import {initialRoleState, updateAutoRoleState, updateManualRoleState} from './data/RoleComputation';
import {Button, Col, Container, Row} from 'react-bootstrap';
import createResults from './data/Matching';
import Results from './Results';

const roleMode = {
  auto: 0,
  manual: 1,
}

const App = () => {


  const initialState = () => {

    const defaultSession = {name: "Dorf", size: 2, roles: {} };
    Roles.forEach(role => defaultSession.roles[role.id] = (role.type === groupTypes.good || role.type === groupTypes.passive));

    return {
      names: [""],
      roles: Roles,
      roleMode: roleMode.auto,
      roleState: initialRoleState(Roles),
      sessions: [defaultSession],
      results: { show: false, roles: {}, sessions: []},
    }
  }


  const updateRoleState = newState => {
    const playerCount = newState.names.filter(n => n.length > 0).length
    if (newState.roleMode === roleMode.auto) {
      return updateAutoRoleState(newState.roles, playerCount);
    }
    return updateManualRoleState(newState.roles, newState.roleState, playerCount);
  }

  const handleState = (oldState, action) => {
    const newState = {...oldState};
    console.log(action);
    switch (action.type) {
      case "NAMES":
        newState.names = action.payload;
        newState.roleState = updateRoleState(newState);
        return newState;
      case "ROLES.STATE":
        newState.roleMode = action.payload.mode;
        newState.roleState = action.payload.roleState;
        newState.roleState = updateRoleState(newState);
        return newState;
      case "ROLES.UPDATE":
        newState.roles = action.payload.roles;
        newState.roleState = action.payload.roleState;
        newState.roleState = updateRoleState(newState)
        return newState;
      case "SESSIONS":
        newState.sessions = action.payload;
        return newState;
      case "RESULTS":
        console.log("create results")
        newState.results = action.payload;
        return newState;
    }
  }

  const [state, updateState] = useReducer(handleState, null, initialState);

  const playerCount = state.names.filter(n => n.length > 0).length;

  const computeResults = () => {
    const results = createResults(state.names, state.roles, state.roleState, state.sessions);
    updateState({type: "RESULTS", payload: {show: true, roles: results.roles, sessions: results.sessions}});
  };

  return (
    <Container fluid>
      <Row className="py-2"><Col>
          <NameList names={state.names} dispatch={updateState} />
      </Col></Row>
      <Row className="py-2"><Col>
        <RoleList roles={state.roles}
                  roleMode={state.roleMode}
                  roleState={state.roleState}
                  playerCount={playerCount}
                  dispatch={updateState} />
      </Col></Row>
      <Row className="py-2"><Col>
      <SessionSettings sessions={state.sessions}
                       roles={state.roles}
                       dispatch={updateState} />
      </Col></Row>
      <Row className="pt-4 pl-2"><Col style={{display: 'flex', justifyContent: 'center'}}>
        <Button variant="primary" onClick={computeResults}>Rollen zuteilen</Button>
      </Col></Row>
      <Row className="py-2"><Col>
        { state.results.show && (
          <Results results={state.results} />
        )}
      </Col></Row>
      <Row><Col style={{display: 'flex', justifyContent: 'center'}}>
        - Swapingo ❤️ -
      </Col></Row>
    </Container>
  )
  //return (<Container><Row><Col><namelist /></Col><Col/></Row></Container>);
}

export {App as default, roleMode as roleSelectionMode };
