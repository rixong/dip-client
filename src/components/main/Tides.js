import React, { Component } from 'react';
import moment from 'moment';
// import axios from 'axios';
import TidesDisplay from './TidesDisplay';
import {connect} from 'react-redux'

// const URL = 'https://tidesandcurrents.noaa.gov/api/datagetter';
// const otherParams = 'station=8413320&product=predictions&datum=MLW&time_zone=lst_ldt&units=english&format=json'
const curDay = moment(Date.now()).format('YYYYMMDD').toString();
// const nextDay = moment(Date.now()).add(1, 'd').format('YYYYMMDD').toString();
class Tides extends Component {

  state = {
    tides: []
  }

  componentDidMount() {
    if(this.props.tides){
      this.calculateMaxMinTides()
    }
  }

  calculateMaxMinTides = () => {
    const data = [...this.props.tides]
    console.log(data);
    
    if (data){
      data.forEach(entry => entry.v = parseFloat(entry.v));
      console.log(data[0].v < data[1].v);
    this.setState({rising: false});  ///false
    console.log('rising',this.state.rising);
    
    for (let j = 1; j < data.length; j++) {
      if (this.state.rising && (data[j - 1].v) > data[j].v) {
        this.addHighLowTide(data[j - 1], 'High')
      }
      if (!this.state.rising && data[j - 1].v < data[j].v) {
        this.addHighLowTide(data[j - 1], 'Low')
      }
    }
  }
    // console.log(this.state.tides);

  }

  addHighLowTide = (tide, type) => {
    let day = ''
    tide.t.substring(8, 10) === curDay.substring(6, 8) ? day = 'today' : day = 'tomorrow';
    this.state.tides.push({
      type: type,
      time: tide.t.substring(11),
      day,
      v: tide.v
    });
    this.setState({ rising: !this.state.rising })
    // console.log('rising',this.state.rising);
    
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

const mapStateToProps = state => {
  return {
    tides: state.externalApis.tides
  }
};

export default connect(mapStateToProps)(Tides);