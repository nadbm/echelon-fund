import React from 'react'

import Page from '../components/Page'
import { ContainerSub } from '../common/styled'


export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nameFirst  : '',
      nameMiddle : '',
      nameLast   : '',
      launchCode : '',
      filled     : false,
      signed     : false,
      verified   : false,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(ev) {
    const target = ev.target
    const value = target.value
    const name = target.name
    console.log(`Handle: ${name} -> ${value}`)
    this.setState({
      [name]: value
    })
  }

  handleSubmit(ev) {
    ev.preventDefault()
    const body = JSON.stringify({
      nameFirst  : this.state.nameFirst,
      nameMiddle : this.state.nameMiddle,
      nameLast   : this.state.nameLast,
      launchCode : this.state.launchCode,
    })
    console.log('[ FORM ] handleSubmit: ' +body)
    fetch('/loi-info', {
      method: 'POST',
      body: body
    }).then((res) => {
      return res.json()
    }).then((json) => {
      console.log('JSON: ', json)
      this.setState({
        filled: true
      })
    }).catch((err) => {
      console.log('Error: ', err)
    })
  }

  handleVerify(ev) {
    ev.preventDefault()
    const body = JSON.stringify({
      launchCode : this.state.launchCode
    })
    console.log('[ FORM ] handleVerify: ' +body)
    fetch('/verify-launch-code', {
      method: 'POST',
      body: body
    }).then((res) => {
      return res.json()
    }).then((json) => {
      console.log('JSON: ', json)
      if (json.ok) {
        this.setState({
          verified: true
        })
      }
    }).catch((err) => {
      console.log('Error: ', err)
    })
  }

  render() {
    return (
      <Page title="Echelon Fund — Start Investing">
        <ContainerSub>
          <br />
          <br />
          <br />
          <br />
          <h1>Investor Information</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label>
              First Name:
              <br />
              <input
                type="text"
                value={this.state.nameFirst}
                onChange={this.handleInputChange}
                name="nameFirst" />
            </label>
            <br /><br />
            <label>
              Middle Initial:
              <br />
              <input
                type="text"
                value={this.state.nameMiddle}
                onChange={this.handleInputChange}
                name="nameMiddle" />
            </label>
            <br /><br />
            <label>
              Family Name:
              <br />
              <input
                type="text"
                value={this.state.nameLast}
                onChange={this.handleInputChange}
                name="nameLast" />
            </label>
            <br /><br />
            <label>
              Launch code:
              <br />
              <input
                type="text"
                value={this.state.launchCode}
                onChange={this.handleInputChange}
                name="launchCode" />
            </label>
            <br /><br />
            <button type="submit">
              Submit
            </button>
            <button onClick={this.handleVerify.bind(this)}>
              Verify --
              ({this.state.verified ? 'Verified' : 'Not Verified'})
            </button>
          </form>
          <div>
            <h2>
              {this.state.filled ? 'filled' : undefined}
            </h2>
            <h2>
              {this.state.signed ? 'SIGNED' : 'NO SIG'}
            </h2>
          </div>
        </ContainerSub>
      </Page>
    )
  }
}
