import {count, selectionMode} from './Roles';

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

  // enable further roles (0.33 of playerCount)
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
        roleState[role.id].count = playerCount - totalCount;
        totalCount = playerCount;
        break;
      }
    }
  }
  return roleState;
}

const updateManualRoleState = (roles, roleState, playerCount) =>{
  const newRoleState = {...roleState};

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
    } else if (newRoleState[role.id].countMode === count.manual && newRoleState[role.id].enabled) {
      totalCount += newRoleState[role.id].count;
    }
  }

  for (const role of roles) {
    if (roleState[role.id].countMode === count.rest) {
      roleState[role.id].count = playerCount - totalCount;
      break;
    }
  }
return newRoleState;
}

export {initialRoleState, updateAutoRoleState, updateManualRoleState};
