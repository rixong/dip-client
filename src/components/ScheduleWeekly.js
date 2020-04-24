import React, { Component } from 'react';

class ScheduleWeekly extends Component {


  renderSchedules = () => {
    return this.props.reservations.map(res => {
    return <p>Name: {res.reserver.firstname} Arrives: {res.arrival} Departs: {res.departure}</p>
    })
  }

  render() {
  return (
    
      <div>{this.renderSchedules()}</div>
  )
  }
}
export default ScheduleWeekly;