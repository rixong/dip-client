import React, { Component } from 'react';

class DaySquare extends Component {

  render() {
    return <div className={`two wide column ${this.props.color}`} id="day-square"> {this.props.userId}</div>
  }
}
export default DaySquare;