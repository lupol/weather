import React from 'react'
import WeatherAdditional from '../WeatherAdditional'
import PropTypes from 'prop-types'

const CurrentWeather = ({ location, current }) => {
  return (
    <div className="current-weather">
      <span>
        {location.name}, {location.country}
      </span>
      <span className="temperature">
        {current.temp_c}&deg;
        <span>C</span>
      </span>
      <span className="title-icon-container">
        <img src={current.condition.icon} width="64px" height="64px" />
        {current.condition.text}
      </span>
      <WeatherAdditional
        pressure_mb={current.pressure_mb}
        humidity={current.humidity}
        wind_kph={current.wind_kph}
        cloud={current.cloud}
        feelslike_c={current.feelslike_c}
      />
    </div>
  )
}

CurrentWeather.propTypes = {
  location: PropTypes.object.isRequired,
  current: PropTypes.object.isRequired
}

export default CurrentWeather
