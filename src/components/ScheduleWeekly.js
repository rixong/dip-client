import React, { Component } from 'react';
import DaySquare from './DaySquare';
var moment = require('moment')

const colors = ['pink', 'blue', 'green', 'yellow'];
const numCabins = 7;

class ScheduleWeekly extends Component {

  state = {
    startDate: new Date('2020-05-30T00:00:00'),
    week: 1,
    curColor: 2
  }

  // renderSchedules = () => {

  //   var arr = moment(this.state.arrival);
  //   var dep = moment(this.state.departure);
  //   var start = moment(this.state.startDate);
  //   let stayLength = dep.diff(arr, 'days')

  //   console.log('length of stay', stayLength);

  //   for (let i=0; i<stayLength; i++){
  //     let dif = arr.diff(start, 'days')
  //     if (dif >= 0 && dif < 8) {
  //       console.log('good', dif);
  //       // document.getElementById(`cabin${cabin}-day${dif}`).classList.add('pink')
  //       // console.log(dayDiv);
  //       // dayDiv.style.backgroundColor="pink"

  //     } else {
  //       console.log('bad', dif);
  //     }
  //     arr.add(1, 'day')
  //   }
  // }

  combineSingleCabinRes = (curCabinId) => {
    let result = [];
  if (this.props.reservations.length > 0) {
    console.log(this.props.reservations[0].cabin.cabinId);
    result = this.props.reservations.filter(res => res.cabin.cabinId === curCabinId)
  }
console.log(result);


    
  }






  numDays = (end, start) => {
    return end.diff(start, 'days')
  }

  makeArray = () => {

    let arrival = new Date('2020-05-28T00:00:00');
    let departure = new Date('2020-06-04T00:00:00');
    let arr = moment(arrival);
    let dep = moment(departure);
    let start = moment(this.state.startDate);
    let end = start.clone().add(7, 'days');
    let lengthOfStay = this.numDays(dep, arr);

    let reservedDaysArray = [];

    // Take a reservation for specific cabin and make array of objects {dif: days from start of week}
    for (let i = 0; i < 8; i++) {
      reservedDaysArray.push({ user: 1, dif: this.numDays(arr, start) });
      arr.add(1, 'day')
    }

    return reservedDaysArray;

    // console.log(dep.isBetween(start, end, 'day'));
  }

  makeRow = () => {
    let array = this.makeArray();
    // console.log(array);

    let squares = [];
    let curDaysRes = undefined;
    for (let i = 0; i < 8; i++) {
      if (array) {
        curDaysRes = array.find(curDay => curDay.dif === i)
      }
        // console.log('i=', i, curDaysRes);
        if (curDaysRes) {
          let color = `pink`;          
          squares.push(<DaySquare key={i} color={color} userId={curDaysRes.user} />)
        } else {
          squares.push(<DaySquare key={i} />)
        }
      }
      // console.log(squares);
      return squares

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
          {/* First Row */}
          <div className="row cabin-head" id="cabin-1">
            <div className="two wide column">Big House</div>
            <div className="fourteen wide column">
              <div className="ui internally celled eight column grid">
                {this.combineSingleCabinRes(1)}
              </div>
            </div>
          </div>

          <div className="row cabin-head" id="cabin-2">
            <div className="two wide column">Gray House</div>
            <div className="fourteen wide column">
              <div className="ui internally celled eight column grid">
                {/* {this.makeRow()} */}
              </div>
            </div>
          </div>

          <div className="row cabin-head" id="cabin-3">
            <div className="two wide column">Winterhaven</div>
            <div className="fourteen wide column">
              <div className="ui internally celled eight column grid">
                {/* {this.makeRow()} */}
              </div>
            </div>
          </div>
        </div>
        {/* {this.makeArray()} */}
      </div>

    )
  }
}
export default ScheduleWeekly;