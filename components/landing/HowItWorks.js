import React, {Component} from 'react'
import styled, { keyframes } from 'styled-components'
import {fadeIn} from 'react-animations'
import {DARKEST, LESS_DARK, BLUE} from '../../common/colors'
import TrackDocument from '../../common/TrackDocument'
import {Flex, Box} from 'grid-styled'
import {FullHeight, SubHeader, FadeInUp, ListContent, Button} from '../../common/styled'

const RespFade = ({visible, children}) => {
  return (
    <FadeInUp visible={visible} style={{maxWidth: '600px', display: 'block'}} pt={[1, 1, 3, 3]}>
      {children}
    </FadeInUp>
  )
}

const BackgroundCircle = styled.div`
  width: 50vh;
  height: 50vh;
  border: 1em solid ${BLUE};
  border-radius: 50%;
  opacity: 0.05;
  position: absolute;
  margin-top: 50vh;
`
const SubNumber = styled.div`
  font-size: 4em;
  color: ${BLUE};
  display: inline-block;
  position: absolute;
  left: 0em;
`
const ListContentNumber = styled(ListContent)`
  padding-left: 5em;
`
export default class HowItWorks extends Component {
  render () {
    const scrolled = this.props.scrolled
    return (
      <FullHeight wrap>
        <TrackDocument>
          {
            (scrollY, height) => (<BackgroundCircle style={{top: `${(height - scrollY / 4).toFixed(1)}px`}} />)
          }
        </TrackDocument>
        <SubHeader width={1}> How it Works</SubHeader>
        <Box align='center' width={[0, 0, 0, 1 / 4]} />
        <Box align='center' width={[1, 1, 1, 3 / 4]} p={[2, 2, 0, 0]}>
          <RespFade visible={scrolled > 25} >
            <ListContentNumber>
              <SubNumber>1</SubNumber>
              <h2>Join</h2>
              <h3>
                Investors of Echelon are screened according to industry leading KYC and AML standards. After screening, investors receive credentials to access the Echelon platform.
              </h3>
            </ListContentNumber>
          </RespFade>
          <RespFade visible={scrolled > 50} >
            <ListContentNumber>
              <SubNumber>2</SubNumber>
              <h2>Purchase</h2>
              <h3>
                Echelon gives investors access to the cryptocurrency market through traditional means. This means Echelon will accept investments via SWIFT, ACH, as well as wire transfers.
              </h3>
            </ListContentNumber>
          </RespFade>
          <RespFade visible={scrolled > 60} >
            <ListContentNumber>
              <SubNumber>3</SubNumber>
              <h2>Track</h2>
              <h3>
                Echelon issues shares in a portfolio of digital assets aimed at tracking the performance of the cryptocurrency market. As shareholders of Echelon, investors have a stake in how the fund is managed and governed.
                </h3>
            </ListContentNumber>
          </RespFade>
          <RespFade visible={scrolled > 60} >
            <ListContentNumber>
              <SubNumber>4</SubNumber>
              <h2>Redeem</h2>
              <h3>
                Investors can redeem their shares instantly and deposit it into their verified bank account. Echelon applies state-of-the-art engineering to operate at a low cost and deliver more value to the investor.
                </h3>
            </ListContentNumber>
          </RespFade>
        </Box>
        <Box w={1} />
      </FullHeight>
    )
  }
}
