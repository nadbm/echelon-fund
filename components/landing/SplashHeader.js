import { Component } from 'react'
import { Flex, Box } from 'grid-styled'
import media from 'styled-media-query'
import Router from 'next/router'
import Waypoint from 'react-waypoint'
import styled from 'styled-components'
/* Import common components */
import { FullScreen, FadeInUp, FadeIn } from '../../common/styled'
import CTA from './CTA'
import { GREY_BLUE } from '../../common/colors'

const Container = styled(Flex)`
  position: relative;
  text-align: left;
  font-family: Nunito Sans;
  max-width: 700px;
  h1 {
    font-weight: 700;
    font-size: 4.5em;
    line-height: 1.2em;
    letter-spacing: 0.1em;
    margin: 0;
    text-transform: uppercase;
  }
  h3 {
    margin:1em 0;
    letter-spacing: 0.03em;
    font-size: 1.8em;

    font-weight: 200;
    color: ${GREY_BLUE};
  }
  ${media.lessThan('medium')`
    h1 {
      margin-top: 1em;
      font-size: 3em;
    }
    h3 {
      font-size: 1.5em;
    }
  `}
`

export default class SplashHeader extends Component {
  state = {visibleHeader: false, visible: false, visibleSub: false}
  componentDidMount () {
    if (typeof window !== 'undefined') {
      setTimeout(() => this.setState({visible: true}), 100)
      setTimeout(() => this.setState({visibleSub: true}), 500)
    }
  }
  render () {
    const {onEnter, onLeave} = this.props
    return (
      <FullScreen style={{position: 'relative'}}>
        <Container wrap is='header' width={[1, 1, 1, 1]} mx={[3, 3, 'auto', 'auto']}>
          <Box w={1} style={{transform: 'translate(0, 0)'}}>
            <FadeInUp style={{display: 'inline-block'}} visible={this.state.visible}>
              <h1>
                The self-governing crypto index fund
              </h1>
            </FadeInUp>
            <FadeInUp style={{display: 'inline-block'}} visible={this.state.visibleSub}>
              <h3>
                  Echelon is the first autonomous cryptocurrency index fund. <br />
                  Securely invest in a basket of digital assets with fees below 2%.
              </h3>
            </FadeInUp>
          </Box>
          <Box w={1} style={{textAlign: 'right', transform: 'translate(0, 0)'}} p={2} ml={[2, 2, 2, '15%']} >
            <FadeIn visible={this.state.visible}>
              <CTA sticky={false} />
            </FadeIn>
            <Waypoint
              onEnter={onEnter}
              onLeave={onLeave}
            />
          </Box>
        </Container>
      </FullScreen>
    )
  }
}
