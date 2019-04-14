import Page from '../components/Page'
import { Component } from 'react'
import { Flex, Box } from 'grid-styled'
import { Button, FullHeight, Link, SlideContainer, FadeInUp, FadeIn, FadeInLeft, LoadingOverlay } from '../common/styled'
import Signature from '../components/loi/Signature'
import BasicInfoForm from '../components/loi/BasicInfoForm'
import MailingAddress from '../components/loi/MailingAddress'
import FormAmount from '../components/loi/FormAmount'
import AccessCode from '../components/loi/AccessCode'
import axios from 'axios'
import styled from 'styled-components'
import { BLUE, DARKEST, GREY_BLUE } from '../common/colors'
import Router from 'next/router'
import _ from 'lodash'

const StepTitle = styled.h3`
  margin: 0;
  cursor: initial;
  font-size: 16px;
  margin-top: ${({completed}) => completed ? '10px' : '0'};
  ${({completed}) => completed && `&:hover {
    color: ${BLUE};
    cursor: pointer;
  }
  `}
  color: ${({active}) => active ? 'white' : GREY_BLUE};
  opacity: ${({completed}) => completed ? '1' : '0.3'};
  transition: all 0.1s ease-in;
  span {
    font-size: 20px;
  }
`

const Agreement = ({nextStep, visible}) => (
  <FadeInUp visible={visible} style={!visible ? {display: 'none'} : {}}>
    <SlideContainer>

      <h1>Echelon Fund Signup Form</h1>
      <p>
      Echelon Black will be open for investment in <b>Spring 2018</b>.
      We are accepting applications from priority investors who wish
      to become part of the fund's first cohort. The following sections
       will guide you through the process of submitting a letter of intent to join Echelon Fund.
       Before we begin, make sure you've read and understood <Link target='_blank' href='/prospectus'>our prospectus</Link> so that you can make an informed decision.
       Ready to get started?
    </p>
      <Flex mt={3} column justify='center' align='flex-end'>
        <Button onClick={() => nextStep({})}>
        Understood. I'm ready to complete my application. <i className='ion-arrow-right-c' />
        </Button>
        <Link style={{marginRight: '1em'}} href='/'> Maybe Later. </Link>
      </Flex>
    </SlideContainer>
  </FadeInUp>
)

const ThankYou = ({nextStep, visible, error}) => (
  <SlideContainer style={{display: !visible ? 'none' : 'block', textAlign: 'center'}}>
    {error ? <h1>Something went wrong!</h1> : <h1> You've successfully joined<br /> the early Echelon fund Cohort</h1>}
    <p>
      {error ? error.toString() : `We've emailed you the next steps.`}
    </p>
    <Link href='/'> Go back to the homepage.</Link>
  </SlideContainer>
)

const SubmittingForm = ({visible}) => (
  <SlideContainer style={!visible ? {display: 'none'} : {}}>
    <LoadingOverlay loading>
      <i className={'ion-load-c'} />
      <h1>Submitting Form...</h1>
    </LoadingOverlay>
  </SlideContainer>
)

export default class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      accessCode: null,
      step: 0,
      completed: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    const { query } = nextProps.url
    if (this.state.step !== parseInt(query.step)) {
      this.setState({step: parseInt(query.step)})
    }
  }

  nextStep = (data = {}) => {
    console.log('NEXT STEP')
    Router.push(`/join-the-fund?step=${this.state.step + 1}`)
    this.setState({...data, step: this.state.step + 1, completed: this.state.step + 1}, () => {
      if (this.state.step === 6) {
        this.submitForm()
      }
    })
  }

  goToStep = (step) => {
    Router.push(`/join-the-fund?step=${step}`)
    this.setState({step: step, completed: step})
  }
  submitForm = (data) => {
    axios.post('/loi-info', {
      launchCode: this.state.accessCode,
      date: (new Date()).toDateString().substring(3),
      epoch: new Date(),
      name: this.state.first + ' ' + this.state.last,
      investment: this.state.investment,
      email: this.state.email,
      signature: this.state.signature,
      addressLine1: this.state.address,
      addressLine2: `${this.state.city}, ${this.state.state}  ${this.state.zip}`,
      addressLine3: this.state.country
    })
    .then((response) => {
      setTimeout(() => {
        this.nextStep()
      }, 1500)
    })
    .catch((error) => {
      this.nextStep({error: error})
      console.error(error)
    })
  }

  render () {
    return (
      <Page title='Echelon Fund' rings={false}>
        <FullHeight column align='center' justify='center'>

          <AccessCode
            nextStep={this.state.step === 0 ? this.nextStep : _.noop}
            visible={this.state.step === 0}
          />
          <Agreement
            nextStep={this.state.step === 1 ? this.nextStep : _.noop}
            visible={this.state.step === 1}
          />

          <FormViewer
            visible={this.state.step > 1 && this.state.step < 6}
            step={this.state.step - 2}
            completed={this.state.completed - 2}
            goToStep={(step) => this.goToStep(step + 2)}
            nextStep={this.nextStep}
            stepTitles={[
              'Personal Information',
              'Investment Amount',
              'Mailing Address',
              'Confirmation'
            ]}
            steps={[
              BasicInfoForm,
              FormAmount,
              MailingAddress,
              Signature
            ]}
          />
          <SubmittingForm visible={this.state.step === 6} />
          <ThankYou visible={this.state.step === 7} error={this.state.error} />
        </FullHeight>

      </Page>
    )
  }
}

class FormViewer extends Component {
  constructor (props) {
    super(props)
    this.state = {current: props.step, data: {}}
  }

  componentDidUpdate (props) {
    if (this.state.current !== props.step) {
      setTimeout(() => this.setState({current: props.step}), 200)
    }
  }
  nextStep = (data) => {
    this.setState({data: {...this.state.data, ...data}}) // cached
    this.props.nextStep(data)
  }
  render () {
    return <FadeIn visible={this.props.visible} style={!this.props.visible ? {display: 'none'} : {}}>
      {
        this.props.steps.map((Component, i) => (
          <div key={i}>
            <StepTitle
              onClick={() => this.props.completed >= i ? this.props.goToStep(i) : null}
              completed={this.props.completed >= i}
              active={this.props.step === i}
            >
              <span>{i + 1}.</span> {this.props.stepTitles[i]}
            </StepTitle>
            <FadeInLeft
              visible={this.props.step === i}
              style={this.props.step !== i ? {display: 'none'} : {}}
            >
              <Component
                data={this.state.data}
                nextStep={this.props.step === i ? this.nextStep : _.noop}
              />
            </FadeInLeft>
          </div>
          )
        )
      }
    </FadeIn>
  }
}
