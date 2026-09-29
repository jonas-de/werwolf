import {count, selectionMode} from './Roles';

// whether the role selection is computed from the player count or set by the user
const roleMode = {
  auto: 0,
  manual: 1,
}

const initialRoleState = roles => {
  const roleState = {};
  for (const role of roles) {
    roleState[role.id] = {
      countMode: role.count,
      count: role.count,
      enabled: role.selection === selectionMode.always || role.selection === selectionMode.auto,
    }
  }
  return roleState;
}

// number of players covered by the enabled roles
const assignedCount = (roles, roleState) =>
  roles.filter(role => roleState[role.id].enabled)
    .reduce((sum, role) => sum + Math.max(0, roleState[role.id].count), 0);

const updateAutoRoleState = (roles, playerCount) => {
  const roleState = initialRoleState(roles);
  let totalCount = 0;

  // compute count of auto enabled roles
  for (const role of roles) {

    // compute count of all groups
    if (role.count === count.group) {
      roleState[role.id].count = Math.round(role.share * playerCount);
    }

    // enable all always or auto enabled roles and count their members
    if (roleState[role.id].enabled && roleState[role.id].count > 0) {
      totalCount += roleState[role.id].count;
    }
  }

  // enable further single roles: about sqrt(playerCount / 10) / 2.5 of the players, in list order
  let enabledIndex = 0;
  const extraShare = Math.sqrt(playerCount) / (2.5 * Math.sqrt(10));
  const enabledMax = Math.round(extraShare * playerCount);

  for (const role of roles) {
    if (role.selection === selectionMode.manual && (role.count === count.single || role.count === count.group)) {
      if (enabledIndex < enabledMax && totalCount < playerCount) {
        enabledIndex++;
        roleState[role.id].enabled = true;
        totalCount += roleState[role.id].count;
      } else {
        break;
      }
    }
  }

  // set count of rest group if possible
  if (totalCount < playerCount) {
    for (const role of roles) {
      if (role.count === count.rest) {
        roleState[role.id].enabled = true;
        roleState[role.id].count = Math.max(0, playerCount - totalCount);
        totalCount = playerCount;
        break;
      }
    }
  }
  return roleState;
}

const updateManualRoleState = (roles, roleState, playerCount) => {
  const newRoleState = {};
  for (const role of roles) {
    newRoleState[role.id] = {...roleState[role.id]};
  }

  let totalCount = 0;
  for (const role of roles) {
    if (newRoleState[role.id].countMode === count.group) {
      const newCount = Math.round(role.share * playerCount);
      newRoleState[role.id].count = newCount;
      if (newRoleState[role.id].enabled) {
        totalCount += newCount;
      }
    } else if (newRoleState[role.id].countMode === count.single) {
      newRoleState[role.id].count = 1;
      if (newRoleState[role.id].enabled) {
        totalCount++;
      }
    } else if (newRoleState[role.id].countMode === count.manual) {
      // keep manual counts valid when players are removed or a rest role (count -1) is switched to manual
      const clampedCount = Math.min(Math.max(newRoleState[role.id].count, 0), playerCount);
      newRoleState[role.id].count = clampedCount;
      if (newRoleState[role.id].enabled) {
        totalCount += clampedCount;
      }
    }
  }

  for (const role of roles) {
    if (newRoleState[role.id].countMode === count.rest) {
      newRoleState[role.id].count = Math.max(0, playerCount - totalCount);
      break;
    }
  }
  return newRoleState;
}

export {roleMode, initialRoleState, assignedCount, updateAutoRoleState, updateManualRoleState};
