import {Flex, Box} from 'grid-styled'
import {BLUE} from '../common/colors'
import styled from 'styled-components'
import {Link} from '../common/styled'

const Footer = styled.footer`
  background: whitesmoke;
  color: #333;
  padding-bottom: 2em;
  padding-top: 3em;
  margin-top: 7em;
  a {
    color: ${BLUE};
    text-decoration: none;
  }
  ul {
    list-style: none;

    padding-left: 0;
    li {
      display: inline-block;
      margin-left: 1em;
    }
  }
  h4 {
    margin: 0;
  }
`
export default () => (
  <Footer>
    <Flex wrap style={{maxWidth: '1200px', margin: 'auto'}}>
      <Box w={[1, 1, 1 / 2, 3 / 4]} >
        <ul>
          <li><Link href={'/'}>Home</Link></li>
          <li><Link href={'/privacy-policy'}>Privacy Policy</Link></li>
          <li><Link href={'/terms-of-service'}>Terms of Service</Link></li>
        </ul>
      </Box>
      <Box w={[1, 1, 1 / 2, 1 / 4]} ml={[1, 1, 0, 0]} >
        <ul>
          <li><h4>© 2017 Echelon. All rights reserved.</h4></li>
          <li><Link href={'#top'}>Back To Top</Link></li>
        </ul>
      </Box>
    </Flex>
  </Footer>

)
