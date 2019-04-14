import { Flex, Box } from 'grid-styled'
import { Component } from 'react'
import { Button, SlideContainer, FadeIn, StyledForm, Link, SubscribeFormStyle, LoadingOverlay } from '../../common/styled'
import { BLUE, DARK_BLUE } from '../../common/colors'
import SubscribeFrom from 'react-mailchimp-subscribe'
import styled from 'styled-components'
import axios from 'axios'

const Error = styled.div`
  min-height: 12px;
  color: orangered;
  font-weight: bold;
`
const formProps = {
  action: '//fund.us16.list-manage.com/subscribe/post?u=896b47bf97075ae814609fd2a&amp;id=e29746b551',
  messages: {
    inputPlaceholder: 'Email',
    btnLabel: 'Subscribe',
    sending: 'Sending',
    success: 'Thank you for your interest!',
    error: 'Something went wrong, try another email'
  },
  styles: {
    sending: {
      fontSize: 14,
      color: 'auto'
    },
    success: {
      fontSize: 14,
      color: BLUE
    },
    error: {
      fontSize: 14,
      color: 'lightcoral'
    }
  }
}

const PassCodeInput = styled.input`
  font-size: 5em;
  width: 1em;
  border: 0;
  border-bottom: 4px solid rgba(26,129,210,0.5);
  margin: 0px 10px;
  background: none;
  outline: 0;
  caret-color: white;
  color: #CCC;
  text-align: center;
  text-transform: uppercase;
  &:focus {
    border-bottom: 4px solid rgba(26,129,210,1);
    transition: 0.5s ease-in;
  }
`

class PinInput extends Component {
  constructor (props) {
    super(props)
    this.charInput = Array(props.inputLength).fill(null)
    this.state = {
      characters: Array(props.inputLength).fill('')
    }
  }
  updateValue = (e, j) => {
    const characters = this.state.characters.map((value, i) => i === j ? e.target.value.toUpperCase() : value)
    this.setState({characters})
    this.props.onChange(characters.join(''))
  }

  moveForward = (current) => {
    if (this.charInput[current + 1] !== undefined) {
      this.charInput[current + 1].focus()
    }
  }

  moveBackward = (current) => {
    if (this.charInput[current - 1] !== undefined) {
      this.charInput[current - 1].focus()
    }
  }

  onKeyDown = (e, current) => {
    console.log(e.keyCode)
    if (e.keyCode === 37) {
      this.moveBackward(current) // left button
    } else if (e.key.length === 1 && e.target.selectionStart === 1) { // alphanumeric
      this.moveForward(current)
    } else if (e.keyCode === 8) {
      if (this.state.characters[current] === '' || e.target.selectionStart === 0) {
        this.moveBackward(current)
      }
    } else if (e.keyCode === 39 || this.state.characters[current] !== '') {
      this.moveForward(current)
    }
  }
  onPaste = (e, i) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text/plain').split('')
    const characters = this.state.characters
    pasted.forEach((char, j) => {
      if (characters[j + i] !== undefined) {
        characters[j + i] = char.toUpperCase()
      }
    })
    this.charInput[pasted.length + i]
    ? this.charInput[pasted.length + i].focus()
    : this.charInput[this.charInput.length - 1].focus()
    this.setState({characters})
    this.props.onChange(characters.join(''))
  }

  render () {
    return (
      <div>
        {
        this.state.characters.map((character, i) => (
          <PassCodeInput
            key={i}
            style={this.props.error ? {borderBottomColor: 'lightcoral'} : {}}
            innerRef={(r) => { this.charInput[i] = r }}
            value={character}
            onClick={(e) => { this.charInput[i].focus(); this.charInput[i].select() }}
            onKeyDown={(e) => this.onKeyDown(e, i)}
            maxLength={1}
            onPaste={(e) => this.onPaste(e, i)}
            onChange={(e) => this.updateValue(e, i)}
          />
        ))
      }

      </div>
    )
  }
}

export default class AccessCode extends Component {
  state={accessCode: '', newsletter: false, error: null, animateNextStep: false}
  submitCode = (e) => {
    e.preventDefault()
    this.setState({loading: true})
    axios.post('/verify-launch-code', {
      launchCode: this.state.accessCode
    })
    .then((response) => {
      setTimeout(() => {
        this.setState({error: null, loading: false, animateNextStep: true})
        setTimeout(() => this.props.nextStep({accessCode: this.state.accessCode}), 2500)
      }, 1000)
    })
    .catch((error) => {
      setTimeout(() => {
        this.setState({error: 'Invalid Access Code', loading: false})
      }, 1000)
    })
  }
  render () {
    return (
      <div style={{background: 'none', color: 'white', textAlign: 'center', width: '500px', display: !this.props.visible ? 'none' : 'initial'}}>

        <Flex mt={1} column justify='center' align='center' style={{transform: 'translate(0,0,0)'}}>
          <FadeIn visible={!this.state.animateNextStep && !this.state.newsletter}>
            <h1>Welcome to Echelon</h1>
            <p>
              Echelon Black will be open for investment in <b>Spring 2018</b>.
              We're accepting early-investors on an invite only basis.
            </p>
            <h4>Enter Your Access Code</h4>
            <form onSubmit={(e) => { e.preventDefault(); this.submitCode(e) }}>
              <PinInput error={this.state.error !== null} inputLength={6} onChange={(value) => { this.setState({accessCode: value}) }} />
              <br />
              <Error>{this.state.error}</Error>
              <Button type='submit' disabled={this.state.loading} >
                Validate Access Code <i className={this.state.loading ? 'ion-load-c loading' : 'ion-arrow-right-c '} />
              </Button>

            </form>
            <Flex mt={2} column>
              <p>
                Don't have a code ? <Link onClick={() => this.setState({newsletter: true})}> Subscribe to our mailing list to stay informed.</Link>
              </p>
            </Flex>
          </FadeIn>
          <FadeIn visible={this.state.newsletter}>
            <SubscribeFormStyle>
              <h1> Subscribe to our newsletter </h1>
              <SubscribeFrom {...formProps} />
            </SubscribeFormStyle>
          </FadeIn>
          <FadeIn visible={this.state.animateNextStep}>
            <LoadingOverlay loading>
              <i className={'ion-load-c'} />
              <h1>
                Thank you for entering your code. <br />
                We are redirecting you through the portal.
              </h1>
            </LoadingOverlay>

          </FadeIn>

          <Box />
        </Flex>

      </div>
    )
  }
}
