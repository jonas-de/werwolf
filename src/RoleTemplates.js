
const werewolves = {
  name: "Werwölfe",
  variant: "danger",
  always: true,
  group: true,
  count: -1,
  defaultShare: 0.33,
  min: 1,
  position: 3,
}

const citizens = {
  name: "Dorfbewohner",
  variant: "primary",
  always: true,
  group: true,
  count: -1,
  defaultShare: 0.33,
  min: 0,
  rest: true,
}

const viewer = {
  name: "Seherin",
  variant: "warning",
  enabled: false,
  position: 1,
  count: 1
}

const witch = {
  name: "Hexe",
  variant: "warning",
  enabled: false,
  position: 4,
  count: 1
}

const amor = {
  name: "Amor",
  variant: "info",
  enabled: false,
  count: 1
}

const thief = {
  name: "Dieb",
  variant: "secondary",
  count: 1,
  enabled: false,
}

const psycho = {
  name: "Psychiater",
  variant: "warning",
  position: 5,
  count: 1,
  enabled: false,
}

const healer = {
  name: "Heiler",
  variant: "warning",
  position: 2,
  count: 1,
  enabled: false,
}

const hunter = {
  name: "Jäger",
  variant: "info",
  count: 1,
  enabled: false,
}

const visitor = {
  name: "Besucher",
  variant: "info",
  count: 1,
  enabled: false,
}

const idiot = {
  name: "Dorftrottel",
  variant: "info",
  count: 1,
  enabled: false,
}

const scapegoat = {
  name: "Sündenbock",
  variant: "info",
  count: 1,
  enabled: false,
}

const roles = [werewolves, citizens, viewer, witch, amor, thief, psycho, hunter, healer, visitor, idiot, scapegoat]

export default roles;
