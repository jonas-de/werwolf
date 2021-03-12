import arrayShuffle from 'array-shuffle';

const createResults = (names, roles, roleState, sessions) => {
  const activeNames = names.filter(n => n.length);
  const activeRoles = roles.filter(role => roleState[role.id].enabled);

  const matching = match(activeNames, activeRoles, roleState);
  const createdSessions = createSessions(matching, sessions, activeRoles, roleState);

  return {roles: matching, sessions: createdSessions};
}


const match = (names, roles, roleState) => {

  const shuffledNames = arrayShuffle(names);
  const results = {};

  for (const role of roles) {
    const assignees = [];
    for (let i = 0; i < roleState[role.id].count; i++) {
      assignees.push(shuffledNames.pop());
    }
    results[role.id] = {
      role,
      assignees,
    }
  }
  return results;
}

const createSessions = (m, s, roles, roleState) => {
  const sessions = [];
  const usedRoles = [];

  for (const session of s) {
    const names = [];
    for (const [id, set] of Object.entries(session.roles)) {
      if (set && roleState[id].enabled) {
        usedRoles.push(Number(id));
        names.push(...m[id].assignees);
      }
    }
    const shuffledNames = arrayShuffle(names);
    let namesPerSession = [];
    let sc = 1;
    let i = 0;
    for (const name of shuffledNames) {
      namesPerSession.push(name);
      if (++i === session.size) {
        sessions.push({name: session.name + " " + sc, type: null, players: namesPerSession});
        namesPerSession = [];
        i = 0;
        sc++;
      }
    }
    if (namesPerSession.length > 0) {
      sessions.push({name: session.name + " " + sc, type: null, players: namesPerSession});
    }
  }
  console.log(usedRoles)
  for (const role of roles) {
    if (!usedRoles.includes(role.id)) {
      console.log(role.name);
      sessions.push({name: role.name, type: role.type, players: m[role.id].assignees});
    }
  }
  return sessions;
}

export default createResults;
