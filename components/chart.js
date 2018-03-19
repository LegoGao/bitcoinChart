import React from 'react'
import { withParentSize } from '@vx/responsive'
import { scaleTime, scaleLinear } from '@vx/scale'
import { LinePath, AreaClosed, Bar, Line } from '@vx/shape'
import { LinearGradient } from '@vx/gradient'
import { AxisBottom } from '@vx/axis'
import { withTooltip, Tooltip } from '@vx/tooltip'
import { bisector } from 'd3-array'
import { localPoint } from '@vx/event'

import formatPrice from '../utils/formatPrice'
import MaxPrice from './maxprice.js'
import MinPrice from './minprice.js'

class Chart extends React.Component {
  constructor(props){
    super(props);

  }

  render(){
    const {
      data,
      parentWidth,
      parentHeight,
      tooltipLeft,
      tooltipTop,
      tooltipData,
      showTooltip,
      hideTooltip
    } = this.props

    const margin = {
      top: 15,
      bottom: 40,
      left: 0,
      right: 0,
    }

    const width = parentWidth - margin.left - margin.right;
    const height = parentHeight - margin.top - margin.bottom;

    const bisectDate = bisector(d => x(d)).left

    const x = data => new Date(data.time)
    const y = data => data.price
    const firstPoint = data[0]
    const currentPoint = data[data.length - 1]

    const minPrice = Math.min(...data.map(y))
    const maxPrice = Math.max(...data.map(y))

    const maxPriceData = [
      {
        time: x(firstPoint),
        price: maxPrice
      },
      {
        time: x(currentPoint),
        price: maxPrice
      }
    ]

    const minPriceData = [
      {
        time: x(firstPoint),
        price: minPrice
      },
      {
        time: x(currentPoint),
        price: minPrice
      }
    ]

    const xScale = scaleTime({
      range: [0, width],
      domain: [Math.min(...data.map(x)), Math.max(...data.map(x))]
    })

    const yScale = scaleLinear({
      range: [height, 0],
      domain: [minPrice, maxPrice]
    })

    // console.log(xScale.domain())

    return (
      <div>
        <svg ref={s => (this.svg = s)} width={width} height={parentHeight}>
          {/* <rect width={width} height={height} fill="steelblue" /> */}

          <AxisBottom
            data={data}
            scale={xScale}
            x={x}
            top={yScale(minPrice)}
            hideAxisLine
            hideTicks
            numTicks={4}
            tickLabelComponent={<text fill="#ffffff" fontSize={11} />}
          />
          <LinearGradient
            id = "area-fill"
            from = "#b993d6"
            to = "#8ca6db"
            fromOpacity = {.3}
            toOpacity = {0}

          />
          <AreaClosed
            data = {data}
            yScale= {yScale}
            xScale = {xScale}
            x = {x}
            y = {y}
            fill="url(#area-fill)"
            stroke="transparent"
          />
          <MaxPrice
            data= {maxPriceData}
            yScale = {yScale}
            xScale = {xScale}
            x={x}
            y={y}
            label={formatPrice(maxPrice)}
            yText={yScale(maxPrice)}
          />
          <MinPrice
            data= {minPriceData}
            yScale = {yScale}
            xScale = {xScale}
            x={x}
            y={y}
            label={formatPrice(minPrice)}
            yText={yScale(minPrice)}
          />
          <LinePath
            data = {data}
            yScale= {yScale}
            xScale = {xScale}
            x = {x}
            y = {y}
          />
          <Bar
            data={data}
            width={width}
            height={height}
            fill="transparent"
            onMouseMove={data => event => {
              const { x: xPoint } = localPoint(this.svg, event)
              const x0 = xScale.invert(xPoint)
              const index = bisectDate(data, x0, 1)
              const d0 = data[index - 1]
              const d1 = data[index]
              const d = x0 - xScale(x(d0)) > xScale(x(d1)) - x0 ? d1 : d0
              showTooltip({
                tooltipLeft: xScale(x(d)),
                tooltipTop: yScale(x(d)),
                tooltipData: d
              })
            }}
            onMouseLeave={data => event => {}}
          />
          {tooltipData && <g>
            <Line
              from={{ x: tooltipLeft, y: yScale(y(maxPriceData[0]))}}
              to = {{
                      x: tooltipLeft,
                      y: yScale(y(minPriceData[0]))
                   }}
              stroke="#ffffff"
              strokeDasharray="2,2"
            />
            <circle
              r="6"
              cx={tooltipLeft}
              cy={tooltipTop}

            />
          </g>}
        </svg>
        {tooltipData &&
          <Tooltip
            top={tooltipTop}
            left = {tooltipLeft}
          >
            {formatPrice(x(tooltipData))}
          </Tooltip>
        }
      </div>
    )
  }
}

export default withParentSize(withTooltip(Chart));
