import React, {Component} from 'react'
import styled from 'styled-components'

const OUTER_HEIGHT = 1
const BREAKPOINT = 3 / 4

const IS_BROWSER = typeof window !== 'undefined'
const Sticky = styled.div`
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -o-sticky;
  position: -ms-sticky;
  position: sticky;
`

export default class StickyDiv extends Component {
  constructor (props) {
    super(props)
    this.onScroll = this.onScroll.bind(this)
    this.requestAnimFrame = this.requestAnimFrame.bind(this)
    this.state = {top: -1, windowHeight: 700, scrollFixed: false}
    this.ChildElement = this.props.child
  }
  componentDidMount () {
    if (IS_BROWSER) {
      if (window.scrollY !== 0) {
        this.onScroll()
      }
      window.addEventListener('scroll', this.requestAnimFrame)
      window.addEventListener('resize', this.requestAnimFrame)
    }
  }
  componentWillUnmount () {
    if (IS_BROWSER) {
      window.removeEventListener('scroll', this.requestAnimFrame)
      window.removeEventListener('resize', this.requestAnimFrame)
    }
  }

  requestAnimFrame () {
    window.requestAnimationFrame(this.onScroll)
  }

  onScroll (e) {
    const {top} = this.container.getBoundingClientRect()
    const scrollTop = -top
    const windowHeight = window.document.documentElement.clientHeight
    const breakPoint = windowHeight * (this.props.outerHeight || OUTER_HEIGHT) * (this.props.breakPoint || BREAKPOINT)
    const scrollFixed = scrollTop >= breakPoint
    this.setState({
      top: -top,
      scrollFixed: scrollFixed,
      windowHeight: windowHeight
    })
  }

  render () {
    const {windowHeight, top} = this.state

    const breakPoint = windowHeight * (this.props.outerHeight || OUTER_HEIGHT) * (this.props.breakPoint || BREAKPOINT)

    const scrolledPercent = (top + windowHeight * BREAKPOINT) * 100 / breakPoint

    return (
      <div ref={r => { this.container = r }} style={{minHeight: `${100 * (this.props.outerHeight || OUTER_HEIGHT)}vh`, width: '100%', position: 'relative'}}>
        <Sticky style={{
          minHeight: '100vh',
          width: '100%',
          top: '0',
          display: 'inline-block'
        }} >
          <this.ChildElement scrolled={scrolledPercent} top={top} />
        </Sticky>
        {this.props.parallaxElements ? this.props.parallaxElements(scrolledPercent) : null}
      </div>
    )
  }
}
