import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  users: usersReducer,
  // reservations: reservationsReducers
})

function usersReducer (
  state= []
    , action
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

export default rootReducer;
