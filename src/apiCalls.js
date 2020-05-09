export const baseUrl = "http://localhost:3000/api/v1";

export function fetchCurrentAnnualReport() {

  return fetch(`${baseUrl}/annual_report/current`, {
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