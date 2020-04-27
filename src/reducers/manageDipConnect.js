import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  users: usersReducer,
  reservations: resevationsReducer
})

function usersReducer (
  state= [], action
    ) {
      // console.log('from reducer', action);
  switch (action.type) {
    case 'ADD_CUR_USER':
      return {...state, curUser: action.payload.user, isLoggedIn: true }
    case 'DELETE_CUR_USER':
      return {...state, curUser: '', isLoggedIn: false }

    default:
      return state
  }
}


function resevationsReducer (
  state = [],
  action
) {

  console.log(action);
  
  switch (action.type) {
    case 'GET_RESERVATIONS':
      return {curReservations: action.payload}
    default:
      return state
  }

}

export default rootReducer;
