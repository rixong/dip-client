// import React from 'react';
// import {useSelector} from 'react-redux'


export function getCabinName (cabins, id) {
  // console.log(cabins, id);
  return cabins.find(cabin => cabin.id === id).name;
}

export function getMemberFullName (users, id) {
  let user = users.find(user => user.id === id);
  return `${user.firstname} ${user.lastname}`
}



export default getCabinName