import { Flex } from 'grid-styled'
import {Button, SlideContainer} from '../../common/styled'

const InvestorType = ({nextStep}) => (
  <SlideContainer>
    <h2>
      What kind of investor are you?
    </h2>
    <Flex mt={3} row justify='center' align='flex-end'>

      <Button onClick={() => nextStep({investor: 'individual'})}>
        Individual <i className='ion-arrow-right-c' />
      </Button>
      <Button onClick={() => nextStep({investor: 'advisor'})}>
        Advisor <i className='ion-arrow-right-c' />
      </Button>
    </Flex>
  </SlideContainer>
)
export default InvestorType
