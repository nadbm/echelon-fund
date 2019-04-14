import { Button } from '../../common/styled'
import Router from 'next/router'

const CTA = ({sticky, visible, style}) => (
  <Button primary
    style={style || {}}
    sticky={sticky}
    visible={visible}
    onClick={() => {
      window.mixpanel.track(`Click ${sticky ? 'sticky' : 'top'} CTA`)
      Router.push(`/join-the-fund`)
    }}>
    Express Interest <i className='ion-arrow-right-c' />
  </Button>
)

export default CTA
