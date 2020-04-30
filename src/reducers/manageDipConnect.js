import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  users: usersReducer,
  reservations: reservationsReducer,
  admin: adminReducer
})

function usersReducer (
  state= {isLoggedIn: false}, action
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
  state = [],
  action
) {

    // console.log('from users reducer', action);
  switch (action.type) {
    case 'GET_RESERVATIONS':
    return {...state, curReservations: action.payload}
      // case 'GET_CABIN_NAME':
      //   return 
    case 'ADD_RESERVATION':
      return {...state, curReservations: state.curReservations.concat(action.payload)}
    case 'ADD_REPAIR_TICKETS':
      return {...state, repairs: action.payload}

    default:
      return state
  }

}

function adminReducer (
  state = 
    {cabins: []}
  ,
  action
) {

    // console.log('from users reducer', action);
  switch (action.type) {
    case 'ADD_USERS':
      return {...state, users: action.payload}
    case 'ADD_CABINS':
      return {...state, cabins: action.payload}
    case 'ADD_REPAIR_TICKETS':
      return {...state, repairTickets: action.payload}
    case 'ADD_CUR_REPORT':
      return {...state, annualReport: action.payload}
    default:
      return state
  }

}

export default rootReducer;
