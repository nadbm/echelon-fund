import styled from 'styled-components'
import {LESS_DARK, GREY_BLUE, DARK_BLUE, BLUE, BLACK, GREY} from '../../common/colors'

const StyledInput = styled.div`
  display: inline-block;
  position: relative;
  margin-left: 15px;
  input {
    
    background: rgba(255,255,255, 0.1);
    font-size: 0.7em;
    outline: 0;
    border: 0;
    border-bottom: 2px solid ${BLUE};
    line-height: 14px;
    padding-left: 0.5em;
    padding-top: 4px;
    color: ${BLUE};
  } 
  span {
    margin-bottom: -0.5em;
    color: white;
    padding: 10px;
    font-size: 0.5em;
    position: absolute;
    z-index: 999;
    background: lightcoral;
    top: -100%;
    margin: auto;
    left: 0;
    right: 0;
    min-width: 140px;
  }
  label {
    display: block;
    color: ${GREY_BLUE};
    font-size: 0.5em;
    transform: ${({active}) => active ? 'translateY(0%)' : 'translateY(-150%)'};
    opacity: ${({active}) => active ? '1' : '0'};;
    transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  ${({error, bottom}) => error ? `
    :after {
      position: absolute;
      bottom: ${bottom ? '-30%' : '100%'};
      left: 50%;
      margin-left: -5px;
      width: 0;
      border-top: 5px solid lightcoral;
      border-top: 5px solid lightcoral;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      content: " ";
      transform: ${bottom ? 'rotate(180deg)' : 'none'}; ;
      font-size: 0;
      line-height: 0;
    }
    :before {
      position: absolute;
      bottom: ${bottom ? '-100%' : '100%'};
      left: 50%;
      margin-bottom: 5px;
      margin-left: -80px;
      padding: 7px;
      width: 160px;
      background-color: lightcoral;
      color: #fff;
      content: attr(data-tooltip);
      text-align: center;
      font-size: 12px;
      line-height: 1.2;
    }
    ` : ``}
`

const FormInput = ({bottom, value, placeholder, onChange, error}) => (
  <StyledInput bottom={bottom} active={value && value.length > 0} data-tooltip={error} error={error}>
    <label>{placeholder}</label>
    <input
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      style={error ? {borderBottomColor: 'lightcoral'} : {}}
    />
  </StyledInput>
)
export default FormInput
