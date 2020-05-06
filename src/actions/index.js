///users reducer

export const addCurUser = newUser => {
  return {
    type: 'ADD_CUR_USER',
    payload: newUser
  };
};

export const editCurUser = user => {
  return {
    type: 'EDIT_CUR_USER',
    payload: user
  }
}

export const deleteCurUser = () => {
  return {
    type: 'DELETE_CUR_USER'
  };
};


/// RESERVATION ACTIONS

export const getReservations = (reservations) => {
  return {
    type: 'GET_RESERVATIONS',
    payload: reservations
  }
}

export const addReservation = (reservation) => {
  return {
    type: 'ADD_RESERVATION',
    payload: reservation
  }
}

export const approveReservation = (id) => {
  return {
    type: 'APPROVE_RESERVATION',
    payload: id
  }
}


// ADMIN ACTIONS
export const deleteAll = () => {
  return {
    type: 'DELETE_ALL'
  }
}

export const addRepairTickets = (repairs) => {
  return {
    type: 'ADD_REPAIR_TICKETS',
    payload: repairs
  }
}

export const addCurrentAnnualReport = (report) => {
  return {
    type: "ADD_CUR_REPORT",
    payload: report
  }
}

export const addUsers = (users) => {
  return {
    type: "ADD_USERS",
    payload: users
  }
}

export const addCabins = (cabins) => {
  return {
    type: 'ADD_CABINS',
    payload: cabins
  }
}

