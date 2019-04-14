import {Box, Flex} from 'grid-styled'
import {FullHeight} from '../../common/styled'
import styled, { keyframes } from 'styled-components'
import {GREY_BLUE} from '../../common/colors'
import StickyDiv from '../../common/StickyDiv'

Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max)
}

const StoryParagraph = styled.h2`
  font-weight: 100;
  color: ${GREY_BLUE};
  opacity: ${({visible, highlight}) => highlight ? 1 : (visible ? 0.2 : 0)};
  transition: opacity 0.5s ease-in;
`
const Header = styled.h1`
  margin-bottom: 2em;
`

const SVGWave = ({scrolled, width}) => (
  <svg width='100%' style={{position: 'absolute', bottom: '0vh', opacity: width < 500 ? '0.2' : '1'}} viewBox='0 100 1640 812' version='1.1' >
    <defs>
      <linearGradient x1='9.40449848%' y1='82.7735092%' x2='93.0352524%' y2='82.7735066%' id='linearGradient-1'>
        <stop stopColor='#4ACBF2' offset='0%' />
        <stop stopColor='#E124D2' offset='100%' />
      </linearGradient>
    </defs>
    <g style={{transition: 'none'}} id='Page-1' strokeDasharray={1940} strokeDashoffset={(scrolled * 1940).clamp(0, 1940)} stroke='none' strokeWidth='5' fill='none' fillRule='evenodd' opacity='0.747622283'>
      <path d={`
            M-57,892.801343 C115.647687,772.44324 393.123102,712.264188 775.426246,712.264188 C1348.88096,712.264188 1528.98544,614.046306 1649.5921,352`}
        id='Path-2' stroke='url(#linearGradient-1)' strokeWidth={width < 500 ? '15' : '8'} />
    </g>
  </svg>
)

const Introduction = ({scrolled}) => (
  <div style={{position: 'relative', overflow: 'hidden'}}>
    <SVGWave scrolled={1 - (scrolled - 50) / 300} width={'100vw'} />
    <FullHeight wrap>
      <Box w={1} />
      <Box w={[1, 1, 1, 1]} style={{maxWidth: '700px', margin: 'auto'}}>
        <Flex wrap>
          <Box w={1} pl={[2, 2, 0, 0]} >
            <Header>The Rise of Crypto</Header>
            <StoryParagraph visible={scrolled > 40} highlight={scrolled > 100 && scrolled < 200}>
                On the 31st of October 2008, the peer-to-peer electronic cash system, Bitcoin, was quietly released to the world. Since then, it has steadily migrated into mainstream along with hundreds of other so-called <i>digital assets</i>. However, today only the most tech-savvy investors can access the whole market.
             </StoryParagraph>
            <StoryParagraph visible={scrolled > 40} highlight={scrolled > 200}>
                Echelon uses artificial intelligence to automatically index the cryptocurrency market and invest in a resilient portfolio of the top digital assets. Investors can enter Echelon through traditional means and easily track their investment in the fund. Echelon reduces the complexity and security risks inherent in cryptocurrency investing, while charging the lowest fees in the industry.

              </StoryParagraph>
          </Box>
        </Flex>

      </Box>

      <Box w={1 / 2} />
    </FullHeight>
  </div>
)

export default () => (
  <StickyDiv
    outerHeight={3}
    breakPoint={1 / 4}
    child={Introduction}
    parallaxElements={
          (scrolled) => scrolled < 300 ? [
            <h1 key={1} style={{
              fontSize: '13em',
              position: 'absolute',
              top: '70vh',
              opacity: 0.1,
              left: '2vw',
              transform: `translateY(${(-scrolled).toFixed(1)}px)`
            }}>
              2008
            </h1>,
            <h1 key={2} style={{
              fontSize: '13em',
              position: 'absolute',
              opacity: 0.1,
              top: '160vh',
              left: '2vw',
              transform: `translateY(${(-scrolled).toFixed(1)}px)`}}>
              2017
            </h1>
          ] : null
        }
  />
)
