import axios from 'axios'

export default axios.create({
  baseURL: "https://fast-peak-03793.herokuapp.com/api/v1",
  // baseURL: "http://localhost:3000/api/v1",
  // headers: {
  //   Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
  // }
});