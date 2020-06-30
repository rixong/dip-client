import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';

const URL = 'https://tidesandcurrents.noaa.gov/api/datagetter';
//begin_date, end_date  
const otherParams = 'station=8413320&product=predictions&datum=MLW&time_zone=lst_ldt&units=english&format=json'
const curDay = moment(Date.now()).format('YYYYMMDD').toString();
const nextDay = moment(Date.now()).add(1, 'd').format('YYYYMMDD').toString();
class Tides extends Component {

  state = {
    tides: null
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

  calculateMaxMinTides = (parsedData) => {
    parsedData.forEach(entry => entry.v = parseFloat(entry.v));
    let rising = parsedData[0].v < parsedData[1].v;
    const tides = [];
    for (let j = 1; j < parsedData.length; j++) {
      if (rising && (parsedData[j - 1].v) > parsedData[j].v) {
        parsedData[j - 1].type = 'High';
        parsedData[j - 1].time = parsedData[j - 1].t.substring(11);
        parsedData[j - 1].date = parsedData[j - 1].t.substring(0,10);
        tides.push(parsedData[j - 1])
        rising = !rising;
      }

      if (!rising && parsedData[j - 1].v < parsedData[j].v) {
        parsedData[j - 1].type = 'Low';
        parsedData[j - 1].time = parsedData[j - 1].t.substring(11);
        parsedData[j - 1].date = parsedData[j - 1].t.substring(0,10);
        tides.push(parsedData[j - 1])
        rising = !rising;
      }
    }    
    this.setState({ tides })
  }

  todaysTides = () => {
    if (this.state.tides) {
    return this.state.tides.filter((tide) => tide.date === this.state.tides[0].date)
      .map(tide => {
        let depth = tide.v.toFixed(1);
        return <div key={tide.t}> {tide.time}  {tide.type} tide ({depth}')  </div>
      })
    }
  }

  tomorrowsTides = () => {
    if (this.state.tides) {
    return this.state.tides.filter((tide) => tide.date !== this.state.tides[0].date)
      .map(tide => {
        let depth = tide.v.toFixed(1);
        return <div key={tide.t}> {tide.time}  {tide.type} tide ({depth}')  </div>
      })
    }
  }


  render() {
    return (
      <div className='tide-display'>
        <div className="ui grid">
          <div className="ui two column row">
            <div className="ui eight wide column">
              <h4>Today's tides</h4>
              {this.todaysTides()}
            </div>
            <div className="ui eight wide column">
              <h4>Tomorrow's tides</h4>
              {this.tomorrowsTides()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Tides;