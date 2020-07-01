import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import TidesDisplay from './TidesDisplay';

const URL = 'https://tidesandcurrents.noaa.gov/api/datagetter';
const otherParams = 'station=8413320&product=predictions&datum=MLW&time_zone=lst_ldt&units=english&format=json'
const curDay = moment(Date.now()).format('YYYYMMDD').toString();
const nextDay = moment(Date.now()).add(1, 'd').format('YYYYMMDD').toString();
class Tides extends Component {

  state = {
    tides: []
  }

  componentDidMount() {
    this.getWaterLevels();
  }

  getWaterLevels = () => {
    axios.get(`${URL}?begin_date=${curDay}&end_date=${nextDay}&${otherParams}`)
      .then(json => {
        this.calculateMaxMinTides(json.data.predictions)
      })
  }

  calculateMaxMinTides = (data) => {
    console.log(data);

    data.forEach(entry => entry.v = parseFloat(entry.v));
    this.setState({ rising: data[0].v < data[1].v });
    for (let j = 1; j < data.length; j++) {
      if (this.state.rising && (data[j - 1].v) > data[j].v) {
        this.addTide(data[j - 1], 'High')
      }
      if (!this.state.rising && data[j - 1].v < data[j].v) {
        this.addTide(data[j - 1], 'Low')
      }
    }
    console.log(this.state.tides);

  }

  addTide = (tide, type) => {
    tide.type = type;
    tide.time = tide.t.substring(11);
    tide.t.substring(8, 10) === curDay.substring(6, 8) ? tide.day = 'today' : tide.day = 'tomorrow';
    this.state.tides.push(tide)
    this.setState({ rising: !this.state.rising })
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
    if (this.state.loading) {
      return <p>Loading tides...</p>
    }
    if (this.state.error) {
      return <p>Tides currently unavailable</p>
    } else {
      return <TidesDisplay tides={this.state.tides} />
    }
  }
}

export default Tides;