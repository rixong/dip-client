import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';

import WeekRow from './WeekRow'
import uuid from 'react-uuid'

var moment = require('moment')

class ScheduleWeekly extends Component {
  
    state = {
      startDate: new Date('2020-05-30T00:00:00'),
      week: 1,
    }

  makeSchedule = () => {
    // Create rows for each cabin calling MakeRow() with each cabin

    let weekRowArray = [];
    for (let i = 0; i < this.props.cabins.length; i++) {
      let reservations = this.combineSingleCabinRes(i + 1)
      console.log('reservations',reservations);
      weekRowArray.push(<WeekRow key={uuid()}
        reservations={reservations} 
        cabinName={this.props.cabins[i].name} 
        />);
    }
    // console.log('weekRowArray', weekRowArray);

    return weekRowArray;
  }

  // Combine reservations for one cabin in array.
  combineSingleCabinRes = (curCabinId) => {
    let result = [];    
    if (this.props.curReservations) {
      result = this.props.curReservations.filter(res => res.cabin.cabinId === curCabinId)
      let finalArray = result.map(res => this.makeArray(res)).flat()

      // console.log('finalArray', finalArray);
      return (finalArray);
    }
  }

  //Make array from single resevation of type {dif: days from start of week}
  makeArray = (res) => {
    let arrival = new Date(`${res.arrival}T00:00:00`);
    let departure = new Date(`${res.departure}T00:00:00`);
    let arr = moment(arrival);
    let dep = moment(departure);
    // console.log(arr, dep);

    let start = moment(this.state.startDate);
    let lengthOfStay = this.numDays(dep, arr) + 1;
    let reservedDaysArray = [];
    // Take a reservation for specific cabin and make array of objects {dif: days from start of week}
    for (let i = 0; i < lengthOfStay; i++) {
      reservedDaysArray.push(
        { userName: this.fullName(res), 
          userId: res.reserver.userId, 
          dif: this.numDays(arr, start),
          pending: res.pending
        });
      arr.add(1, 'day')
    }
    // console.log('reservedDaysArray',  reservedDaysArray);
    return reservedDaysArray;
  }

  /// Helper methods

  fullName = (reservation) => {
    return `${reservation.reserver.firstName} ${reservation.reserver.lastName}`
  }

  numDays = (end, start) => {
    return end.diff(start, 'days')
  }

  switchWeek = (e) => {
    let newWeek = '';
    let direction = e.target.closest('button').name;
    direction === 'left' ? 
    newWeek = moment(this.state.startDate).subtract(this.state.week, 'week').format() :
    newWeek = moment(this.state.startDate).add(this.state.week, 'week').format();

    this.setState({startDate: newWeek})
  }


  render() {

    return (

      // <div className="form-window" id="schedule">
      <Fragment>
        <div className="form-header">Summer 2020 Master Schedule</div>
        <div className="" id="week-switch-div" >
          <button className="ui icon button" name="left" onClick={(e) => this.switchWeek(e)}>
            <i className="arrow left icon big" ></i></button>
          Week of {moment(this.state.startDate).format("MMM D")}
            - {moment(this.state.startDate).add(7, 'd').format("MMM D")}
          <button className="ui icon button" name="right" onClick={(e) => this.switchWeek(e)}>
            <i className="arrow right icon big" ></i></button>
        </div>

        <div className="ui grid" id="schedule-grid">

          <div className="row" id="show-days-row">
            <div className="two wide column"></div>
            <div className="fourteen wide column" id="date-row">
              <div className="ui eight column grid">
                <div className="two wide column">{moment(this.state.startDate).format("dd D")}</div>
                <div className="two wide column">{moment(this.state.startDate).add(1, 'd').format("dd D")}</div>
                <div className="two wide column">{moment(this.state.startDate).add(2, 'd').format("dd D")}</div>
                <div className="two wide column">{moment(this.state.startDate).add(3, 'd').format("dd D")}</div>
                <div className="two wide column">{moment(this.state.startDate).add(4, 'd').format("dd D")}</div>
                <div className="two wide column">{moment(this.state.startDate).add(5, 'd').format("dd D")}</div>
                <div className="two wide column">{moment(this.state.startDate).add(6, 'd').format("dd D")}</div>
                <div className="two wide column">{moment(this.state.startDate).add(7, 'd').format("dd D")}</div>
              </div>
            </div>
          </div>
          {this.makeSchedule()}
        </div>
        </Fragment>
      // </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    curReservations: state.reservations.curReservations,
    cabins: state.admin.cabins
  }
}

export default connect(mapStateToProps)(ScheduleWeekly);