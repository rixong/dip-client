import React, { Component } from 'react';
var moment = require('moment')

class ScheduleWeekly extends Component {

  state = {
    startDate: new Date('2020-06-01T00:00:00'),
    week: 1
  }

  renderSchedules = () => {
    
    return this.props.reservations.map(res => {
      return <p>Name: {res.reserver.firstname} Arrives: {res.arrival} Departs: {res.departure}</p>
    })
  }

  render() {
    console.log(moment(new Date()).format("MMM D") );

    return (

      <div className="form-window" id="schedule">
        <div className="form-header"><h2>Week of {moment(this.state.startDate).format("MMM D")} 
          to {moment(this.state.startDate).add(7, 'd').format("MMM D")} </h2></div>

        <div className="ui internally celled grid">

          <div className="row">
            <div className="three wide column"></div>
            <div className="one wide column"></div>
            <div className="one wide column"></div>
            <div className="one wide column"></div>
            <div className="one wide column"></div>
            <div className="one wide column"></div>
            <div className="one wide column"></div>
            <div className="one wide column"></div>
            <div className="one wide column"></div>
          </div>

        </div>
      </div>

    )
  }
}
export default ScheduleWeekly;