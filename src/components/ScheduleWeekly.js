import React, { Component } from 'react';
import DaySquare from './DaySquare';
var moment = require('moment')

const colors = ['teal', 'blue', 'green', 'violet', 'olive'];
const numCabins = 7;

class ScheduleWeekly extends Component {

  state = {
    startDate: new Date('2020-05-30T00:00:00'),
    week: 1,
    curColor: 0
  }

  makeSchedule = () => {
    // Create rows for each cabin calling MakeRow() with each cabin

    let result = [];
    for (let i = 0; i <= numCabins; i++) {
      console.log('here');
      
       <div className="row cabin-head" id="cabin-1">
        <div className="two wide column">Big House</div>
        <div className="fourteen wide column">
          <div className="ui internally celled eight column grid">
            {this.makeRow(i)}
          </div>
        </div>
      </div>

    }
  }




  makeRow = (cabinId) => {
    let array = this.combineSingleCabinRes(cabinId);
    // console.log(array);

    let squares = [];
    let curDaysRes = undefined;
    let curColor = this.state.curColor;
    let curUser = undefined;

    for (let i = 0; i < 8; i++) {
      if (array) {
        curDaysRes = array.find(curDay => curDay.dif === i)
      }
      if (curDaysRes) {
        if (!curUser || curDaysRes.user !== curUser) {
          curColor += 1;
          curUser = curDaysRes.user
          console.log(curUser);
        }
        squares.push(<DaySquare key={i} color={colors[curColor]} userId={curDaysRes.user} />)
      } else {
        squares.push(<DaySquare key={i} color='grey' />)
      }
    }
    // console.log('squares', squares);
    // this.setState({curColor})
    return squares
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


  numDays = (end, start) => {
    return end.diff(start, 'days')
  }

  //Make 
  makeArray = (res) => {

    let arrival = new Date(`${res.arrival}T00:00:00`);
    let departure = new Date(`${res.departure}T00:00:00`);
    let arr = moment(arrival);
    let dep = moment(departure);
    // console.log(arr, dep);

    let start = moment(this.state.startDate);
    let lengthOfStay = this.numDays(dep, arr) + 1;
    // console.log('lengthOfStay', lengthOfStay);
    let reservedDaysArray = [];
    // Take a reservation for specific cabin and make array of objects {dif: days from start of week}
    for (let i = 0; i < lengthOfStay; i++) {
      reservedDaysArray.push({ user: res.reserver.firstname, dif: this.numDays(arr, start) });
      arr.add(1, 'day')
    }

    // console.log('reservedDaysArray',  reservedDaysArray);
    return reservedDaysArray;


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
        {/* {this.makeArray()} */}
      </div>

    )
  }
}
export default ScheduleWeekly;