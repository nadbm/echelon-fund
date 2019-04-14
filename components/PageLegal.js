import Page from './Page'
import {Box} from 'grid-styled'
import {BLUE, DARK_BLUE} from '../common/colors'
import {PageContainer} from '../common/styled'
import styled from 'styled-components'
const ContainerLegal = styled(PageContainer)`
  p {
    color: #666;
  }
  h1, h2 {
    color: ${DARK_BLUE}
  }
  h1 {
    font-weight: 700;
    font-size: 3.5em;
    margin-bottom: 0.5em;
  }
  h2 {
    margin-bottom: 0;
    margin-top: 1.5em;
  }
`

const PageLegal = (props) => (
  <Page light rings={false} title={`Echelon Fund — ${props.title}`}>
    <hr style={{opacity: 0}} />
    <ContainerLegal wrap>
      <Box w={1} p={[3, 3, 1, 1]}>
        <h1>{props.title}</h1>
        {props.children}
      </Box>
    </ContainerLegal>
  </Page>
)

export default PageLegal
