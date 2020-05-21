import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getMemberFullName } from '../../utilities';

class Members extends Component {

  renderMembers = () => {
    return this.props.users.map(user => {
      return <tr key={user.id}>
        <td>{getMemberFullName(this.props.users, user.id)}</td>
        <td>{this.getAge(user.bday)}</td>
        <td>{user.phone}</td>
        <td>{user.email}</td>
        <td>{user.address1}</td>
        <td>{user.address2}</td>
        <td>{user.city}</td>
        <td>{user.state}</td>
        <td>{user.zip}</td>
      </tr>
    })
  }

  getAge = (bday) => {
    const today = moment(new Date());
    const birthday = moment(bday)
    const age = today.diff(birthday, 'y')
    console.log(bday);
    return age
  }


  render() {

    
    return (
      <div className="ui segment" id="admin-reservation-table">
        <div className="ui center align">Members</div>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address 1</th>
              <th>Address 2</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
            </tr>
          </thead>
          <tbody>
            {this.renderMembers()}
            {/* <tr>
            <td data-label="House Name">{cabinName}</td>
            <td data-label="Arrival">{arrival}</td>
            <td data-label="Departure">{departure}</td>
            <td data-label="Member">{firstname}</td>
            <td data-label="Email">{email}</td>
            <td data-label="Approved">{pending}</td>
          </tr> */}
          </tbody>
        </table>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.admin.users
  }
};

export default connect(mapStateToProps)(Members);