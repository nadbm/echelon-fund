import React, { Component } from 'react'
import styled from 'styled-components'
import { Box, Flex } from 'grid-styled'
import { FullHeight, FadeInUp } from '../../common/styled'
import Waypoint from 'react-waypoint'
import media from 'styled-media-query'
import { GREY_BLUE } from '../../common/colors'
import CTA from './CTA'

const SubHeader = styled.h3`
  margin:1em 0;
  letter-spacing: 0.03em;
  font-size: 1.5em;
  font-weight: 200;
  color: ${GREY_BLUE};
  ${media.lessThan('medium')`
    font-size: 1.5em;
  `}
`
const Header = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 100;
  margin: 0;
`

class Signup extends Component {
  state = {visible: false}
  render () {
    return (
      <FullHeight direction='column' justify='center' width={[ 1, 2 / 3, 1 / 2 ]} style={{margin: '0 auto'}}>
        <Waypoint
          onEnter={() => this.setState({visible: true})}
        />
        <FadeInUp visible={this.state.visible}>
          <Flex row align='center' justify='center'>
            <Box w={3 / 4} pt={[0, 0, 100, 100]} style={{textAlign: 'center'}}>
              <Header> Become an Echelon Investor </Header>
              <SubHeader>
                Echelon is scheduled to launch in Q2 2018. The fund is currently exclusive to US and Canada based accredited investors. 
              </SubHeader>

              <Waypoint
                onEnter={this.props.onEnter}
                onLeave={this.props.onLeave}
              />
              <CTA visible style={{fontSize: '1.2em', padding: '1.2em 3.6em', borderRadius: '2.5em', marginTop: '3em'}} />
            </Box>
          </Flex>
        </FadeInUp>

      </FullHeight>
    )
  }
}
export default Signup
