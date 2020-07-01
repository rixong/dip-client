import React, { Component } from 'react';

class TidesDisplay extends Component {

  todaysTides = (day) => {
    if (this.props.tides) {
      return this.props.tides.filter((tide) => tide.day === day)
        .map(tide => {
          let depth = tide.v.toFixed(1);
          return <div key={tide.t}> {tide.time}  {tide.type} tide ({depth}')  </div>
        })
    }
  }

  render() {
    if (this.props.loading) {
      return <p>Loading tides...</p>
    }
    if (this.props.error) {
      return <p>Tides currently unavailable</p>
    } else {
      return (
        <div id='tide-display'>
          <div className="ui grid">
            <div className="ui two column row">
              <div className="ui eight wide column">
                <h4 className="h4">Today's tides</h4>
                {this.todaysTides('today')}
              </div>
              <div className="ui eight wide column">
                <h4 className="h4">Tomorrow's tides</h4>
                {this.todaysTides('tomorrow')}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
export default TidesDisplay;