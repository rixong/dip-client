import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment';

import  {getCabinName, getMemberFullName, getMember } from '../../utilities'
import {postApproveReservation, postDeleteReservation, fetchCurrentReservations} from '../../apiCalls'
import { getReservations, approveReservation } from '../../actions/index'

class ReservationList extends Component {


  componentDidMount() {
    // fetchCurrentReservations()
  }

  updateReservations = () => {
    fetchCurrentReservations()
    .then(res => res.json())
    .then(json => this.props.getReservations(json))
  }

  ////  Reservation approval
  handleApproval = (resId) => {
    console.log('click to approve.', resId);
    postApproveReservation(resId)
      .then(res => res.json())
      .then(json => this.props.approveReservation(resId))
  }

  ////  Reservation Delete
  handleDelete = (resId) => {
    console.log('click to delete.', resId);
    postDeleteReservation(resId)
      .then(res => this.updateReservations())
    // .then(json => console.log(json));
  }

  formatDate = (date) => {
    return moment(`${date}T00:00:00`).format('ddd, MMM D');
  }

  renderReservations = () => {
    // console.log(this.props.reservations);

    return this.props.reservations.map((res, idx) => {
      const user = getMember(this.props.users, res.userId)
      return (
        <tr key={idx}>
          <td data-label="House Name">{getCabinName(this.props.cabins, res.cabinId)}</td>
          <td data-label="Arrival">{this.formatDate(res.arrival)}</td>
          <td data-label="Departure">{this.formatDate(res.departure)}</td>
          <td data-label="Member">{getMemberFullName(this.props.users, user.id)}</td>
          <td data-label="Email">
            <a href="mailto:rixong@gmail.com">{user.email}</a>
          </td>
          <td data-label="Approved">
            <div className="ui icon button">
              {res.pending ?
                <i className="large black x icon" onClick={() => this.handleApproval(res.id)}></i>
                :
                <i className="large green checkmark icon"></i>
              }
            </div>
          </td>
          <td><button className="ui button" id="delete-button" onClick={() => this.handleDelete(res.id)}>Delete</button></td>
        </tr>
      )
    })
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
              <th>Delete</th>
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
    reservations: state.admin.reservations,
    users: state.admin.users,
    cabins: state.admin.cabins
  }
};
export default connect(mapStateToProps, { getReservations, approveReservation })(ReservationList);