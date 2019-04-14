import {FullHeight, SubHeader, Link, CircleListContent, Button, FadeInUp} from '../../common/styled'
import {BLUE, LESS_DARK, DARK_BLUE} from '../../common/colors'
import {Box} from 'grid-styled'
import {Component} from 'react'
import Waypoint from 'react-waypoint'
import styled from 'styled-components'
import {FadeIn} from '../../common/styled'

export default class WhyEchelon extends Component {
  render () {
    return (
      <div style={{position: 'relative'}}>
        <FullHeight style={{position: 'relative'}} wrap >

          <SubHeader width={1}>Why Invest with Echelon</SubHeader>

          <Box width={[1, 1, 1, 3 / 4]} pr={[2, 2, 0, 0]} >
            <FadeInUp width={[ 1, 1 / 2, 1 / 2, 1 / 2]} visible={this.props.scrolled > 0}>
              <CircleListContent>
                <h2>Self-Governing</h2>
                <h3>
                  Echelon enables its investors unprecedented control over how their investments are managed. The governance rules will be implemented via smart contracts, amended through delegated voting events, and immutably enforced on the blockchain.
                </h3>
              </CircleListContent>
            </FadeInUp>
            <FadeInUp width={[ 1, 1 / 2, 1 / 2, 1 / 2]} visible={this.props.scrolled > 20}>
              <CircleListContent>
                <h2>Diversified Portfolio</h2>
                <h3>
                  Echelon tracks an index of over 1000 digital assets.
                  This market presents an appealing opportunity for diversification as
                  its movements are <Link href='http://crix.hu-berlin.de/data/Trimborn%20et%20al.%20-%202017%20-%20Investing%20with%20Cryptocurrencies%20-%20a%20Liquidity%20Cons.pdf'>uncorrelated</Link> with traditional assets such as stocks and bonds.
                </h3>
              </CircleListContent>
            </FadeInUp>
            <FadeInUp width={[ 1, 1 / 2, 1 / 2, 1 / 2]} visible={this.props.scrolled > 50}>
              <CircleListContent>
                <h2>Peace of Mind</h2>
                <h3>
                  Cryptocurrencies are a prime target for cybercrime. Echelon’s principals have been involved in this space since its origin. As a result, Echelon deploys world-class security systems and protocols to safeguard your investment.
                </h3>
              </CircleListContent>
            </FadeInUp>
            <FadeInUp width={[ 1, 1 / 2, 1 / 2, 1 / 2]} visible={this.props.scrolled > 50}>
              <CircleListContent>
                <h2>Powered by AI</h2>
                <h3>
                  Echelon automates portfolio management with artifical intelligence. The autonomous agents are designed to follow a strict investment methodology which includes automatic rebalancing events and delisting of assets that do not pass eligibility criteria.
                </h3>
              </CircleListContent>
            </FadeInUp>
          </Box>
          <Box width={1} p={2} />

        </FullHeight>
      </div>
    )
  }
}
