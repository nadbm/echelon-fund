import styled from 'styled-components'
import {BLUE} from '../common/colors'

const Step = styled.div`
  width: 15px;
  height: 15px;
  display: inline-block;
  border-radius: 50%;
  margin-top: -8px; 
  margin-right: -3px;
  cursor: ${({completed}) => completed ? 'pointer' : 'inherit'};
  border: ${({active}) => active ? '2px solid rgba(255,255,255,0.5)' : '2px solid rgba(255,255,255,0.1)'};
  background: ${({active, completed}) => active ? BLUE : (completed ? 'rgb(25, 39, 57)' : DARKEST)};
  transition: all 0.5s ease;
`
const StepWrapper = styled.div`
  width: 400px;
  height: 5px;
  display: flex;
  border-radius: 2px;
  justify-content: space-between;
  background: none;
  margin-top: -5px;
  background: rgba(255,255,255,0.1);
  transition: all 0.5s ease;
`
const Progress = styled.div`
  height: 5px;
  margin-top: 10px;
  background: ${BLUE};
  transition: all 0.5s ease;
`

const Stepper = ({step, length, visible, changeStep, completed}) => (
  <div style={{position: 'absolute', bottom: '4em'}}>
    <Progress style={{width: `${(step - 1) * 100 / (length - 1)}%`}} />

    <StepWrapper style={!visible ? {display: 'none'} : {}}>
      {
      (Array(length).fill(null).map((_, i) => (
        <Step onClick={() => (i < completed) && changeStep(i)} active={i < step} completed={i < completed} />))
      )
    }
    </StepWrapper>
  </div>
)
