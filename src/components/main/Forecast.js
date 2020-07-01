import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import ForecastDisplay from './ForecastDisplay';

// const weatherAccessKey = '955f4360db810b737228b3305fadd113';
const weatherAccessKey = '5d68eeeaffdf83bc57c62f8cda5f0445';
//sample icon "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0017_cloudy_with_light_rain.png"

const coord = {
  long: -68.8155,
  lat: 44.3490
}

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
    // this.getForecast()
  }

  getForecast = () => {
    const weatherURL =
      `http://api.weatherstack.com/current?access_key=${weatherAccessKey}&query=${coord.lat},${coord.long}&units=f`

    axios.get(weatherURL)
      .then(json => {
        // console.log(json.data);
        if (json.data.success === false) {
          this.setState({ loading: false, error: true })
        } else {
          const { temperature, feelslike, weather_descriptions, wind_speed, wind_dir, weather_icons } = json.data.current
          this.setState({
            weather: {
              temperature,
              feelslike,
              weather_descriptions: weather_descriptions[0],
              wind_speed,
              wind_dir,
              weather_icons: weather_icons[0]
            },
            error: false,
            loading: false
          })
        }
      })
  }

  renderView = () => {
    if (this.state.loading) {
      return <p>Loading...</p>
    }
    else if (this.state.error) {
      return <p>Weather currently unavailable</p>
    } else {
      return <ForecastDisplay forecast={this.state.weather} />
    }
  }

  render() {
    return <div>
      <h4>Harborside Weather and Tides for {moment(Date.now()).format('MMM Do')} at {moment(Date.now()).format('LT')}:</h4>
      {this.renderView()}
    </div>
  }

}

export default Forecast;

// http://api.weatherstack.com/current?access_key=955f4360db810b737228b3305fadd113&query=44.3490,-68.8155



