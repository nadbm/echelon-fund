import {Component} from 'react'
import styled from 'styled-components'
import TrackDocument from './TrackDocument'
import {BLUE} from './colors'
import media from 'styled-media-query'

const TriangleDiv = styled.div`
  width: 50vw;
  height: 50vw;
  border-radius: 20px;
  border: 1vw solid ${BLUE};
  border-radius: 50%;
  opacity: 0.1;
  top: 9vw;
  right: 24vw;
  position: absolute;
  transition: opacity 0.2s ease-in;
  ${media.lessThan('medium')`
    top: 50vh;
    width: 80vw;
    height: 80vw;
    right: 10vw;
    border: 2vw solid ${BLUE};
  
  `}
`
const TriangleDivLeft = styled.div`
  width: 50vw;
  height: 50vw;
  top: 9vw;
  border-radius: 50%;
  left: 23vw;
  border: 2vw solid ${BLUE};
  opacity: 0.05;
  position: absolute;
  transition: opacity 0.2s ease-in;
  transform-style: preserve-3d;
  ${media.lessThan('medium')`
    top: 50vh;
    width: 80vw;
    height: 80vw;
    left: 5vw;
    border: 4vw solid ${BLUE};
  `}
`
const IS_BROWSER = typeof window !== 'undefined'

export default class ParallaxRings extends Component {
  constructor (props) {
    super(props)
    this.state = {visible: false}
    this.onScroll = this.onScroll.bind(this)
    this.requestAnimFrame = this.requestAnimFrame.bind(this)
  }
  componentDidMount () {
    if (IS_BROWSER) {
      this.onScroll()
      window.addEventListener('scroll', this.requestAnimFrame)
      window.addEventListener('resize', this.requestAnimFrame)
      setTimeout(() => {
        this.setState({visible: true})
      })
    }
  }
  componentWillUnmount () {
    if (IS_BROWSER) {
      window.removeEventListener('scroll', this.requestAnimFrame)
      window.addEventListener('resize', this.requestAnimFrame)
    }
  }

  requestAnimFrame () {
    window.requestAnimationFrame(this.onScroll)
  }

  onScroll (e) {
    this.setState({
      scrollY: window.scrollY,
      height: window.document.documentElement.clientHeight,
      width: window.document.documentElement.clientWidth
    })
  }

  render () {
    const {scrollY, height, width, visible} = this.state
    const breakPoint = height * 3 / 4
    const passedHalfHeight = scrollY < breakPoint

    let rightTriangleY = passedHalfHeight ? scrollY / 2 : (breakPoint - (scrollY - breakPoint)) / 2
    let rightTriangleX = ((width / height) * scrollY * 4 / 3 - width / 2)

    const lock = Math.abs(rightTriangleX) < 45
    const outerlock = Math.abs(rightTriangleX) < 55

    rightTriangleX = lock ? 0 : rightTriangleX
    rightTriangleY = lock ? breakPoint / 4 : rightTriangleY
    if (scrollY > height * 2) {
      return null
    }

    return (
      <div style={{width: '100vw', height: '200vh', overflowX: 'hidden', transition: 'opacity 0.5s ease-in', position: 'absolute', opacity: visible ? 1 : 0}}>

        <TriangleDiv style={{
          opacity: lock ? 0.3 : 0.1,
          transition: outerlock ? 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out' : 'none',
          transform: `translateX(${-rightTriangleX}px) translateY(-${(breakPoint / 2 - rightTriangleY) / 2}px) translateZ(0)`
        }}
        />
        <TriangleDivLeft
          style={{
            transform: `translateX(${rightTriangleX}px) translateY(-${rightTriangleY / 2}px) translateZ(0)`
          }}
        />

      </div>
    )
  }
}
