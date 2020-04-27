export const addCurUser = newUser => {
  return {
    type: 'ADD_CUR_USER',
    payload: newUser
  };
};

export const deleteCurUser = newUser => {
  return {
    type: 'DELETE_CUR_USER'
  };
};
