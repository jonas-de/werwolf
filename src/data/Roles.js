// Role types - map to the according Bootstrap color variant
const type = {
  bad: "danger", // e.g. werewolves
  good: "primary", // e.g. citizens
  night: "warning", // e.g. witch
  passive: "info", // e.g. amor
  other: "secondary", // e.g. thief
}

const typeDescriptions = {
  bad: "Böse",
  good: "Bewohner",
  night: "Nachtaktiv",
  passive: "Passiv",
  other: "Andere",
}

// Status of a role
const selectionMode = {
  manual: 0, // may be enabled automatically or manually
  auto: 1, // always enabled when roles are selected automatically, can be disabled manually
  always: 2, // always enabled
}

// How many players get a role; group, rest and manual are also the modes a group role can be switched between
const count = {
  single: 1, // exactly one player
  group: 0, // a share of the players, requires the role's share property (0-1)
  rest: -1, // all players not covered by other roles
  manual: -2, // a number set by the user
}

/* The actual roles:
  <rolename> = {
    id: <unique number>,
    name: <unique name>,
    type: <one of the above type definitions>,
    selection: <one of the above selection modes>,
    count: <one of the count definitions above>,
    order: <order of action in the night (e.g. viewer: 10, werewolves: 30), -1 if not active at night>,
    [share: see count],
    settings: [<Settings object: {
      type: "bool", // only bool is supported currently
      name: <Name of the setting>,
      default: <true | false>, // initial value
      set: <(oldRole, valueOfSetting) => changedRole> // a func manipulating the role
    }>],
  }
 */

const werewolves = {
  id: 0,
  name: "Werwölfe",
  type: type.bad,
  selection: selectionMode.always,
  count: count.group,
  order: 30,
  share: 0.33,
  settings: [],
}

const citizens = {
  id: 1,
  name: "Dorfbewohner",
  type: type.good,
  selection: selectionMode.auto,
  count: count.rest,
  order: -1,
  share: 0.33,
  settings: [],
}

const viewer = {
  id: 2,
  name: "Seherin",
  type: type.night,
  selection: selectionMode.manual,
  count: count.single,
  order: 10,
  settings: [],
}

const healer = {
  id: 3,
  name: "Heiler",
  type: type.night,
  selection: selectionMode.manual,
  count: count.single,
  order: 20,
  settings: [],
}

const witch = {
  id: 4,
  name: "Hexe",
  type: type.night,
  selection: selectionMode.manual,
  count: count.single,
  order: 40,
  settings: [],
}

const amor = {
  id: 5,
  name: "Amor",
  type: type.passive,
  selection: selectionMode.manual,
  count: count.single,
  order: -1,
  settings: [],
}

const hunter = {
  id: 6,
  name: "Jäger",
  type: type.passive,
  selection: selectionMode.manual,
  count: count.single,
  order: -1,
  settings: [],
}

const thief = {
  id: 7,
  name: "Dieb",
  type: type.other,
  selection: selectionMode.manual,
  count: count.single,
  order: -1,
  settings: [],
}

const psycho = {
  id: 8,
  name: "Psychiater",
  type: type.night,
  selection: selectionMode.manual,
  count: count.single,
  order: 50,
  settings: [],
}

const visitor = {
  id: 9,
  name: "Besucher",
  type: type.passive,
  selection: selectionMode.manual,
  count: count.single,
  order: -1,
  settings: [],
}

const idiot = {
  id: 10,
  name: "Dorftrottel",
  type: type.passive,
  selection: selectionMode.manual,
  count: count.single,
  order: -1,
  settings: [],
}

const scapegoat = {
  id: 11,
  name: "Sündenbock",
  type: type.passive,
  selection: selectionMode.manual,
  count: count.single,
  order: -1,
  settings: [],
}

// List of all roles
const roles = [werewolves, citizens, viewer, witch, amor, hunter, healer, thief, psycho, visitor, idiot, scapegoat]

export { roles as default, count, type, typeDescriptions, selectionMode };

