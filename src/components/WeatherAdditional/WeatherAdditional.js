import React from 'react'
import PropTypes from 'prop-types'

const WeatherAdditional = ({ pressure_mb, humidity, wind_kph, cloud, feelslike_c }) => {
  return (
    <div className="current-weather-additional">
      <span>
        <strong>Pressure:</strong> {pressure_mb}
      </span>
      <span>
        <strong>Humidity:</strong> {humidity}%
      </span>
      <span>
        <strong>Wind Speed:</strong> {wind_kph} m/s
      </span>
      <span>
        <strong>Clouds:</strong> {cloud}%
      </span>
      <span>
        <strong>Real Feel:</strong> {feelslike_c}&deg;C
      </span>
    </div>
  )
}

WeatherAdditional.propTypes = {
  pressure_mb: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  wind_kph: PropTypes.number.isRequired,
  cloud: PropTypes.number.isRequired,
  feelslike_c: PropTypes.number.isRequired
}

export default WeatherAdditional
