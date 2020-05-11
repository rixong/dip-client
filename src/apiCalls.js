export const baseUrl = "http://localhost:3000/api/v1";

export function fetchCurrentAnnualReport() {
  return fetch(`${baseUrl}/annual_report/current`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
    }
  })
}

export function fetchCurrentReservations() {
  return fetch(`${baseUrl}/reservations`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
    }
  })
}

export function fetchCurrentRepairs() {
  return fetch(`${baseUrl}/repairs`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
    }
  })
}

export function fetchUsers() {
  return fetch(`${baseUrl}/users`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
    }
  })
}

export function fetchCabins() {
  return fetch(`${baseUrl}/cabins`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
    }
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
  console.log('from api',id);
  
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