import React, { Component } from 'react';
import { connect } from 'react-redux';

import NOAALogo from '../../assets/noaa.jpg'
import weatherStackLogo from '../../assets/open-weather.png'
import Forecast from './Forecast';
import Tides from './Tides';

import {
  addCurrentAnnualReport,
  addUsers,
  addCabins,
  addRepairTickets,
  addReservations
} from '../../actions/index';

class Home extends Component {

  render() {
    if (this.props.isLoggedIn) {
      this.props.addCurrentAnnualReport();
      this.props.addUsers();
      this.props.addCabins();
      this.props.addRepairTickets();
      this.props.addReservations();
    }

    return (
      <div className="ui container home" id="home">
        <div id="banner">Managing property
        on the coast of Penobscot Bay, Maine.
        </div>
        <div className="ui divider"></div>
        <div id="home-title">Welcome {this.props.curUser.firstname} {this.props.curUser.lastname}</div>

        <div id="updates">
          <h4>News:</h4>
          <ul className="home">
            <li>Summer 2020 Reservations are happening now!</li>
            <li>Be safe this summer. Maintain social distancing.</li>
            <li>Dumpster diving - load up your trash this week!</li>
            <li><a href="https://goo.gl/maps/zJDCazhBqoicc4Zi7"
              alt="Map to point"
              target="_blank"
              rel="noopener noreferrer"
            >Find us on Google Maps</a> </li>
          </ul>
          {this.props.weatherData ? <Forecast weatherData={this.props.weatherData} /> : null}
          {this.props.tideData ? <Tides tideData={this.props.tideData} /> : null}
        </div>
        <div id="footer">
          <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer"><img src={weatherStackLogo} alt="Weather API logo" height="25px"></img></a>
          <a href="https://tidesandcurrents.noaa.gov/api/" target="_blank" rel="noopener noreferrer"><img src={NOAALogo} alt='Tide logo' height="25px" ></img></a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    curUser: state.curUser.user,
    isLoggedIn: state.curUser.isLoggedIn,
    tideData: state.externalApis.tides,
    weatherData: state.externalApis.weather
  }
};

export default connect(mapStateToProps, {
  addCurrentAnnualReport,
  addUsers,
  addCabins,
  addRepairTickets,
  addReservations
})(Home);