import React, { Component } from 'react'
import moment from 'moment'

import getWeather from '../api/index'
import CitySearch from './CitySearch'
import CurrentWeather from './CurrentWeather'
import DrawCharts from './DrawCharts/'
import Tabs from './Tabs'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      current: null,
      location: null,
      forecast: null
    }
  }

  handleCitySelected = async target => {
    const res = await getWeather(target)
    this.setState({ ...res })
  }

  render() {
    const { current, location, forecast } = this.state
    return (
      <div className="weather-contaiber">
        <div className="title">
          <span className="title-icon-container">
            {current ? <img src={current.condition.icon} width="40px" height="40px" /> : null}
            <span className="forcast">Forecast</span>
          </span>
          <CitySearch onPlaceSelect={this.handleCitySelected} />
        </div>
        {!current && <div className="info-message">Please select your city</div>}
        {forecast && <div className="date">{moment(forecast.forecastday[0].date).format('dddd, D MMMM')}</div>}
        {current && <CurrentWeather location={location} current={current} />}
        <Tabs forecast={forecast}>{({ chartData }) => <DrawCharts chartData={chartData} />}</Tabs>
      </div>
    )
  }
}

export default App
