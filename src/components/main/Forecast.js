import React, { Component } from 'react';
import moment from 'moment';
import ForecastDisplay from './ForecastDisplay';

class Forecast extends Component {
  state = {
    weather: {
      temperature: null,
      feelslike: null,
      weather_descriptions: null,
      wind_speed: null,
      wind_dir: null,
      weather_icons: null
    },
    error: false,
    loading: true
  }

  componentDidMount() {
    if (this.props.weatherData){
      const { temperature, feelslike, weather_descriptions, wind_speed, wind_dir, weather_icons } = this.props.weatherData;
                this.setState({
            weather: {
              temperature,
              feelslike,
              weather_descriptions: weather_descriptions[0],
              wind_speed,
              wind_dir,
              weather_icons: weather_icons[0]
            },
          });
      this.renderView()
    }
  }

  renderView = () => {
    // if (this.state.loading) {
    //   return <p>Loading...</p>
    // }
    // else if (this.state.error) {
    //   return <p>Weather currently unavailable</p>
    // } else {
      return <ForecastDisplay forecast={this.state.weather} />
    // }

  }

  render() {
    return <div>
      <h4>Harborside Weather and Tides for {moment(Date.now()).format('MMM Do')} at {moment(Date.now()).format('LT')}:</h4>
      {this.renderView()}
    </div>
  }

}

export default Forecast;



