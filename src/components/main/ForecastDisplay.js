import React from 'react';
// import moment from 'moment';

const ForecastDisplay = (props) => {
  const { temperature, weather_descriptions, wind_speed, wind_dir, weather_icons } = props.forecast

  return (
    <div id="weather-display">
      <div className="ui grid">
        <div className="ui two column row">
          <div className="ui two wide column">
            <img src={weather_icons} alt={weather_descriptions} width="35px"></img>
          </div>
          <div className="ui eigth wide column">
            <p>Currently it's {weather_descriptions} and {temperature}°F with a {wind_dir} wind blowing at {wind_speed} mph.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ForecastDisplay;