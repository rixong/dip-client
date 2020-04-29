import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  users: usersReducer,
  reservations: reservationsReducer,
  repairs: repairsReducer
})

function usersReducer (
  state= [], action
    ) {
      // console.log('from users reducer', action);
  switch (action.type) {
    case 'ADD_CUR_USER':
      return {...state, curUser: action.payload.user, isLoggedIn: true }
    case 'DELETE_CUR_USER':
      return {...state, curUser: '', isLoggedIn: false }

    default:
      return state
  }
}

function reservationsReducer (
  state = {cabins: []},
  action
) {

    // console.log('from users reducer', action);
  switch (action.type) {
    case 'GET_RESERVATIONS':
    return {...state, curReservations: action.payload}
    case 'GET_CABINS':
      return {...state, cabins: action.payload}
    case 'ADD_RESERVATION':
      return {...state, curReservations: state.curReservations.concat(action.payload)}
    case 'ADD_REPAIR_TICKETS':
      return {...state, repairs: action.payload}

    default:
      return state
  }

}


function repairsReducer (
  state = [],
  action
) {

    // console.log('from users reducer', action);
  switch (action.type) {
    case 'ADD_REPAIR_TICKETS':
      return {...state, repairTickets: action.payload}
    default:
      return state
  }

}

export default rootReducer;
