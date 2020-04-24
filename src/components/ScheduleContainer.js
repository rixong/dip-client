import React, { Component } from 'react';
import ScheduleWeekly from './ScheduleWeekly';

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
    // .then(json => console.log(json))
    .then(json => this.setState({reservations: json}))
  }

  render() {
    return <div className="form-window" id="schedule">
      <ScheduleWeekly reservations={this.state.reservations}/>
      </div>
  }
}
export default ScheduleContainer;