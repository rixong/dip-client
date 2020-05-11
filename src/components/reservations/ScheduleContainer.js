import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import ScheduleWeekly from './ScheduleWeekly';
import ReservationForm from './ReservationForm';

import { getReservations, addCabins } from '../../actions/index';
import {fetchCurrentReservations} from '../../apiCalls';

class ScheduleContainer extends Component {

  componentDidMount() {
    
    /// fetch current reservations

    fetchCurrentReservations()
      .then(res => res.json())
      // .then(json => console.log(json))
      .then(json => this.props.getReservations(json))
  }

  // addNewReservation = (res) => {
  //   this.setState({ reservations: this.state.reservations.concat(res) })
  // }

  render() {
    return (
      <div className="form-window" id="schedule">
        <Fragment>
          < ScheduleWeekly />
          {/* < ReservationForm curUser={this.props.curUser} addNewReservation={this.addNewReservation} /> */}
          < ReservationForm curUser={this.props.curUser} />
        </Fragment>
      </div>
    )
  }
}

export default connect(null, { getReservations, addCabins })(ScheduleContainer);