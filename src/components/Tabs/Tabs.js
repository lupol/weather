import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

export class Tabs extends Component {
  static propTypes = {
    forecast: PropTypes.object.isRequired
  }
  state = {
    wind: false,
    temp: true,
    precipitation: false,
    humidity: false
  }
  handleTabClick = ({ target }) => {
    this.setState({
      wind: this.refs.wind === target,
      temp: this.refs.temp === target,
      precipitation: this.refs.precipitation === target,
      humidity: this.refs.humidity === target
    })
  }
  getChartData = forecast => {
    const { wind, temp, precipitation, humidity } = this.state
    const chartData = getChartDataByTabName(this.state)

    return forecast.map((item, i) => {
      return {
        x: i,
        y: item.day[chartData.prop],
        label: moment(item.date).format('D, MMM'),
        date: moment(item.date).format('dddd, MMMM Do YYYY'),
        getTitle: chartData.getTitle
      }
    })
  }
  render() {
    const { wind, temp, precipitation, humidity } = this.state
    const { forecast } = this.props
    if (!forecast) {
      return null
    }
    return (
      <div className="tabs-container">
        <strong>Forecast 10 days</strong>
        <div className="tabs">
          <span ref="wind" onClick={this.handleTabClick} className={`tab ${wind ? 'active-tab' : ''}`}>
            Wind
          </span>
          <span ref="temp" onClick={this.handleTabClick} className={`tab ${temp ? 'active-tab' : ''}`}>
            Temperature
          </span>
          <span
            ref="precipitation"
            onClick={this.handleTabClick}
            className={`tab ${precipitation ? 'active-tab' : ''}`}
          >
            Precipitation
          </span>
          <span ref="humidity" onClick={this.handleTabClick} className={`tab ${humidity ? 'active-tab' : ''}`}>
            Humidity
          </span>
        </div>
        <div className="tabs-content">
          {this.props.children({ chartData: this.getChartData(forecast.forecastday) })}
        </div>
      </div>
    )
  }
}

export const getChartDataByTabName = ({ wind, temp, precipitation, humidity }) => {
  if (wind) return { prop: 'maxwind_kph', getTitle: val => `Wind max speed: ${val} kph` }
  if (temp) return { prop: 'avgtemp_c', getTitle: val => <span>{`Temperature: ${val}`}&deg;C</span> }
  if (precipitation) return { prop: 'totalprecip_mm', getTitle: val => `Total precipitation: ${val}mm` }
  if (humidity) return { prop: 'avghumidity', getTitle: val => `Average humidity: ${val}%` }
}

export default Tabs
