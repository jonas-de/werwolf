import {arrayToShuffled} from 'array-shuffle';

const createResults = (names, roles, roleState, sessions) => {
  const activeNames = names.filter(n => n.length);
  const activeRoles = roles.filter(role => roleState[role.id].enabled);

  const {matching, unassigned} = match(activeNames, activeRoles, roleState);
  const createdSessions = createSessions(matching, sessions, activeRoles, roleState);

  return {roles: matching, sessions: createdSessions, unassigned};
}


const match = (names, roles, roleState) => {

  const shuffledNames = arrayToShuffled(names);
  const matching = {};

  for (const role of roles) {
    const assignees = [];
    for (let i = 0; i < roleState[role.id].count && shuffledNames.length > 0; i++) {
      assignees.push(shuffledNames.pop());
    }
    matching[role.id] = {
      role,
      assignees,
    }
  }
  // players left over when the role counts do not cover everyone
  return {matching, unassigned: shuffledNames};
}

const createSessions = (m, s, roles, roleState) => {
  const sessions = [];
  const usedRoles = new Set();

  for (const session of s) {
    const names = [];
    for (const [id, set] of Object.entries(session.roles)) {
      const roleId = Number(id);
      // a role belongs to the first session that includes it, so no player ends up in two sessions
      if (set && roleState[roleId].enabled && !usedRoles.has(roleId)) {
        usedRoles.add(roleId);
        names.push(...m[roleId].assignees);
      }
    }
    const shuffledNames = arrayToShuffled(names);
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
  for (const role of roles) {
    if (!usedRoles.has(role.id)) {
      sessions.push({name: role.name, type: role.type, players: m[role.id].assignees});
    }
  }
  return sessions;
}

export default createResults;
