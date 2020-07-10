import React, { Component } from 'react';

class TidesDisplay extends Component {

  constructor(props){
    super(props)

    this.state = {
      tides:[]
    }

  }

  componentDidMount() {
    console.log('mounted', this.props.tides);
    this.setState({tides: this.props.tides})
    
  }

  tidesByDay = (day) => {
    console.log('tides by day.');
    
    // if (this.props.tides) {
      return this.state.tides.filter((tide) => tide.day === day)
        .map((tide,idx) => {
          let depth = tide.v.toFixed(1);
          return <div key={idx}> {tide.time}  {tide.type} tide ({depth}')  </div>
        })
    // }
  }

  render() {
    // if (this.props.loading) {
    //   return <p>Loading tides...</p>
    // }
    // if (this.props.error) {
    //   return <p>Tides currently unavailable</p>
    // } else {
      // if(this.props.tides){
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
  // }
}
export default TidesDisplay;