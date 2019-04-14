
import {Component} from 'react'
import styled, {keyframes} from 'styled-components'
import { Flex, Box } from 'grid-styled'
import {slideInDown} from 'react-animations'
import {ButtonSimple, SlideContainer, StyledForm, NextButton, FormParagraph} from '../../common/styled'
import yup from 'yup'
import _ from 'lodash'
import countries from './countries'
export default class MailingAddress extends Component {
  state = {
    model:
    {
      address: '',
      country: '',
      state: '',
      zip: '',
      city: ''
    },
    errors: {},
    valid: false
  }
  model = {
    address: yup.string().trim().required('Address is required'),
    city: yup.string().trim().required('City is required'),
    country: yup.string().trim().required('Country is required'),
    state: yup.string().trim().required('State is required'),
    zip: yup.string().trim()
  }
  modelSchema = yup.object(this.model)

  updatedState = (field, inputValue, error) => ({
    errors: {...this.state.errors, [field]: error},
    model: {...this.state.model, [field]: inputValue}
  })

  onChange = (e, field) => {
    const value = e.target.value
    this.model[field]
      .validate(value)
      .then(() => {
        this.setState(this.updatedState(field, value, null))
      })
      .catch(({errors}) => {
        this.setState(this.updatedState(field, value, errors[0]))
      })

    this.modelSchema
    .isValid({...this.state.model, [field]: value})
    .then((valid) => { this.setState({valid}) })
    .catch((valid) => { this.setState({valid}) })
  }

  next = (e) => {
    e.preventDefault()
    if (this.state.valid) {
      this.props.nextStep(this.state.model)
    } else {
      console.log('validating all')
      _.each(this.state.model, (value, field) => {
        this.model[field]
        .validate(value)
        .then(() => {})
        .catch(({errors}) => {
          this.setState(this.updatedState(field, value, errors[0]))
        })
      })
    }
  }

  renderInput = (fieldName, field) => (
    <div style={{marginRight: '5px'}}>
      <label>{fieldName}</label>
      <input
        value={this.state.model[field]}
        onChange={(e) => this.onChange(e, field)}
        />
      <span>{this.state.errors[field]}</span>
    </div>
  )

  countrySelection () {
    return (
      <div>
        <label>Country*</label>
        <select value={this.state.model.country} style={{color: this.state.model.country === '' ? 'rgba(255,255,255,0.2)' : 'inherit'}} onChange={(e) => this.onChange(e, 'country')}>
          <option value='' hidden> Select your country</option>
          {
            _.map(countries, (country, key) => (
              <option key={key} value={country}>{country}</option>
            ))
          }
        </select>
        <span>{this.state.errors['country']}</span>
      </div>
    )
  }

  render () {
    return (
      <SlideContainer>
        <form onSubmit={this.next}>
          <StyledForm>
            {this.renderInput('Address*', 'address')}
            <Flex row>
              {this.renderInput('City*', 'city')}
              {this.renderInput('State/Province/Region*', 'state')}
              {this.renderInput('ZIP/Postal Code', 'zip')}
            </Flex>
            {this.countrySelection()}
          </StyledForm>

          <NextButton type='submit' >
            <i className='ion-ios-arrow-thin-right' />
          </NextButton>
        </form>

      </SlideContainer>
    )
  }
}
