import React, { Component } from 'react';
import moment from 'moment';
import TidesDisplay from './TidesDisplay';

const curDay = moment(Date.now()).format('YYYYMMDD').toString();

class Tides extends Component {

  state = {
    tides: [],
  }

  componentDidMount() {
    if (this.props.tideData) {      
      this.props.tideData.forEach(entry => entry.v = parseFloat(entry.v));
      this.calculateMaxMinTides(this.props.tideData)
    }
  }

  calculateMaxMinTides = (data) => {
    
    let rising = this.props.tideData[0].v < this.props.tideData[1].v;
    // console.log(rising, this.props.tideData);
    for (let j = 1; j < data.length; j++) {
      if (rising && (data[j - 1].v) > data[j].v) {
        this.addTide(data[j - 1], 'High')
        rising = !rising;
      }
      if (!rising && data[j - 1].v < data[j].v) {
        this.addTide(data[j - 1], 'Low')
        rising = !rising;
      }
    }

  }

  addTide = (tide, type) => {
    const newTide = {};
    newTide.type = type;
    newTide.depth = tide.v;
    newTide.time = moment(tide.t).add(15, 'm').format('h:mma');
    tide.t.substring(8, 10) === curDay.substring(6, 8) ? newTide.day = 'today' : newTide.day = 'tomorrow';
    this.state.tides.push(newTide)
  }

  render() {
      return <TidesDisplay tides={this.state.tides} />
  }
}

export default Tides;
