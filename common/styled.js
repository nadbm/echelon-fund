import {DARKEST, BLUE, BLACK, GREY, GREY_BLUE, DARK_BLUE, LIGHT_BLUE} from '../common/colors'
import styled, { keyframes } from 'styled-components'
import {Flex, Box} from 'grid-styled'
import * as ReactAnim from 'react-animations'
import media from 'styled-media-query'

function rotationBuilder (def) {
  return keyframes`
    0% {
      transform: ${def} rotate(0deg);
    }
    100% {
      transform: ${def} rotate(360deg);
    }
  `
}
function displayNone (sec) {
  return keyframes`
    0% {
      display: block;
    }
    100% {
      display: none;
    }
  `
}
export const SubHeader = styled(Box)`
  font-size: 1.5em;
  align-self: flex-start;
  position: relative;
  line-height: 10vh;
  padding-top: 4em;
  padding-left: 1em;
  user-select: none;
  cursor: default;
  &:before {
    content: ' ';
    display: inline-block;
    border-bottom: 2px solid white;
    width: 5em;
    margin-right: 1em;
    margin-bottom: 0.2em;
  }
`
export const FullScreen = styled(Flex)`
  width: 100%;
  height: 100vh;
  align-items: center;
`
export const FullHeight = styled(Flex)`
  width: 100%;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;
  font-family: Nunito Sans;
  position: relative;
  margin-bottom: 10vh;
`
export const PageContainer = styled(Flex)`
  max-width: 960px;
  background: white;
  margin: 10vh auto;
  font-family: Nunito Sans;
  color: #333; 
  height: inherit; 
  text-align: left;
  position: relative;
`

// TODO:
// Consolidate Containers. `Container` shouldn't be 100vh height, but
// perhaps an extension of a more general `Container`.
export const ContainerSub = styled(Flex)`
  flex-direction: column;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5em;
  position: relative;
  font-family: Nunito Sans;
`

export const FadeIn = styled(Box)`
  position: relative;
  display: inline-block;
  vertical-align: top;
  transform: translate(0, 0);
  animation: ${(({visible}) => visible ? '1s ' + keyframes`${ReactAnim.fadeIn}` : '1s ' + keyframes`${ReactAnim.fadeOut}`)};
  display:${({visible}) => visible ? 'block' : 'none'};
  transition:visibility 1000ms, opacity 1.7s ease;
`

export const FadeInUp = styled(Box)`
  position: relative;
  vertical-align: top;
  animation: ${(({visible}) => visible ? '1s ' + keyframes`${ReactAnim.fadeInUp}` : '1s ' + keyframes`${ReactAnim.fadeOutDown}`)};
  transition: ${(({visible}) => visible ? '1s ' + keyframes`${ReactAnim.fadeInUp}` : '1s ' + keyframes`${ReactAnim.fadeOutDown}`)};
  display:${({visible}) => visible ? 'inline-block' : 'none'};
  visibility:${({visible}) => visible ? 'visible' : 'hidden'};
  
`

export const FadeInLeft = styled(Box)`
  position: relative;
  vertical-align: top;
  overflow: hidden;
  max-height:${({visible}) => visible ? '500px' : '0px'};
  opacity:${({visible}) => visible ? '1' : '0'};
  transition:opacity 0.5s ease-out, max-height 0.5s ease-out;
`

export const FadeInStack = styled(Box)`
  position: relative;
  display: inline-block;
  vertical-align: top;
  animation: ${(({visible}) => visible ? '1s ' + keyframes`${ReactAnim.fadeInDown}` : '1s ' + keyframes`${ReactAnim.fadeOutUp}`)};
  visibility:${({visible}) => visible ? 'visible' : 'hidden'};
  transition:visibility 1000ms;
`

export const FadeInPath = styled.path`
  animation: ${(({visible}) => visible ? '2s ' + keyframes`${ReactAnim.fadeInDown}` : '1s ' + keyframes`${ReactAnim.fadeOutUp}`)};
  opacity: ${(({visible}) => visible ? 1 : 0)};
  transition-delay: 1s;
`

export const ListContent = styled.div`
  margin-top: 1em;
  h2,h3 { margin: 0}
  h2 {
    font-weight: 700;
    font-size: 1.5em;
  }
  h3 {
    margin-top: 0.5em;
  }
`
export const CircleListContent = styled(ListContent)`
  margin-left: 85px;
  max-width: 400px;
  margin-top: 2.3em; 
  &:before {
    content: '';
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 4px solid ${BLUE};
    display: inline-block;
    top: 38px;
    left: 25px;
    position: absolute;
  }
`

export const Button = styled.button`
  outline: none;
  color: white;
  margin: 5px;
  background: ${({disabled}) => disabled ? 'rgb(165, 221, 255)' : BLUE};
  border: 0;
  padding: 12px 34px;
  display: inline-block;
  font-family: Nunito Sans;
  border-radius: 25px;
  font-weight: 400;
  transition: all ease-in-out 0.5s;
  i {
    display: block;
    float: right;
    color: white;
    transition: transform ease 0.4s;
    transform: translateX(10px) translateY(1px);
  }
  i.loading {
    transform-origin: 50% 47%;
    animation: ${rotationBuilder('translateX(10px) translateY(1px)')} 0.5s linear infinite;
  }
  cursor: ${({disabled}) => disabled ? 'inherit' : 'pointer'};
  ${({disabled, primary}) => !disabled && `
    &:hover {
      transition: transform ease 0.2s;
      color: ${({primary}) => primary ? DARKEST : 'white'};
      background: ${({primary}) => primary ? 'white' : DARK_BLUE};
      i {
        transition: transform ease 0.5s;
        transform: translateX(18px) translateY(1px);
        color: ${({primary}) => primary ? DARKEST : 'white'};
      }
    }
  `}

  ${({sticky, visible}) => sticky && `
    borderRadius: 25px;
    position: fixed;
    bottom: 4em;
    right: 4em;


    float: right;
    animation: ${visible ? '1s ' + keyframes`${ReactAnim.fadeInUp}` : '1s ' + keyframes`${ReactAnim.fadeOutDown}`};
    visibility:${visible ? 'visible' : 'hidden'};
    transition:visibility 1000ms;
  `}
  ${media.lessThan('medium')`
    right: 0.5em;
  `}
`
export const NextButton = styled.button`
  padding: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 2em; 
  position: absolute; 
  right: 1em;
  bottom: 0.5em;
  border: 0;
  outline: 0;
  cursor: pointer;
  color: white;
  background: ${BLUE};
  box-shadow: 0px 2px 18px rgba(36, 155, 225, 0.5);
  i {
    transform: translate(-11px, 2px);
  }
  transition: all 0.2s ease-in;
  &:hover {
    i {
      transition: transform ease 0.5s;
      transform: translate(-5px, 2px);
    }
    background: ${DARK_BLUE};
    
  }
`

export const SubscribeFormStyle = styled.div`
  font-family: Nunito Sans;
  min-width: 500px;
  input,textarea {
    border: 0px solid #CCC;
    font-size: 1em;
    padding: 0em 1em;
    border-radius: 0.2em;
    width: 75%;
    line-height: 2.8em;
    display: inline-block;
  }
  label {
    display: block;
    font-weight: bold;
  }
  button {
    display: inline-block;
    border: 0;
    width: 100px;
    background: ${BLUE};
    color: white;
    line-height: 2.8em;
    padding: 0em 0em;
    text-align: center;
    font-size: 1em;
    cursor: pointer;
    margin-left: -2%;
    vertical-align: top;
    &:disabled {
      background: #CCC;
      cursor: initial;
    }
    border-radius: 0px 0.2em 0.2em 0px;
  }
  span {
    display: block;
    min-width: 100px;
    min-height: 1.5em;
    font-size: 1em;
    color: red;
  }
`

export const ButtonSimple = styled.button`
  color: white;
  margin: 5px;
  background: ${({disabled}) => disabled ? GREY_BLUE : BLUE};
  border: 0;
  opacity: ${({disabled}) => disabled ? 0.6 : 1};
  padding: 0.6em 2em;
  display: inline-block;
  cursor: pointer;
  font-family: Nunito Sans;
  border-radius: 5px;
  font-weight: 400;

  transition: all ease 0.4s;
  i {
    padding: 0 2px;
  }
  &:hover {
    background: ${({disabled}) => disabled ? BLUE : DARK_BLUE};
  }
`

export const InputSlider = styled.input`
  display: block;
  height: 10px;
  width: 100%;
  cursor: pointer;
  color: inherit;
  border-radius: 10px;
  margin: 0;
  background-color: rgba(204, 204, 204, 0.1);
  appearance: none;
  outline: none;
  touch-callout: none;
  user-select: none; 
  tap-highlight-color: rgba(0,0,0,0);
  &::-webkit-slider-thumb {
    width: 2.5em;
    height: 2.5em;
    transform: translateZ(100px);
    background-color: white;
    border: 0;
    border-radius: 50%;
    appearance: none;
    box-shadow: 1px 1px 20px #333;
    &:active {
      background-color: #EEE;
      width: 3em;
      height: 3em;
    }
  };

  transform: ${({reverse}) => reverse ? 'rotateY(180deg)' : 'none'};
`

export const Slider = ({value, max, min, step, onChange, reverse = false}) => {
  const percentage = ((value - min) / (max - min)) * 100
  return (
    <div style={{position: 'relative'}}>
      <div style={{
        width: (reverse ? 100 - percentage : percentage) + '%',
        height: '10px',
        background: BLUE,
        opacity: 0.9,
        top: '0',
        position: 'absolute',
        borderRadius: '10px 0px 0px 10px',
        transform: 'translateZ(-100px)',
        tapHighlightColor: 'rgba(0,0,0,0)',
        userSelect: 'none'
      }} />
      <InputSlider
        reverse={reverse}
        type='range'
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        value={value}
        />
    </div>
  )
}

export const SlideContainer = styled(Box)`
  max-width: 760px;
  padding: 4em 5em;
  padding-bottom: 5em;
  ${media.lessThan('medium')`
    padding: 2em 1em;
  `}
  position: relative;
  margin-left: auto;
  margin-right: auto;

`

export const StyledForm = styled.div`
  min-width: 400px;
  input, select {
    border: 1px solid #CCC;
    font-size: 1.5em;
    padding: 0.3em 0.3em;
    border-radius: 0;
    width: calc(100% - 0.6em);
    outline: none;
    border: none;
    transition: border-color 0.2s ease-in;
    border: 0;
    border-bottom: 2px solid #EEE;
    background: rgba(255,255,255,0.1);
    color: white;
    &:focus{
      border-bottom: 2px solid ${BLUE};
    }

    margin-right: 25px;
  }


  select:not([multiple]){
    -webkit-appearance:none;
    -moz-appearance:none;
    background-position:right 50%;
    background-repeat:no-repeat;
    background-image:url("data:image/svg+xml;utf8,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='0 0 24 24'><path fill='#fff' d='M7.406 7.828l4.594 4.594 4.594-4.594 1.406 1.406-6 6-6-6z'></path></svg>");
    padding-right:2.5em;
    width: 100%;
  }

  label {
    color: #888;
    display: block;
    font-weight: bold;
  }
  textarea {
    resize: none;
  }

  span {
    display: block;
    min-width: 100px;
    min-height: 1.5em;
    color: lightcoral;
  }
`

export const Link = styled.a`
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: top;
  z-index: 0;
  cursor: pointer;
  -webkit-transition: color 0.2s;
  transition: color 0.2s;
  color: #249BE1;
  text-decoration: none;
  outline: none;

  &:hover {
    &:before  {
      background-color: ${BLUE};
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
  }
  &:before {
    position: absolute;
    top: auto;
    bottom: 1px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${BLUE};
    content: '';
    -webkit-transition: all 0.2s;
    -webkit-backface-visibility: hidden;
    transition: all 0.2s;
    backface-visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
  }
`
export const FormParagraph = styled.div`
  font-size: ${({active}) => active ? '16px' : '12px'};
  color: ${({active}) => active ? 'white' : 'inherit'};
  transition: all 0.5s ease;
  padding: 1em;
  box-sizing: border-box;
  font-size: 2em;
  max-width: 760px;
  span {
    color: ${BLUE};
    min-width: 150px;
    font-size: 1.2em;
    min-height: 1.2em;
    vertical-align: bottom;
    display: inline-block;
    text-align: center;
    margin: 0px 20px;
    border-bottom: 2px solid ${BLUE};
  }
`
export const LoadingOverlay = styled.div`
  display: flex;
  flex-direction: column;
  opacity: ${({loading}) => loading ? '0.9' : '0'};
  z-index: 999;
  background: rgba(0, 14, 33, 0.8);
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  transition: all 1s ease-in;
  h2 {
    margin-top: 0;
  }
  i {
    display: block;
    font-size: 6em;
    transform-origin: 50% 47%;
    animation: ${rotationBuilder('translateX(0px) translateY(0px)')} 1.5s linear infinite;
  } 
`
