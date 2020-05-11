
export function getCabinName(cabins, id) {
  // console.log(cabins, id);
  if (cabins  && id) {
    return cabins.find(cabin => cabin.id === parseInt(id, 10)).name;
  } else {
    return '';
  }
}

export function findCabin(cabins, id) {
  // console.log(cabins, id);
  if (cabins.length > 0 && id) {
    return cabins.find(cabin => cabin.id === parseInt(id, 10));
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

export function getMember(users, id) {
  if (users && id) {
    return users.find(user => user.id === id);
  } else {
    return '';
  }
}

