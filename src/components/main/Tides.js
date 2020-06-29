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
    tides: []
  }

  componentDidMount() {
    this.getWaterLevel();
  }

  getWaterLevel = () => {
    axios.get(`${URL}?begin_date=${curDay}&end_date=${nextDay}&${otherParams}`)
      .then(json => {
        this.calculateMaxMinTides(json.data.predictions)
      })
  }

  calculateMaxMinTides = (data) => {
    let rising = parseFloat(data[0].v) < parseFloat(data[1].v);
    console.log(rising, parseFloat(data[0].v));
    const tides = [];
    for (let j = 1; j < data.length; j++) {
      // console.log(parseFloat(data[j].v))

      if (rising && (parseFloat(data[j - 1].v) > parseFloat(data[j].v))) {
        data[j - 1].type = 'High';
        tides.push(data[j - 1])
        rising = !rising;
      }

      if (!rising && parseFloat(data[j - 1].v) < parseFloat(data[j].v)) {
        data[j - 1].type = 'Low';
        tides.push(data[j - 1])
        rising = !rising;
      }
    }
    console.log(tides);
    this.setState({ tides })
  }

  renderTideTable = () => {
    return this.state.tides.map(tide => {
      return (
      <tr>
        <td>{tide.type}</td>
        <td>{tide.t}</td>
        <td>{tide.v}</td>
      </tr>
      )
    })


  }






  render() {
    return (
      <div>Hello from Tides
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Time</th>
              <th>Height</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTideTable()}

          </tbody>
        </table>
      </div>
    )
  }
}
export default Tides;