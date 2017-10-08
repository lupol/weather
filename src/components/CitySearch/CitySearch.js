import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class CitySearch extends Component {
  static propTypes = {
    onPlaceSelect: PropTypes.func.isRequired
  }
  constructor() {
    super()
    this.state = {
      value: '',
      hasError: false
    }
  }
  componentDidCatch(error, info) {
    console.log(info)
    this.setState({ hasError: true })
  }

  componentDidMount() {
    const { onPlaceSelect } = this.props

    this.autocomplete = new google.maps.places.Autocomplete(this.refs.placeInput)

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace()
      if (!place.geometry) {
        const firsrResult = document.querySelector('.pac-container').firstChild.textContent
        onPlaceSelect({ city: firsrResult })
        this.setState({ value: '' })
        return
      }
      if (place.address_components) {
        const city = place.address_components.find(item => {
          if (item.types.includes('locality')) {
            return item
          }
        })
        const target = {
          city: city ? city.short_name : firsrResult
        }
        onPlaceSelect(target)
        this.setState({ value: '' })
      }
    })
  }

  componentWillUnmount() {
    this.autocomplete.removeListener('place_changed')
  }

  handleOnChange = ({ target: { value } }) => this.setState({ value })

  render() {
    const { value, hasError } = this.state

    if (hasError) {
      return <h1>Something went wrong.</h1>
    }
    return (
      <div>
        <input
          placeholder="City or Zipcode"
          ref="placeInput"
          type="text"
          value={value}
          onChange={this.handleOnChange}
        />
      </div>
    )
  }
}

export default CitySearch
