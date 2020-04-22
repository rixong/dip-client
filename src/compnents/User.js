import React, { Component } from 'react';


class User extends Component {
  
  render() {
    const {firstname,lastname,email, bday} = this.props.user;
    
    return <div className="user-div">
      <h4>{firstname} {lastname}</h4>
      <p>Email: {email}</p>
      <p>Birthday: {bday}</p>
    </div>
  }
}
export default User;