import dipApi from '../api/dipApi';  // axios instance

export const fetchCurUser = () => {
  return async dispatch => {
    const response = await dipApi.get('/profile', {
      headers: {
        Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
      }
    })

    dispatch({ type: 'ADD_CUR_USER', payload: response.data.user });
  };
};

export const addCurUser = user => {
  return {
    type: 'ADD_CUR_USER',
    payload: user
  }
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


export const addReservations = () => async dispatch => {
  const response = await dipApi.get('/reservations', {
    headers: {
      Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
    }
  })

  dispatch({ type: 'ADD_RESERVATIONS', payload: response.data })
};

export const addRepairTickets = () => async dispatch => {
  const response = await dipApi.get('/repairs', {
    headers: {
      Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
    }
  })

  dispatch({ type: 'ADD_REPAIR_TICKETS', payload: response.data })
}

export const addCurrentAnnualReport = () => async dispatch => {
  const response = await dipApi.get('/annual_report/current', {
    headers: {
      Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
    }
  })

  dispatch({ type: "ADD_CUR_ANNUAL_REPORT", payload: response.data.report })
};

export const addUsers = () => async dispatch => {
  const response = await dipApi.get('/users', {
    headers: {
      Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
    }
  })

  dispatch({ type: "ADD_USERS", payload: response.data })
};

export const addCabins = () => async dispatch => {
  const response = await dipApi.get('/cabins', {
    headers: {
      Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
    }
  })

  dispatch({ type: 'ADD_CABINS', payload: response.data })
};


