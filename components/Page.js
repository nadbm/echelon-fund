import Footer from './Footer'
import {DARKEST, BLUE} from '../common/colors'

import Head from 'next/head'
import Router from 'next/router'
import styled from 'styled-components'
import {Flex, Box} from 'grid-styled'
import ParallaxRings from '../common/ParallaxRings'

const Logo = styled.div`
  background: url(/static/${({light}) => light ? 'logo-dark' : 'logo-light'}.svg) no-repeat;
  width: 205px;
  height: 50px;
`
const Title = styled.div`
  font-size: 2em;
  line-height: 30px;
  text-decoration: none;
  color: inherit;
  font-family: Raleway;
  &:hover{
    cursor: pointer;
  }
  z-index: 200;
`

const div = styled.div`
  width: 100%;
  position: absolute;
  top: 3em;
  color: ${({light}) => light ? '#333' : 'white'};
`

const Header = ({light}) => {
  return (
    <div>
      <Title light={light} href={'/'}><Logo light={light} onClick={() => { Router.push('/') }} /></Title>
    </div>
  )
}

/* A component with all common parent components. Intended to wrap any
 * page in the site.
 */
const Page = ({light = false, rings = true, title, children}) => (
  <div style={{position: 'relative'}}>
    <Head>
      <title>{title}</title>
      <style>
        {`
            body { 
              background: ${light ? 'white' : DARKEST};
              color: ${light ? DARKEST : 'white'};
            }
        `}
      </style>
    </Head>
    { rings ? <ParallaxRings /> : null }
    {children}
    <Flex id={'top'} style={{position: 'absolute', top: '1em', width: '100%'}}>
      <Box style={{maxWidth: '960px'}} mx={[3, 3, 'auto', 'auto']} mt={3} w={1} p={[0, 0, 1, 1]} ><Header light={light} /></Box>
    </Flex>
    <Footer light={light} />
  </div>
)

export default Page
