
// Roletypes - map to the accoriding Bootstrap color variant
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
  auto: 1, // always enabled when rolelist are selected automatically, can be disabled manually
  always: 2, // always enabled
}

const count = {
  single: 1,
  group: 0,
  rest: -1,
  manual: -2,
  /* The latter three need a share-property with {
       share: <The share of this role relative to the player count>,
       actual: <default null | saves the actual number of players (between 1 and player count)>,
     }
   */
}

/* The actual rolelist:
  <rolename> = {
    id: <number>,
    name: <unique name>,
    type: <one of the above type definitions>,
    enabled: <one of the above status definitions>,
    count: <one of the count definitions above>,
    order: <order of action in the night (eg. viewer: 10, werwolves: 30),
    [share: see count],
    setting: [<Settingsobject: {
      type: "bool", // only bool is supported currently
      name: <Name of the setting>,
      default: <true | false>, // initial value
      set: <(oldRole, valueOfSetting) => changedRole> // a func manipulating the role
    }]
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
  position: 1,
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
/*  settings: [{
    type: "bool",
    name: "Per Chat abfragen (sonst nachtaktiv)",
    default: true,
    set: (role, state) => {
      const updatedRole = { ...role };
      updatedRole.type = state ? type.passive : type.night;
      updatedRole.order = state ? -1 : 5;
      return updatedRole;
    },
  }],
}
*/

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

// List of all rolelist
const roles = [werewolves, citizens, viewer, witch, amor, hunter, healer, thief, psycho, visitor, idiot, scapegoat]

const rolesObject = () => {
  const roleObject = {};
  for (const role of roles) {
    roleObject[role.id] = role;
  }
  return roleObject;
}

export { roles as default, rolesObject, count, type, typeDescriptions, selectionMode };

