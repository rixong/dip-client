
// import dipApi from './api/dipApi';

export const baseUrl = "https://fast-peak-03793.herokuapp.com/api/v1";
// export const baseUrl = "http://localhost:3000/api/v1";

export function postLogin(loginInfo) {
  return fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      user: {
        email: loginInfo.email,
        password: loginInfo.password,
      }
    })
  })
}

export function postNewUser(user) {
  return fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      user: {
        email: user.email,
        password: user.password,
        password_confirmation: user.password_confirmation,
        firstname: user.firstname,
        lastname: user.lastname,
        bday: user.bday
      }
    })
  })
}

export function postAddReservation(body) {

  return fetch(`${baseUrl}/reservations`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer: ${localStorage.getItem('accessToken')}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      arrival: body.arrival,
      departure: body.departure,
      cabin_id: body.cabin_id,
      // pending: true,
      user_id: body.user_id,
      // annual_report_id: body.annual_report_id
    })
  })
}

export function postApproveReservation(resId) {
  return fetch(`${baseUrl}/reservations/${resId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify({ pending: false })
  })
}

export function postDeleteReservation(id) {

  return fetch(`${baseUrl}/reservations/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
    }
  })
}


export function updateRepairTicket(id, data) {
  return fetch(`${baseUrl}/repairs/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify({
      followup: data.followup,
      pending: !data.status
    })
  })
}

export function addRepairTicket(body) {
  return fetch(`${baseUrl}/repairs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify(body)
  })
}

export function updateUser(body) {
  return fetch(`${baseUrl}/users/${body.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify({
      user: {
        email: body.email,
        firstname: body.firstname,
        lastname: body.lastname,
        bday: body.bday,
        photo_url: body.photo_url
      }
    })
  })


}