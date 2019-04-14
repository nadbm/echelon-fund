import {Component} from 'react'
import {VictoryLine, VictoryClipContainer, VictoryChart, VictoryTheme} from 'victory'
import {Box, Flex} from 'grid-styled'
import {FullHeight, Slider, SubHeader, Link, FadeIn, FadeInUp} from '../../common/styled'
import styled from 'styled-components'
import {BLUE, LESS_DARK} from '../../common/colors'
import TrackDocument from '../../common/TrackDocument'
import media from 'styled-media-query'
import axios from 'axios'

function monthDiff (d1, d2) {
  var months
  months = (d2.getFullYear() - d1.getFullYear()) * 12
  months -= d1.getMonth() + 1
  months += d2.getMonth()
  return months <= 0 ? 0 : months
}

const Controls = styled.div`
  font-size: 16px;
  width: 15em;
  padding: 2em;
  ${media.lessThan('medium')`
    width: 80%;
    background: none;
  `}
  h3 {
    width: 100%;
    font-size: 13px;
    user-select: none;
    cursor: default;
    margin: 1em 0em;
  }
  h3 span {
    color: ${BLUE};
    float: right;
    min-width: 50%;
    text-align: right;
    font-size: 15px;
  }
`

const Growth = styled.div`
  position: absolute;
  font-size: 2.5em;
  font-weight: 100;
  top: 2em;
  right: 0;
  transition: position 0.3s ease-in;
  text-align: right;
  span {
    color: #11b2c6;
    font-size: 80%;
  }
  ${media.lessThan('medium')`
    font-size: 2em;
    top: 8em;
    right: 2em;
    font-weight: bold;
  `}
`
const XAxis = styled.h3`
  position: absolute;
  bottom: 1em;
  opacity: 0.6;
  font-weight: 100;
  ${media.lessThan('medium')`
    font-size: 1em;
    bottom: -2em;
    padding-left: 2em;
  `}

`

const BackgroundCircle = styled.div`
  width: 50vh;
  height: 50vh;
  border: 1em solid ${BLUE};
  border-radius: 50%;
  opacity: 0.05;
  position: absolute;
  margin-top: 50vh;
  right: 5em;
`
const Graph = styled(Box)`
  
  margin-top: -900px;
  ${media.lessThan('medium')`
    margin-top: -20%;
    padding-left: 2em;
  `}
  position: relative;
  z-index: -1;
  margin-left: 10px;
`
export default class FundChart extends Component {
  constructor () {
    super()
    this.state = {requested: false, data: [], initialInvestment: 500000, startingDate: new Date('12/01/2016')}
    this.fetch = true
  }
  componentWillUnmount () {
    this.fetch = false
  }
  componentDidMount () {
    if (typeof window !== 'undefined' && !this.state.requested) {
      axios.get('/static/crix.json')
      .then(({data}) => {
        if (this.fetch) {
          this.setState({
            data: data.map(({date, price}) => ({a: new Date(date), b: price}))
          })
        }
      })
      .catch(function (ex) {
        console.log('error loading chart data', ex)
      })
      this.setState({requested: true})
    }
  }

  handleStartingInvestment (domain) {
    this.setState({selectedDomain: domain})
  }

  getMonth (month) {
    return [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ][month]
  }
  render () {
    const investment = this.state.initialInvestment
    const filteredData = this.state.data.filter(d => d.a > (new Date(this.state.startingDate)))
    const scaling = this.state.data.length > 0 ? (parseInt(investment) / filteredData[0].b) : 1
    const scaledData = filteredData.map(d => ({a: d.a, b: d.b * scaling}))
    const growth = scaledData.length > 0 ? parseInt(scaledData[scaledData.length - 1].b) : 0
    const minDate = this.state.data.length > 0 ? this.state.data[1].a : new Date('05/01/2014')
    const maxDate = this.state.data.length > 0 ? this.state.data[this.state.data.length - 1].a : new Date('01/01/2017')
    const max = 35000000
    const min = 70000
    const startMonth = this.getMonth(this.state.startingDate.getMonth())
    const startYear = this.state.startingDate.getFullYear()
    const elapsedMonths = monthDiff(this.state.startingDate, new Date())

    return (
      <FullHeight direction='column' justify='space-around' >
        <SubHeader width={1}> The Echelon Digital Asset Index</SubHeader>
        <TrackDocument>
          {
            (scrollY, height) => (<BackgroundCircle style={{top: `${(height - scrollY / 3).toFixed(1)}px`}} />)
          }
        </TrackDocument>
        <Box w={[1, 1, 1 / 2, 1 / 2]} p={[2, 2, 3, 2]} style={{transform: 'translate(0, 0)', zIndex: '999'}}>
          <FadeIn visible={this.props.scrolled > 40}>
            <p>
              Indexing is a proven strategy to lower investing risk. This is as true for the stock market as it is for
              cryptocurrencies. Echelon helps every smart investor to conveniently gain exposure to the market with less risk.
            </p>
            <br />
            <p>
              Echelon builds its portfolio using a <Link href='/prospectus'>benchmark index</Link> of the cryptocurrency market. The
              resulting fund contains assets listed according to strict eligibility criteria and weighted by their respective market capitalizations. Echelon securely manages the portfolio and issues shares of the fund, enabling investors to access it through traditional banking
              infrastructure. Read more about <Link href='/prospectus'> the fund</Link>.
            </p>
          </FadeIn>
          <Flex style={{height: '100%', marginBottom: '4em', transform: 'translate(0, 0)'}} align='center'>
            <FadeIn visible={this.props.scrolled > 60} style={{ width: '100%'}}>
              <Controls>
                <h3>Initial Investment <span>${investment.toLocaleString()}</span></h3>
                <Slider
                  type='range'
                  min={100000}
                  max={1000000}
                  step='500'
                  onChange={(e) => this.setState({initialInvestment: parseInt(e.target.value)})}
                  value={investment} class='range blue'
                />
                <h3>Starting Period <span>{elapsedMonths} month{elapsedMonths > 1 ? 's' : ''} ago</span> </h3>
                <Slider
                  type='range'
                  reverse
                  min={minDate.getTime()}
                  max={maxDate.getTime()}
                  value={this.state.startingDate.getTime()}
                  onChange={(e) => this.setState({startingDate: new Date(parseInt(e.target.value))})}
                  step={1000 * 60 * 60 * 24} class='range blue'
                />
              </Controls>
              <Growth>$ {growth.toLocaleString()} <br />
                <span>{((growth * 100 / investment) - 100).toFixed(2)}%</span>
              </Growth>
            </FadeIn>

          </Flex>
        </Box>
        <Box w={1 / 2} />
        <FadeIn visible={this.props.scrolled > 60}>
          <Graph w={4 / 5} m={0} >
            <VictoryLine
              style={{
                data: {stroke: 'url(#linearGradient-1)', strokeWidth: '3px'}
              }}
              containerId={'fundchartid'}
              groupComponent={<VictoryClipContainer clipId={2} />}
              containerComponent={<svg width='100%' height='100%' viewBox='0 0 900 900' />}
              width={900}
              height={900}
              padding={{top: 0, bottom: 35, left: 0, right: 0}}
              domain={{y: [min, max]}}
              x='a'
              y='b'
              data={scaledData}
              />
            <XAxis style={{left: 0}}>{startMonth} {startYear}</XAxis>
            <XAxis style={{right: 0}}>Today</XAxis>
          </Graph>
        </FadeIn>
        <Box w={1} style={{height: '4em'}} />

      </FullHeight>
    )
  }
}
