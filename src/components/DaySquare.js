import React, { Component } from 'react';

class DaySquare extends Component {

  render() {
    return <div className={`two wide column day ${this.props.color}`} > {this.props.userId}</div>
  }
}
export default DaySquare;