
import {Component} from 'react'
import styled, {keyframes} from 'styled-components'
import { Flex, Box } from 'grid-styled'
import {slideInDown} from 'react-animations'
import {ButtonSimple, SlideContainer, NextButton} from '../../common/styled'
import yup from 'yup'
import FormInput from './FormInput'
import _ from 'lodash'

const FormParagraph = styled.div`
  font-size: 2em;
`
export default class BasicInfoForm extends Component {
  countries = ['Canada', 'United States']
  state = {
    model:
    {
      first: '',
      last: '',
      email: ''
    },
    errors: {},
    valid: false
  }
  model = {
    first: yup.string().trim().required('Please enter your first name'),
    last: yup.string().trim().required('Please enter your last name'),
    email: yup.string().email('Please enter a valid email').required('Please enter a valid email')
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

  render () {
    return (
      <div>
        <SlideContainer>
          <Flex column justify='center' align='center'>
            <form onSubmit={this.next}>
              <FormParagraph>
                <span> I </span>
                <FormInput
                  placeholder={'First Name'}
                  error={this.state.errors.first}
                  value={this.state.model.first}
                  onChange={(e) => this.onChange(e, 'first')}
                />
                <FormInput
                  placeholder={'Last Name'}
                  error={this.state.errors.last}
                  value={this.state.model.last}
                  onChange={(e) => this.onChange(e, 'last')}
                />
                <span> am  submitting
                this  Letter  of Intent  to  reserve  my  place  to  purchase  shares
                in  the  Echelon  Digital  Asset  Index  Fund.</span>
                <br />
                <span> You can reach me at </span>
                <FormInput
                  placeholder={'Email'}
                  bottom
                  error={this.state.errors.email}
                  value={this.state.model.email}
                  onChange={(e) => this.onChange(e, 'email')}
                />
                .
              </FormParagraph>
              <NextButton type='submit' >
                <i className='ion-ios-arrow-thin-right' />
              </NextButton>
            </form>
            <Flex justify='right' align='flex-end' />
          </Flex>
        </SlideContainer>
      </div>
    )
  }
}
