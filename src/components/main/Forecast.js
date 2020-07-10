import React, { Component } from 'react';
import moment from 'moment';
import ForecastDisplay from './ForecastDisplay';

class Forecast extends Component {
  state = {
    weather: {
      // temperature: null,
      // feelslike: null,
      // weather_descriptions: null,
      // wind_speed: null,
      // wind_dir: null,
      // weather_icons: null
    },
    error: false,
    loading: true
  }

  componentDidMount() {
    if (this.props.weatherData) {
      // console.log(this.props.weatherData);

      const { weather, main, wind } = this.props.weatherData;
      this.setState({
        weather: {
          temperature: parseInt(main.temp),
          weather_descriptions: weather[0].description,
          wind_speed: parseInt(wind.speed),
          wind_dir: this.getCompassDirection(wind.deg),
          wind_gust: parseInt(wind.gust),
          weather_icons: `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
        },
      });
    }
  }

  getCompassDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    if (degrees > 348) {
      return directions[0];
    } else {
      return directions[Math.round(degrees / 22.5)];
    }
  }

  render() {
    return <div>
      <h4>Harborside Weather and Tides for {moment(Date.now()).format('MMM Do')} at {moment(Date.now()).format('LT')}:</h4>
      <ForecastDisplay forecast={this.state.weather} />
    </div>
  }

}

export default Forecast;



