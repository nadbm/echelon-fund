import { Flex, Box } from 'grid-styled'
import { Button, SlideContainer, NextButton, FormParagraph, PrevButton } from '../../common/styled'
import styled from 'styled-components'
import { GREY_BLUE, DARK_BLUE, BLUE } from '../../common/colors'
import { Component } from 'react'
import NumberFormat from 'react-number-format'
const Price = styled.div`
  border: 2px solid ${BLUE};
  background: ${({selected}) => selected ? DARK_BLUE : 'none'};
  padding: 0.5em 1em;
  text-align: center;
  cursor: pointer;
  height: 25px;
  vertical-align: center;
  min-width: 4em;
  font-size: 12px;
  color: white;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  input[type="radio"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 2;
  }
  input[type="text"] {
    outline: 0;
    border: 0;
    border-bottom: 2px solid white;
    background: none;
    color: white;
    padding-top: 2px;
    padding-left: 2em;
    font-size: 14px;
    width: 150px;
    z-index: 5;
  }
  span {
    position: absolute;
    top: 0;
    left: 1em;
    font-weight: bold;
    font-size: 10px;
  }
`
const Error = styled.div`
  opacity: ${({visible}) => visible ? 1 : 0};
  width: 260px;
  background-color: lightcoral;
  padding: 2px;
  color:white;
  margin: auto;
  top: 10px;
  transform: translateY(20px);
  padding: 0.5em;
  text-align: center;
  font-size: 1.1em;
  position: relative;
  :after {
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    width: 0;
    border-top: 5px solid lightcoral;
    border-top: 5px solid lightcoral;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: " ";
    transform: rotate(180deg);
    font-size: 0;
    line-height: 0;
  }
`
class FormAmount extends Component {
  state={option: null, selectPrice: false, other: {floatValue: null}}
  submitForm = (e) => {
    console.log('submitting', this.state)
    e.preventDefault()
    if (this.state.preselected || this.state.other.formattedValue) {
      this.props.nextStep({investment: this.state.preselected || this.state.other.formattedValue})
    } else {
      this.setState({error: this.state.option === 4 ? 'Please input a custom value' : 'Please select an option'})
    }
  }
  render () {
    return (
      <SlideContainer>
        <FormParagraph active={this.state.step === 2} onClick={() => this.setState({selectPrice: true})}>
            The total amount of my purchases will equal an aggregate amount no less than :
        </FormParagraph>
        <form onSubmit={this.submitForm}>
          <Flex row justify='space-evenly'>
            <Price selected={this.state.option === 0} >
            100k <input type='radio' checked={this.state.option === 0} onChange={() => this.setState({option: 0, error: '', preselected: '$100,000'})} />
            </Price>
            <Price selected={this.state.option === 1} >
            250k <input type='radio' checked={this.state.option === 1} onChange={() => this.setState({option: 1, error: '', preselected: '$250,000'})} />
            </Price>
            <Price selected={this.state.option === 2} >
            500k <input type='radio' checked={this.state.option === 2} onChange={() => this.setState({option: 2, error: '', preselected: '$500,000'})} />
            </Price>
            <Price selected={this.state.option === 3} >
            1M <input type='radio' checked={this.state.option === 3} onChange={() => this.setState({option: 3, error: '', preselected: '$1,000,000'})} />
            </Price>
            <Price selected={this.state.option === 4} onClick={() => this.setState({option: 4, error: '', preselected: null})} >
              <span> Other </span>
              <input type='radio' checked={this.state.option === 4} />
              <NumberFormat allowNegative={false} thousandSeparator prefix={'$'} value={this.state.other.floatValue} onChange={(e, value) => this.setState({option: 4, other: value})} />
            </Price>
          </Flex>
          <Error visible={!!this.state.error}> {this.state.error} </Error>
          <NextButton type='submit'>
            <i className={'ion-ios-arrow-thin-right'} />
          </NextButton>
        </form>
      </SlideContainer>
    )
  }
}
export default FormAmount
