// import React from 'react';
// import {useSelector} from 'react-redux'


export function getCabinName(cabins, id) {
  // console.log(cabins, id);
  if (cabins.length > 0 && id) {
    return cabins.find(cabin => cabin.id === id).name;
  } else {
    return '';
  }
}

export function getMemberFullName(users, id) {
  if (users && id) {
    let user = users.find(user => user.id === id);
    return `${user.firstname} ${user.lastname}`
  } else {
    return '';
  }
}



export default getCabinName