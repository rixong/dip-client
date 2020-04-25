import React, { Component } from 'react';
import WeekRow from './WeekRow'
var moment = require('moment')

class ScheduleWeekly extends Component {
  
    state = {
      cabins: [],
      startDate: new Date('2020-05-30T00:00:00'),
      week: 1,
      curColor: 0
    }

  componentDidMount() {
      fetch('http://localhost:3000/api/v1/cabins', {
        method: 'GET',
        headers: {
          Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
        }
      })
      .then(res => res.json())
      // .then(json => console.log(json))
      .then(json => this.setState({cabins: json}))
  }
  
  
  cycleColor = (num) => {
    this.setState({curColor: this.state.curColor + num})
  }


  makeSchedule = () => {
    // Create rows for each cabin calling MakeRow() with each cabin

    let weekRowArray = [];
    for (let i = 0; i < this.state.cabins.length; i++) {
      let reservations = this.combineSingleCabinRes(i + 1)
      // console.log('reservations',reservations);
      weekRowArray.push(<WeekRow key={i} 
        reservations={reservations} 
        cabinName={this.state.cabins[1].name} 
        cycleColor={this.cycleColor}/>);
    }
    // console.log('weekRowArray', weekRowArray);

    return weekRowArray;
  }

  // Combine reservations for one cabin in array.
  combineSingleCabinRes = (curCabinId) => {
    let result = [];
    if (this.props.reservations.length > 0) {
      result = this.props.reservations.filter(res => res.cabin.cabinId === curCabinId)
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

  /// Helper Method
  numDays = (end, start) => {
    return end.diff(start, 'days')
  }


  render() {

    return (

      <div className="form-window" id="schedule">
        <div className="form-header"><h2>Week of {moment(this.state.startDate).format("MMM D")}
          to {moment(this.state.startDate).add(7, 'd').format("MMM D")} </h2></div>

        <div className="ui internally celled grid" id="schedule-grid">

          <div className="row">
            <div className="two wide column"></div>
            <div className="fourteen wide column">
              <div className="ui internally celled eight column grid">
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
      </div>

    )
  }
}
export default ScheduleWeekly;