import React, { Component } from 'react';
import DaySquare from './DaySquare';
var moment = require('moment')

const colors = ['pink', 'blue', 'green', 'yellow']

class ScheduleWeekly extends Component {

  state = {
    startDate: new Date('2020-05-30T00:00:00'),
    week: 1,
    arrival: new Date('2020-06-02T00:00:00'),
    departure: new Date('2020-06-10T00:00:00'),
    curColor: 2
  }

  renderSchedules = () => {

    var arr = moment(this.state.arrival);
    var dep = moment(this.state.departure);
    var start = moment(this.state.startDate);
    let stayLength = dep.diff(arr, 'days')
    let cabin = 1;
    console.log('length of stay', stayLength);
    
    for (let i=0; i<stayLength; i++){
      let dif = arr.diff(start, 'days')
      if (dif >= 0 && dif < 8) {
        console.log('good', dif);
        // document.getElementById(`cabin${cabin}-day${dif}`).classList.add('pink')
        // console.log(dayDiv);
        // dayDiv.style.backgroundColor="pink"
        
      } else {
        console.log('bad', dif);
      }
      arr.add(1, 'day')
    }


    // return this.props.reservations.map(res => {
    //   return <p>Name: {res.reserver.firstname} Arrives: {res.arrival} Departs: {res.departure}</p>
    // })
  }
  
  makeRow = () => {
    let arr = [];
    for (let i = 0; i < 8; i++) {
      arr.push(<DaySquare color={colors[this.state.curColor]}/>)
    }
    return arr;
  }

  render() {
    // console.log(moment(new Date()).format("d"));



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
                {this.makeRow()}
                {/* <DaySquare color={colors[this.state.curColor]}/>
                <DaySquare color={colors[this.state.curColor]}/>
                <DaySquare color={colors[this.state.curColor]}/>
                <DaySquare color={colors[this.state.curColor]}/>
                <DaySquare color={colors[this.state.curColor]}/>
                <DaySquare color={colors[this.state.curColor]}/>
                <DaySquare color={colors[this.state.curColor]}/>
                <DaySquare color={colors[this.state.curColor]}/> */}




              </div>
            </div>
          </div>

          <div className="row cabin-head" id="cabin-2">
            <div className="two wide column">Gray House</div>
            <div className="fourteen wide column">
              <div className="ui internally celled eight column grid">
                <div className="two wide column"></div>
                <div className="two wide column"></div>
                <div className="two wide column"></div>
                <div className="two wide column"></div>
                <div className="two wide column"></div>
                <div className="two wide column"></div>
                <div className="two wide column"></div>
                <div className="two wide column"></div>
              </div>
            </div>
          </div>

          <div className="row cabin-head" id="cabin-3">
            <div className="two wide column">Winterhaven</div>
            <div className="fourteen wide column">
              <div className="ui internally celled eight column grid">
                <div className="two wide column"></div>
                <div className="two wide column"></div>
                <div className="two wide column"></div>
                <div className="two wide column"></div>
                <div className="two wide column"></div>
                <div className="two wide column"></div>
                <div className="two wide column"></div>
                <div className="two wide column"></div>
              </div>
            </div>
          </div>

        </div>
        {this.renderSchedules()}

      </div>

    )
  }
}
export default ScheduleWeekly;