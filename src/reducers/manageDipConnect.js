import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  users: usersReducer,
  // reservations: reservationsReducers
})

function usersReducer (
  state= []
  // state = {
  //   curUser: {
  //     isLoggedIn: false
  //   }}
    , action
    ) {
      console.log('from reducer', action);
  switch (action.type) {
    case 'ADD_CUR_USER':
      return {...state, curUser: {user: action.payload, isLoggedIn: true }}

    default:
      return state
  }
}

export default rootReducer;
