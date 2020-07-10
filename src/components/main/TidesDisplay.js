import React, { Component } from 'react';

class TidesDisplay extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tides: []
    }
  }

  componentDidMount() {
    this.setState({ tides: this.props.tides })
  }

  tidesByDay = (day) => {
    // if (this.props.tides) {
    return this.state.tides.filter((tide) => tide.day === day)
      .map((tide, idx) => {
        return <div key={idx} className='tide-list'> <strong>{tide.time}</strong>  {tide.type} ({tide.depth.toFixed(1)}')  </div>
      })
    // }
  }

  render() {
    return (
      <div id='tide-display'>
        <div className="ui grid">
          <div className="ui two column row">
            <div className="ui eight wide column">
              <h4 className="h4">Today's tides</h4>
              {this.tidesByDay('today')}
            </div>
            <div className="ui eight wide column">
              <h4 className="h4">Tomorrow's tides</h4>
              {this.tidesByDay('tomorrow')}
            </div>
          </div>
        </div>
      </div>
    )
  }

}
export default TidesDisplay;