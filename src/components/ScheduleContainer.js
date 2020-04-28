import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import ScheduleWeekly from './ScheduleWeekly';
import ReservationForm from './ReservationForm';

import { getReservations, getCabins } from '../actions/index'

class ScheduleContainer extends Component {

  componentDidMount() {
    
    /// fetch current reservations
    fetch('http://localhost:3000/api/v1/reservations', {
      method: 'GET',
      headers: {
        Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      // .then(json => console.log(json))
      .then(json => this.props.getReservations(json))
      .then(() => {

    /// fetch cabin info
        fetch('http://localhost:3000/api/v1/cabins', {
          method: 'GET',
          headers: {
            Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
          }
        })
          .then(res => res.json())
          // .then(json => console.log(json))
          .then(json => this.props.getCabins(json))
      })
  }


  addNewReservation = (res) => {
    this.setState({ reservations: this.state.reservations.concat(res) })
  }

  render() {
    return (
      <div className="form-window" id="schedule">
        <Fragment>
          < ScheduleWeekly />
          < ReservationForm curUser={this.props.curUser} addNewReservation={this.addNewReservation} />
        </Fragment>
      </div>
    )
  }
}
export default connect(null, { getReservations, getCabins })(ScheduleContainer);