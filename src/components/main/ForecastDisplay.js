import React from 'react';

const ForecastDisplay = (props) => {
  const { temperature, weather_descriptions, wind_speed, wind_dir, weather_icons, wind_gust } = props.forecast

  return (
    <div id="weather-display">
      <div className="ui grid">
        <div className="ui two column row">
          <div className="ui two wide column" id='weather-icon'>
            <img src={weather_icons} alt={weather_descriptions} width="45px"></img>
          </div>
          <div className="ui eigth wide column">
            <p>Currently {weather_descriptions} and {temperature}°F. Wind {wind_dir} at {wind_speed} mph gusting to {wind_gust} mph.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ForecastDisplay;