import { withScreenSize } from '@vx/responsive'
import { LinearGradient } from '@vx/gradient'

import Chart from '../components/chart.js'
import format from '../utils/formatPrice.js'

function Background({width, height}){
  return (
    <svg width={width} height={height}>
      <LinearGradient id="fill" vertical={false}>
        <stop stopColor="#b993d6" offset="0%" />
        <stop stopColor="#8ca6db" offset="100%" />
      </LinearGradient>
      <rect width={width} height={height} fill="url(#fill)" />
    </svg>
  )
}

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: {}
    }
  }
  componentDidMount(){
    fetch('https://api.coindesk.com/v1/bpi/historical/close.json')
    .then(res => res.json())
    .then(json => {
      this.setState({
        data: json
      })
    })
  }
  render(){
    const { screenWidth, screenHeight } = this.props;
    const { data } = this.state;
    // console.log(data)
    if(!data.bpi) return <div> loading... </div>
    const prices = Object.keys(data.bpi).map(k => {
      return {
        time: k,
        price: data.bpi[k]
      }
    })
    const currentPrice = prices[prices.length - 1].price
    const firstPrice = prices[0].price;
    const diffPrice = currentPrice - firstPrice;
    const hasIncreased = diffPrice > 0;

    return (
      <div className="app">
        <Background width={screenWidth} height={screenHeight} />
        <div className="center">
          <div className="chart">
            <div className="titlebar">
              <div className="title">
                <div> Bitcoin Price </div>
                <div>
                  <small> Last 30 days </small>
                </div>
              </div>
              <div className="spacer"></div>
              <div className="prices">
                <div>
                  {format(currentPrice)}
                </div>
                <div className={hasIncreased ? 'increased' : 'decreased'}>
                  <small>
                    {hasIncreased ? '+' : '-'}
                    {format(diffPrice)}
                  </small>
                </div>
              </div>
            </div>

            <div className="container">
              <Chart data={prices} />
            </div>
          </div>
          <p className="disclaimer">
            {data.disclaimer}
          </p>
        </div>
        <style jsx>{`
          .app,
          .center {
            display: flex;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            flex: 1;
            justify-content: center;
            align-items: center;
            font-family: arial;
            flex-direction: column;
          }
          .container {
            flex: 1;
            display: flex;
          }
          .spacer {
            flex: 1;
          }
          .prices {
            align-items: flex-end;
            display: flex;
            flex-direction: column;
          }
          .increased {
            color: #00f1a1;
          }
          .decreased {
            color: '#ff0000'
          }
          .titlebar {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 15px;
          }
          .chart {
            width: 600px;
            height: 400px;
            background-color: #27273f;
            border-radius: 8px;
            color: white;
            display: flex;
            flex-direction: column;
          }
          .disclaimer {
            color: white;
            opacity: 0.4;
            font-size: 14px;
          }
        `}
        </style>
      </div>
    )
  }
}
export default withScreenSize(App);
