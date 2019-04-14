import React from 'react'
import styled from 'styled-components'
import { Box, Flex } from 'grid-styled'
import {FullHeight, CircleListContent, FadeInStack, FadeInUp, SubHeader} from '../../common/styled'
import media from 'styled-media-query'

const Header = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 100;
  margin: 0;
`
const CircleListContentPad = styled(CircleListContent)`
  margin-bottom: 1em;
`
const IsomentricStack = ({fromColor, toColor, order}) => {
  const Styled = styled.div`
    background: linear-gradient(120deg, ${fromColor}, ${toColor});
    width: 200px;
    height: 200px;
    ${media.lessThan('medium')`
      width: 150px;
      height: 150px;
      margin-bottom: -190px;
    `}
    border-radius: 24px;
    opacity: 0.9;
    margin: 0 auto 0 auto;
    margin-bottom: -280px;
    border-bottom: 7px solid rgba(0, 0, 0, 0.3);
    border-left: 7px solid rgba(0, 0, 0, 0.3);
    box-shadow: -5px 5px 50px rgba(0, 0, 0, 0.3);
    transform: rotateX(60deg) rotateY(0deg) rotateZ(-45deg) translateZ(${order}px) scale(1.2);
    transform-style: preserve-3d;
  `
  return <Styled />
}

const StackFlex = styled(Flex)`
  flex-direction: column;
  justify: center;
  height: 100%;
  ${media.lessThan('medium')`
    flex-direction: column-reverse; 
  `}

`
const Security = ({scrolled, isMobile}) => {
  const section = ((scrolled - 50) / 20).toFixed(0)

  return (
    <FullHeight direction='column' justify='center' width={[ 1, 2 / 3, 1 / 2 ]} style={{margin: '0 auto'}}>
      <SubHeader width={1}>  Uncompromising  Security</SubHeader>
      <Flex wrap>
        <Flex w={[1, 1, 1 / 2, 1 / 2]} align={'bottom'} pt={[0, 0, 300, 300]} pb={[150, 150, 0, 0]} justify='center' style={{transform: 'translateZ(-1px)'}}>
          <Box w={1} mt={[40, 40, 0, 0]} style={{height: '100px'}}>
            <FadeInStack style={{display: 'block'}} visible={section > 0}><IsomentricStack fromColor='#3023AE' toColor='#C86DD7' order={-40} /></FadeInStack>
            <FadeInStack style={{display: 'block'}} visible={section > 1}><IsomentricStack fromColor='#5B7EB8' toColor='#864FB0' order={-30} /></FadeInStack>
            <FadeInStack style={{display: 'block'}} visible={section > 2}><IsomentricStack fromColor='#3EA0C0' toColor='#5685BA' order={-10} /></FadeInStack>
          </Box>
        </Flex>
        <Box w={[1, 1, 1 / 2, 1 / 2]} pt={[0, 0, 100, 100]} pr={[2, 2, 0, 0]} flex='1 1 auto' style={{zIndex: 1}}>
          <StackFlex>
            <FadeInStack visible={section > 2}>
              <CircleListContentPad>
                <h2> A Higher Bar </h2>
                <h3>
                  We meet and exceed all industry standards for security. PCI DSS
                  requirements for credit card information, GLBA, SOX/J-SOX, NCUA,
                  and all data privacy and data residency laws.
              </h3>
              </CircleListContentPad>
            </FadeInStack>
            <FadeInStack visible={section > 1}>
              <CircleListContentPad>
                <h2> Hardened Software </h2>
                <h3>
                  Our software systems offer best-in-class performance, reliability, and
                  security. Regular audits of our systems are conducted by the world's top
                  security researchers to guarantee the safety of your deposits.
                </h3>
              </CircleListContentPad>
            </FadeInStack>
            <FadeInStack visible={section > 0}>
              <CircleListContentPad>
                <h2> Bare-Metal Protection </h2>
                <h3>
                  We use specialized hardware with military-grade encryption to protect
                  all our data. Our systems are geographically distributed with no central
                  points of attack for maximum resiliency.
                </h3>
              </CircleListContentPad>
            </FadeInStack>
          </StackFlex>
        </Box>
      </Flex>

    </FullHeight>
  )
}
export default Security
