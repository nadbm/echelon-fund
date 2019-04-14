import React from 'react'

import Page from '../components/Page'
import { FullHeight, StyledForm, Button } from '../common/styled'

import axios from 'axios'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      launchCode: '',
      secret: '',
      error: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (ev) {
    const target = ev.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  handleSubmit (ev) {
    ev.preventDefault()
    axios.post('/launch-codes', {
      launchCode: this.state.launchCode,
      secret: this.state.secret
    })
    .then(({data}) => {
      this.setState({genLaunchCode: data.genLaunchCode, completed: true})
    })
    .catch((error) => {
      this.setState({error: error})
    })
  }

  render () {
    return (
      <Page title='Echelon Fund'>
        <FullHeight justify='center' column align='center'>
          {
            !this.state.completed
              ? <StyledForm>
                <form onSubmit={this.handleSubmit.bind(this)}>

                  <label>Code:</label>
                  <input
                    type='text'
                    value={this.state.launchCode}
                    onChange={this.handleInputChange}
                    name='launchCode' />
                  <label>Secret:</label>

                  <input
                    type='password'
                    value={this.state.secret}
                    onChange={this.handleInputChange}
                    name='secret' />

                  <Button type='submit' primary> Submit </Button>
                  <span style={{color: 'coralred'}}>{this.state.error.toString()}</span>
                </form>
              </StyledForm>
              : <div style={{textAlign: 'center'}}>
                <p style={{fontSize: '2em', margin: '10px', color: 'white'}}>
                  Generated Code: <b>{this.state.genLaunchCode}</b>
                </p>
                <Button type='submit' onClick={() => { this.setState({completed: false}) }}>
                  Generate New Code
                </Button>
              </div>
            }

        </FullHeight>
      </Page>
    )
  }
}
