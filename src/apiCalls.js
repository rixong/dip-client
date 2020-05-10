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

