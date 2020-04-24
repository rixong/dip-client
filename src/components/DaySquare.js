import React, { Component } from 'react';


class DaySquare extends Component {
 
    render() {
    return <div className={`two wide column day ${this.props.color}`} ></div>
  }
}
export default DaySquare;