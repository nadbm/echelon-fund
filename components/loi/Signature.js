import SignaturePad from 'signature_pad'
import {Component} from 'react'
import { Flex, Box } from 'grid-styled'
import { ButtonSimple, Button, SlideContainer, FadeIn, LoadingOverlay} from '../../common/styled'
import { BLUE, GREY_BLUE, LESS_DARK } from '../../common/colors'
import _ from 'lodash'
import styled from 'styled-components'

const Paragraph = styled.p`
  transition: all 0.5s ease;
  text-align: left;
  vertical-align: bottom;
  line-height: 1.9em;
  span {
    min-width: 100px;
    vertical-align: bottom;
    display: inline-block;
    color: ${BLUE};
    padding: 0px 0px;
    border-bottom: 2px solid ${BLUE};
    text-align: center;
    margin: 0px 20px;
  }
`
const AgreementContainer = styled.div`
  font-size: 14px;
  overflow-y: scroll;
  height: 200px;
  border: 1px solid #222;
  word-wrap: break-word; 
  white-space: pre-wrap;
  width: 100%;
  color: #ccc;
  padding: 30px 10px;
  border-radius: 3px;
  margin-bottom: 10px;
  span {
    color: #eef7ff;
    border-bottom: 1px solid #fff;
    font-weight: bold;
  }
  background-color: rgba(255, 255, 255, 0.25);
`
const SignatureBox = styled.div`
  background: rgba(255,255,255, 0.1);
  width: 200px;
  height: 50px;
`
export default class Confirmation extends Component {
  state = {empty: true, loading: false, sign: false}

  sign = (base64SVG = null) => {
    if (base64SVG !== null) {
      const parts = base64SVG.split(',')
      const pathsEncoded = _.drop(parts, 1).join('')
      const svgBody = atob(pathsEncoded)
      this.props.nextStep({signature: svgBody})
    } else {
      this.setState({sign: false})
    }
  }
  render () {
    return (
      <Flex column justify='center' style={{maxWidth: '760px'}}>
        <Signature
          visible={this.state.sign}
          onClose={this.sign}
        />
        <Box w={1}>

          <Flex row>
            <LOIData {...this.props.data} />
          </Flex>
          <Flex row justify='flex-end' align='right'>
            <Button onClick={() => this.setState({sign: !this.state.sign})}>Confirm and Sign <i className='ion-arrow-right-c' /></Button>
          </Flex>
        </Box>
      </Flex>
    )
  }
}

class Signature extends Component {
  state = {empty: true}

  componentDidMount () {
    this.signature = new SignaturePad(this.canvas, {
      onBegin: () => { this.setState({empty: false}) }
    })
  }

  render () {
    return (
      <Flex
        column
        align='center'
        justify='center'
        style={{
          display: this.props.visible ? 'flex' : 'none',
          background: 'rgba(0, 14, 33, 0.61)',
          zIndex: 999,
          position: 'absolute',
          height: '100%',
          width: '100%'
        }}>
        <Flex column align='center' justify='center'>
          <canvas
            width={500} height={200} style={{border: '1px solid #CCC', background: 'rgb(255,255,255)'}}
            ref={(r) => this.canvas = r}
          />
          <Flex row align='center' justify='space-around'>

            <ButtonSimple
              onClick={() => {
                this.setState({empty: true})
                this.signature.clear()
                this.props.onClose()
              }
            }>
              Cancel <i className='ion-close' />
            </ButtonSimple>
            <ButtonSimple
              disabled={this.state.empty}
              onClick={() => {
                !this.state.empty && this.props.onClose(this.signature.toDataURL('image/svg+xml'))
              }}>
              Sign <i className='ion-checkmark' />
            </ButtonSimple>
          </Flex>
        </Flex>
      </Flex>
    )
  }
}

const LOIData = ({first, last, investment, address, country, state, zip}) => (
  <AgreementContainer>

    <p>Date {(new Date()).toLocaleDateString('en-US')}</p>
    <br />
    <p>Echelon Fund, I, <span>{first}</span> <span>{last}</span>, am submitting this Letter o fIntent to reserve
    my place to purchase shares in the Echelon Digital Asset Index  Fund. I have read
    and understand the Letter of Intent, the Prospectus of the Fund, and the Terms of Service.</p>

    <p>Under the terms of the Prospectus, I intend to purchase, within eight (8) months from the date of this letter,
    shares of the Echelon Digital Assets Funds. The total amount of my purchases will equal an
    aggregate amount not less than: <span>{investment}</span></p>

    <p>
      USD dollars and held directly with Echelon Digital Asset Fund on May 01, 2017, subject to the conditions below.
      I am making a commitment to purchase shares, and if my purchase of shares within thirteen (13) months
      from the date of my first purchase, when added to my present holdings,
      do not aggregate the minimum amount specified above, I will pay the additional amount
      of sales charge prescribed in the Terms of Service from Echelon Digital Asset Fund,
      as those terms may be amended from time to time in the Prospectus and Terms of Service.
    </p>

    <p>
      In determining the total amount of purchases made hereunder, shares redeemed prior to termination of this Letter will be deducted. It shall be mind and my dealers responsibility to refer
      to this Letter of Intent in placing any future purchases orders for me while this Letter is in effect.
    </p>

    <p>
      In addition, all purchases under this Letter must be placed through Echelon Funds, Inc
      or a official delegated broker–dealers.
    </p>

    <p>
      The basic terms are as follows:
    </p>

    <p>1. I agrees to purchase shares in Echelon’s Digital Asset Index Fund on the date outlined in  the Formal Agreement.</p>

    <p>2. Upon execution of this Letter of Intent, Echelon will present the Formal Agreement for my review.</p>

    <p>3. This Letter of Intent does not create a binding contract and will not be enforceable. Only the Formal Agreement, duly executed and delivered by Echelon Fund and myself, will be enforceable, and it will supersede the provisions of this Letter of Intent and all other agreements and understandings between myself and Echelon with respect to the subject matter of this Letter of Intent.</p>

    <p>4. Acceptance: If you are agreeable to the foregoing terms, please sign and return a this copy of this Letter of Intent during the online submission.</p>

    <p>5. The terms are not comprehensive and I expect that additional terms, including reasonable warranties and representations, will be incorporated into a formal agreement (the "FormalAgreement”).</p>

    <p>
      From, <br />
      <span>{first}</span> <span>{last}</span> <br />
      <span>{address}</span> <br />
      <span>{state}</span> <span>{zip}</span> <br />
      <span>{country}</span>
    </p>
  </AgreementContainer>
)
