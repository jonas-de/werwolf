import React, {useState} from 'react';
import {Badge, Button, ButtonGroup, Table} from 'react-bootstrap';
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

  if (results === null) {
    return (<></>);
  }

  const buttons = (
    <ButtonGroup size="sm" className="pl-2">
      <Button variant={mode === resultMode.role ? "secondary" : "outline-secondary"} onClick={_ => setMode(resultMode.role)}>Rollen</Button>
      <Button variant={mode === resultMode.name ? "secondary" : "outline-secondary"} onClick={_ => setMode(resultMode.name)}>Spieler</Button>
      <Button variant={mode === resultMode.session ? "secondary" : "outline-secondary"} onClick={_ => setMode(resultMode.session)}>Sessions</Button>

    </ButtonGroup>
  );

  const heading = (
    <h2>
      <Dice6Fill className="pr-1"/>
      Ergebnis
      { buttons }
    </h2>
  );

  const sessionName = (session) => {
    if (session.type === null) {
      return (<th>{ session.name }</th>);
    } else {
      return (
        <th>
          <h5><Badge variant={session.type}>{ session.name }</Badge></h5>
        </th>
      )
    }
  };

  const sessions = results.sessions.map(session => (
    <tr>
      { sessionName(session) }
      <th>{ session.players.join(", ") }</th>
    </tr>
  ));

  const roles = Object.values(results.roles).map(match => (
    <tr>
      <th>
        <h5><Badge variant={match.role.type}>{match.role.name}</Badge></h5>
      </th>
      <th>
        {match.assignees.join(", ")}
      </th>
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

  const nameList = Object.entries(rolesPerName()).sort(([a,_], [b,__]) => a.localeCompare(b))
    .map(([name, role]) => (
      <tr>
        <th>
          {name}
        </th>
        <th>
          <h5><Badge variant={role.type}>{ role.name }</Badge></h5>
        </th>
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
