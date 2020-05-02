import React, { Component } from 'react';
import DaySquare from './DaySquare';
import uuid from 'react-uuid'

const colors = ['teal', 'blue', 'green', 'violet', 'olive', 'orange', 'grey'];

class WeekRow extends Component {

  makeRow = () => {
    // let array = this.combineSingleCabinRes();
    // console.log(array);

    let squares = [];
    let curDaysRes = undefined;
    let curUser = undefined;

    for (let i = 0; i < 8; i++) {
      // console.log('makerow',this.props.reservations) 
      if (this.props.reservations) {
        curDaysRes = this.props.reservations.find(curDay => curDay.dif === i)
      }
      if (curDaysRes) {
        // console.log(curDaysRes);
        if (!curUser || curDaysRes.user !== curUser) {
          curUser = curDaysRes.userName
        }
        let colorIdx = curDaysRes.pending ? 6 : curDaysRes.userId % 6; //Last color is reserved for pending res.
        squares.push(<DaySquare key={uuid()}
        color={colors[colorIdx]}
        userName={curDaysRes.userName} />)
      } else {
        squares.push(<DaySquare key={uuid()} color='default-square-color' />)
      }
    }

    return squares
  }

  render() {
    return (
      <div className="row" id="cabin-head">
        <div className="two wide column" id="cabin-name" >{this.props.cabinName}</div>
        <div className="fourteen wide column">
          <div className="ui internally celled eight column grid" id="name-row">
            {this.makeRow(this.props.cabinId)}
          </div>
        </div>
      </div>
    )
  }
}
export default WeekRow;