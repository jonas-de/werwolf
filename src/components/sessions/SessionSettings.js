import React, {useState} from 'react';
import {Accordion, Button} from 'react-bootstrap';
import {HouseFill, PlusSquare} from 'react-bootstrap-icons';
import CreateSession from './CreateSession';
import SessionEntry from './SessionEntry';

const SessionSettings = ({roles, sessions, dispatch}) => {

  const roleTemp = {}
  roles.forEach(role => roleTemp[role.id] = false);

  const sessionDispatcher = action => {
    const newSessions = [...sessions];
    switch (action.type) {
      case "SIZE":
        newSessions[action.index].size = action.payload;
        dispatch({type: "SESSIONS", payload: newSessions});
        break;
      case "ROLE":
        newSessions[action.index].roles[action.payload.id] = action.payload.value;
        dispatch({type: "SESSIONS", payload: newSessions});
        break;
      case "NEW":
        dispatch({type: "SESSIONS", payload: [...newSessions, {name: action.payload, size: 2, roles: roleTemp}]});
        break;
      case "DELETE":
        newSessions.splice(action.index, 1);
        dispatch({type: "SESSIONS", payload: newSessions});
        break;
      default:
        break;
    }
  }

  const [showAdd, setShowAdd] = useState(false);

  return (
    <div>
      <CreateSession show={showAdd} handleShow={setShowAdd} sessions={sessions} save={sessionDispatcher} />
      <h2>
        <HouseFill className="pr-1" />
        Geteilte Sessions
        <Button className="pl-2" variant="link" onClick={() => setShowAdd(true)}>
          <PlusSquare color="grey" width="24" height="24" />
        </Button>
      </h2>
      <Accordion>
        { sessions.map((s, i) => <SessionEntry session={s} index={i} roles={roles} dispatch={sessionDispatcher} />)}
      </Accordion>
    </div>
  );

}

export { SessionSettings as default };
