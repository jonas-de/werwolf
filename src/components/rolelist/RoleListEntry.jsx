import {count as roleGroups, selectionMode} from '../../data/Roles';
import {Col, Form, Row} from 'react-bootstrap';
import RoleBadge from '../RoleBadge';

const RoleListEntry = ({role, roleState, max, dispatch}) => {

  // API

  const setEnabled = (e) => {
    dispatch({type: "ENABLED", id: role.id, payload: e.target.checked});
  }
  const setState = (i) => {
    dispatch({type: "GROUP_MODE", id: role.id, payload: i});
  }
  const setCount = (e) => {
    dispatch({type: "COUNT", id: role.id, payload: Number(e.target.value)});
  }


  // HTML

  const groupSettings = (
    <>
      <Col xs="auto">Anzahl: {roleState.count < 0 ? 0 : roleState.count}</Col>
      <Col xs="auto">
        <Form.Check inline label={"Auto (" + Math.round(role.share * 100) + "%)"} type="radio" checked={roleState.countMode === roleGroups.group} onChange={() => setState(roleGroups.group)} />
        <Form.Check inline label="Rest" type="radio" checked={roleState.countMode === roleGroups.rest} onChange={() => setState(roleGroups.rest)} />
        <Form.Check inline label="Manuell" type="radio" checked={roleState.countMode === roleGroups.manual} onChange={() => setState(roleGroups.manual)} />
      </Col>
      { roleState.countMode === roleGroups.manual && (
        <Col  md="3">
          <Form.Range min="0" max={max} step="1" value={roleState.count} onChange={setCount}/>
        </Col>
      )}
    </>
  );

  return (
    <Row className="ps-2 py-1" style={{alignItems: "baseline"}}>
      <Col xs="auto" style={{display: "flex", alignItems: "center"}}>
        <Form.Check type="checkbox" checked={roleState.enabled >= selectionMode.auto} disabled={role.selection === selectionMode.always} onChange={setEnabled}/>
      </Col>
      <Col xs="auto">
        <h4><RoleBadge type={role.type}>{role.name}</RoleBadge></h4>
      </Col>
      { role.count <= roleGroups.group && groupSettings}
    </Row>
  );
};

export default RoleListEntry;
