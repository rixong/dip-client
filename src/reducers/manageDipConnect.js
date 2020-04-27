import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  users: usersReducer,
  // reservations: reservationsReducers
})

function usersReducer (
  state = {
    curUser: {}}
  , action
  ) {

  switch (action.type) {
    case 'ADD_CUR_USER':
      return {...state, curUser: {user: action.payload, isLoggedIn: true }}

    default:
      return state
  }
}

export default rootReducer;
