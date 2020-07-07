import React, { Component } from 'react';
import moment from 'moment';
import TidesDisplay from './TidesDisplay';
// import {connect} from 'react-redux'

// const URL = 'https://tidesandcurrents.noaa.gov/api/datagetter';
// const otherParams = 'station=8413320&product=predictions&datum=MLW&time_zone=lst_ldt&units=english&format=json'
const curDay = moment(Date.now()).format('YYYYMMDD').toString();
// const nextDay = moment(Date.now()).add(1, 'd').format('YYYYMMDD').toString();
class Tides extends Component {

  state = {
    tides: [],
  }

  componentDidMount() {
    if (this.props.tideData) {
      console.log(this.props.tideData);
      
      this.props.tideData.forEach(entry => entry.v = parseFloat(entry.v));
      this.calculateMaxMinTides(this.props.tideData)
    }
  }

  calculateMaxMinTides = (data) => {
    // console.log(this.props.tideData);

    let rising = this.props.tideData[0] < this.props.tideData[1];

    for (let j = 1; j < data.length; j++) {
      if (rising && (data[j - 1].v) > data[j].v) {
        this.addTide(data[j - 1], 'High')
        rising = !rising;
      }
      if (!rising && data[j - 1].v < data[j].v) {
        this.addTide(data[j - 1], 'Low')
        rising = !rising;
      }
      // console.log(rising);
    }
    // console.log(this.state.tides);


  }

  addTide = (tide, type) => {
    tide.type = type;
    tide.time = tide.t.substring(11);
    tide.t.substring(8, 10) === curDay.substring(6, 8) ? tide.day = 'today' : tide.day = 'tomorrow';
    this.state.tides.push(tide)
  }

  todaysTides = (day) => {
    if (this.state.tides) {
      return this.state.tides.filter((tide) => tide.day === day)
        .map(tide => {
          let depth = tide.v.toFixed(1);
          return <div key={tide.t}> {tide.time}  {tide.type} tide ({depth}')  </div>
        })
    }
  }

  render() {

    // if (this.state.loading) {
    //   return <p>Loading tides...</p>
    // }
    // if (this.state.error) {
    //   return <p>Tides currently unavailable</p>
    // } else {
      return <TidesDisplay tides={this.state.tides} />
    // }
  }
}

// const mapStateToProps = state => {
//   return {
//     tides: state.externalApis.tides
//   }
// };

export default Tides;
