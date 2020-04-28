///users reducer

export const addCurUser = newUser => {
  return {
    type: 'ADD_CUR_USER',
    payload: newUser
  };
};

export const deleteCurUser = () => {
  return {
    type: 'DELETE_CUR_USER'
  };
};



/// reservation reducer

export const getReservations = (reservations) => {
  return {
    type: 'GET_RESERVATIONS',
    payload: reservations
  }
}

export const getCabins = (cabins) => {
  return {
    type: 'GET_CABINS',
    payload: cabins
  }
}

export const addReservation = (reservation) => {
  return {
    type: 'ADD_RESERVATION',
    payload: reservation
  }
}


