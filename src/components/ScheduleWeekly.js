import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';

import WeekRow from './WeekRow'
import uuid from 'react-uuid'

var moment = require('moment')

// const cycleColor = (state, props) => {  return {curColor: state.curColor + 1}}

class ScheduleWeekly extends Component {
  
    state = {
      startDate: new Date('2020-05-30T00:00:00'),
      week: 1,
      curColor: 0
    }
  
  // nextWeek = () => {
  //   // console.log(moment(this.state.startDate).add(1, 'week').format());
  //   let nextWeek = moment(this.state.startDate).add(this.state.week, 'week').format()
  //   this.setState({startDate: nextWeek})
  // }
  
  // previousWeek = () => {
  //   // console.log(moment(this.state.startDate).add(1, 'week').format());
  //   let nextWeek = moment(this.state.startDate).subtract(this.state.week, 'week').format()
  //   this.setState({startDate: nextWeek})
  // }
  
  switchWeek = (choice) => {
    console.log(choice);
    
    let newWeek = moment(this.state.startDate).add(this.state.week, 'week').format()
    this.setState({startDate: newWeek})

  }

  makeSchedule = () => {
    // Create rows for each cabin calling MakeRow() with each cabin

    let weekRowArray = [];
    // console.log('cabins',this.props.cabins);
    for (let i = 0; i < this.props.cabins.length; i++) {
      let reservations = this.combineSingleCabinRes(i + 1)
      weekRowArray.push(<WeekRow key={uuid()} 
        reservations={reservations} 
        cabinName={this.props.cabins[i].name} 
        cycleColor={this.handleCycleColor}/>);
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
      reservedDaysArray.push({ user: res.reserver.firstname, dif: this.numDays(arr, start) });
      arr.add(1, 'day')
    }
    // console.log('reservedDaysArray',  reservedDaysArray);
    return reservedDaysArray;
  }

  /// Helper method
  numDays = (end, start) => {
    return end.diff(start, 'days')
  }


  render() {

    return (

      // <div className="form-window" id="schedule">
      <Fragment>
        <div className="form-header">Summer 2020 Master Schedule</div>
        <div className="" id="week-switch-div" >
          <button className="ui icon button huge"><i className="arrow left icon big" 
            onClick={() => this.switchWeek()}></i></button>
          Week of {moment(this.state.startDate).format("MMM D")}
            - {moment(this.state.startDate).add(7, 'd').format("MMM D")}
          <button className="ui icon button huge"><i className="arrow right icon big" 
            onClick={() => this.switchWeek()}></i></button>
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
    cabins: state.reservations.cabins
  }
}

export default connect(mapStateToProps)(ScheduleWeekly);