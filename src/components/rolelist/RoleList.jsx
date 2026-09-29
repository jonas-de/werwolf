import {useState} from 'react';
import {Button, ButtonGroup, Form} from 'react-bootstrap';
import {count} from '../../data/Roles';
import {PeopleFill} from 'react-bootstrap-icons';
import AddRole from './AddRole';
import RoleListEntry from './RoleListEntry';
import {roleSelectionMode} from '../../App';
import {initialRoleState} from '../../data/RoleComputation';


const RoleList = ({roles, roleMode, roleState, playerCount, dispatch}) => {

  const roleDispatcher = action => {
    const toUpdate = {mode: roleMode, roleState: {...roleState}}
    switch (action.type) {
      case "ENABLED":
        toUpdate.mode = roleSelectionMode.manual;
        toUpdate.roleState[action.id] = {...roleState[action.id], enabled: action.payload};
        dispatch({type: "ROLES.STATE", payload: toUpdate});
        break;
      case "GROUP_MODE":
        if (toUpdate.roleState[action.id].countMode !== action.payload) {
          toUpdate.mode = roleSelectionMode.manual;
        }
        if (action.payload === count.rest) {
          for (const role of roles) {
            if (toUpdate.roleState[role.id].countMode === count.rest) {
              toUpdate.roleState[role.id] = {...toUpdate.roleState[role.id], countMode: count.group};
            }
          }
        }
        toUpdate.roleState[action.id] = {...toUpdate.roleState[action.id], countMode: action.payload};
        dispatch({type: "ROLES.STATE", payload: toUpdate});
        break;
      case "COUNT":
        toUpdate.mode = roleSelectionMode.manual;
        toUpdate.roleState[action.id] = {...roleState[action.id], count: action.payload};
        dispatch({type: "ROLES.STATE", payload: toUpdate});
        break;
      case "NEW_SAVE": {
        const newRole = action.payload;
        const newRoleState = {...roleState, [newRole.id]: initialRoleState([newRole])[newRole.id]};
        dispatch({type: "ROLES.UPDATE", payload: {roles: [...roles, newRole], roleState: newRoleState}});
        break;
      }
      default:
        break;
    }
  }

  const [showAdd, setShowAdd] = useState(false);

  const setRoleMode = mode => {
    dispatch({type: "ROLES.STATE", payload: {mode, roleState}});
  };


  // HTML

  const selectionModeButtons = (
    <ButtonGroup className="px-2" size="sm">
      <Button variant={roleMode === roleSelectionMode.auto ? "secondary" : "outline-secondary"} onClick={() => setRoleMode(roleSelectionMode.auto)}>Auto</Button>
      <Button variant={roleMode === roleSelectionMode.manual ? "secondary" : "outline-secondary"} onClick={() => setRoleMode(roleSelectionMode.manual)}>Manuell</Button>
    </ButtonGroup>
  );

  const heading = (
    <h2>
      <PeopleFill className="pr-1" />
      Rollen
      { selectionModeButtons }
      <Button size="sm" variant="secondary" onClick={() => setShowAdd(true)}>Neue Rolle</Button>
    </h2>
  );

  const roleEntries = roles.map(role => (
    <RoleListEntry key={role.id}
                   role={role}
                   roleState={roleState[role.id]}
                   max={playerCount}
                   dispatch={roleDispatcher} />
  ))

  return (
    <div>
      <AddRole show={showAdd} handleShow={setShowAdd} roles={roles} save={roleDispatcher} />
      { heading }
      <Form className="p-2">
        { roleEntries }
      </Form>
    </div>
  );
};

export default RoleList;
