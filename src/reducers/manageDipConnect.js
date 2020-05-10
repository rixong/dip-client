import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  curUser: curUserReducer,
  // reservations: reservationsReducer,
  admin: adminReducer
})

function curUserReducer(
  state = {
    isLoggedIn: false,
    user: {
      id: '',
      email: '',
      firstname: '',
      lastname: '',
      bday: '',
      admin: true,
      photo_url: ''
    }
  }, action
) {
  // console.log('from users reducer', action);
  switch (action.type) {
    case 'ADD_CUR_USER':
      return { ...state, user: action.payload, isLoggedIn: true }
    case 'EDIT_CUR_USER':
      return { ...state, user: action.payload }
    case 'DELETE_CUR_USER':
      return { ...state, user: '', isLoggedIn: false }
    default:
      return state
  }
}

function adminReducer(
  state =
    {
      users: [],
      cabins: [],
      reservations: [],
      repairs: [],
      annualReport: {
        year: ''
      }
    }
  ,
  action
) {

  console.log('from reducer', action);
  switch (action.type) {
    case 'ADD_USERS':
      return { ...state, users: action.payload }
    case 'ADD_CABINS':
      return { ...state, cabins: action.payload }
    case 'ADD_REPAIR_TICKETS':
      return { ...state, repairs: action.payload }
    case 'ADD_REPAIR_TICKET':
      return { ...state, repairs: state.repairs.concat(action.payload) }
    case 'ADD_CUR_ANNUAL_REPORT':
      return action.payload

    case 'GET_RESERVATIONS':
      let newAnnualReport = { ...state.annualReport, reservations: action.payload }
      return { ...state, annualReport: newAnnualReport }
    case 'ADD_RESERVATION':
      newAnnualReport = { ...state.annualReport, reservations: action.payload }
      return { ...state, reservations: state.reservations.concat(action.payload) }
    case 'APPROVE_RESERVATION':
      let idx = state.reservations.findIndex(res => res.id === action.payload);
      let newRes = Object.assign({}, state.reservations[idx]);
      newRes.pending = false;
      let newReservations =
        [...state.annualReport.reservations.slice(0, idx).concat(newRes).concat(...state.annualReport.reservations.slice(idx + 1))];
      newAnnualReport = Object.assign({}, ...state.annualReport, { reservations: newReservations })
      return { ...state, newAnnualReport: newAnnualReport };
    case 'DELETE_ALL':
      return {};
    default:
      return state
  }

}

export default rootReducer;
