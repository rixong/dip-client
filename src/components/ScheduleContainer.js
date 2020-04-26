import React, { Component, Fragment } from 'react';
import ScheduleWeekly from './ScheduleWeekly';
import ReservationForm from './ReservationForm';

class ScheduleContainer extends Component {

  state = {
    reservations: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/reservations', {
      method: 'GET',
      headers: {
        Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      // .then(json => console.log(json[0].id))
      .then(json => this.setState({ reservations: json }))
  }

  addNewReservation = (res) => {
    this.setState({reservations: this.state.reservations.concat(res)})
  }

  render() {
    return (
      <div className="form-window" id="schedule">
        <Fragment>
          < ScheduleWeekly reservations={this.state.reservations} />
          < ReservationForm curUser={this.props.curUser} addNewReservation={this.addNewReservation}/>
        </Fragment>
      </div>
    )
  }
}
export default ScheduleContainer;