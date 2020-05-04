import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as Constants from '../../constants'

import { getReservations, approveReservation } from '../../actions/index'

class ReservationList extends Component {


  componentDidMount() {
    /// fetch current reservations
    fetch(`${Constants.baseUrl}/reservations`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      // .then(json => console.log(json))
      .then(json => this.props.getReservations(json))
    //   .then(() => {
  }

  renderReservations = () => {
    console.log(this.props.reservations);

    return this.props.reservations.map((res, idx) => {
      return (
        <tr key={idx}>
          <td data-label="House Name">{res.cabin.cabinName}</td>
          <td data-label="Arrival">{res.arrival}</td>
          <td data-label="Departure">{res.departure}</td>
          <td data-label="Member">{res.reserver.firstName}</td>
          <td data-label="Email">
            <a href="mailto:rixong@gmail.com">{res.reserver.email}</a>
          </td>
          <td data-label="Approved"
            onClick={() => this.handleClick(res.id)}>
            {res.pending ?
              <i className="large red x icon"></i> :
              <i className="large green checkmark icon"></i>
            }
          </td>
        </tr>
      )
    })
  }

  //// Approve a reservation
  handleClick = (resId) => {
    console.log('click to approve.', resId);
    fetch(`${Constants.baseUrl}/reservations/${resId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ pending: false })
    })
      .then(res => res.json())
      .then(json => this.props.approveReservation(resId))
  }

  render() {

    return (
      <div className="ui segment" id="admin-reservation-table">
        <div className="ui center align">Current Reservations</div>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>House Name</th>
              <th>Arrival</th>
              <th>Departure</th>
              <th>Member</th>
              <th>Email</th>
              <th>Approved</th>
            </tr>
          </thead>
          <tbody>
            {this.renderReservations()}
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
    reservations: state.admin.reservations
  }
};
export default connect(mapStateToProps, { getReservations, approveReservation })(ReservationList);