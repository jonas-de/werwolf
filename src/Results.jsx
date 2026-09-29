import {useState} from 'react';
import {Button, ButtonGroup, Table} from 'react-bootstrap';
import RoleBadge from './components/RoleBadge';
import {Dice6Fill} from 'react-bootstrap-icons';


const Results = ({results}) => {

  // API

  const resultMode = {
    session: 0,
    role: 1,
    name: 2,
  }

  const modeHeaders = {
    0: ["Session", "Spieler"],
    1: ["Rolle", "Spieler"],
    2: ["Spieler", "Rolle"],
  }
  const [mode, setMode] = useState(resultMode.role);

  const buttons = (
    <ButtonGroup size="sm" className="ps-2">
      <Button variant={mode === resultMode.role ? "secondary" : "outline-secondary"} onClick={() => setMode(resultMode.role)}>Rollen</Button>
      <Button variant={mode === resultMode.name ? "secondary" : "outline-secondary"} onClick={() => setMode(resultMode.name)}>Spieler</Button>
      <Button variant={mode === resultMode.session ? "secondary" : "outline-secondary"} onClick={() => setMode(resultMode.session)}>Sessions</Button>

    </ButtonGroup>
  );

  const heading = (
    <h2>
      <Dice6Fill className="pe-1"/>
      Ergebnis
      { buttons }
    </h2>
  );

  const sessionName = (session) => {
    if (session.type === null) {
      return (<td>{ session.name }</td>);
    } else {
      return (
        <td>
          <h5><RoleBadge type={session.type}>{ session.name }</RoleBadge></h5>
        </td>
      )
    }
  };

  const sessions = results.sessions.map(session => (
    <tr key={session.name}>
      { sessionName(session) }
      <td>{ session.players.join(", ") }</td>
    </tr>
  ));

  const roles = Object.values(results.roles).map(match => (
    <tr key={match.role.id}>
      <td>
        <h5><RoleBadge type={match.role.type}>{match.role.name}</RoleBadge></h5>
      </td>
      <td>
        {match.assignees.join(", ")}
      </td>
    </tr>
  ));

  const rolesPerName = () => {
    const result = {};
    Object.values(results.roles).forEach(match => {
      match.assignees.forEach(name => {
        result[name] = match.role;
      });
    });
    return result;
  }

  const nameList = Object.entries(rolesPerName()).sort(([a], [b]) => a.localeCompare(b))
    .map(([name, role]) => (
      <tr key={name}>
        <td>
          {name}
        </td>
        <td>
          <h5><RoleBadge type={role.type}>{ role.name }</RoleBadge></h5>
        </td>
      </tr>

  ));

  const list = () => {
    switch (mode) {
      case resultMode.role:
        return roles;
      case resultMode.session:
        return sessions;
      case resultMode.name:
        return nameList;
      default:
        return [];
    }
  }


  return (
    <div>
      { heading }
      <Table>
        <thead>
        <tr>
          <th>{modeHeaders[mode][0]}</th>
          <th>{modeHeaders[mode][1]}</th>
        </tr>
        </thead>
        <tbody>
        { list() }
        </tbody>
      </Table>
    </div>
  );
}

export default Results;
