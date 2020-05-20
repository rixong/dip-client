// import dipApi from '../apis/dipApi'
import axios from 'axios';


///users reducer

export const addCurUser = () => {
  
  return async dispatch => {
    const response = await axios.get('https://fast-peak-03793.herokuapp.com/api/v1/profile', {
      headers: {
        Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
      }
    })
    // console.log('here');
    dispatch ({ type: 'ADD_CUR_USER', payload: response.data.user});
  };
};


// export const addCurUser = user => {
//   return {
//     type: 'ADD_CUR_USER',
//     payload: user
//   }
// }

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
    type: "ADD_CUR_ANNUAL_REPORT",
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

