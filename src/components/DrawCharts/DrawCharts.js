import React, { Component } from 'react'
import { XAxis, YAxis, FlexibleWidthXYPlot, VerticalBarSeries, HorizontalGridLines, Hint } from 'react-vis'
import moment from 'moment'
import PropTypes from 'prop-types'

import '../../../node_modules/react-vis/dist/style.css'

export class DrawCharts extends Component {
  static propTypes = {
    chartData: PropTypes.array.isRequired
  }
  state = {
    showHint: null
  }
  render() {
    const { showHint } = this.state
    const { chartData } = this.props

    return (
      <FlexibleWidthXYPlot height={300}>
        <HorizontalGridLines />
        <XAxis tickTotal={10} hideLine tickFormat={i => chartData[i].label} tickSizeInner={0} tickSizeOuter={0} />
        <YAxis hideLine tickSizeInner={0} tickSizeOuter={8} />
        <VerticalBarSeries
          stroke="white"
          onValueMouseOver={value => {
            this.setState({ showHint: value })
          }}
          onSeriesMouseOut={() => {
            this.setState({ showHint: null })
          }}
          data={chartData}
        />
        {showHint && (
          <Hint value={showHint}>
            <div className="chart-hint">
              <span>{showHint.date}</span>
              <span>{showHint.getTitle(showHint.y)}</span>
            </div>
          </Hint>
        )}
      </FlexibleWidthXYPlot>
    )
  }
}

export default DrawCharts
