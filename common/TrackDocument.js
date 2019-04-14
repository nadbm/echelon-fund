import {Component} from 'react'
const IS_BROWSER = typeof window !== 'undefined'
export default class TrackDocument extends Component {
  constructor (props) {
    super(props)
    this.onScroll = this.onScroll.bind(this)
    this.requestAnimFrame = this.requestAnimFrame.bind(this)
    this.state = {scroll: 0, width: 1600, height: 800}
  }
  componentDidMount () {
    if (IS_BROWSER) {
      // this.onScroll()
      window.addEventListener('scroll', this.requestAnimFrame)
      window.addEventListener('resize', this.requestAnimFrame)
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
      scroll: window.scrollY,
      height: window.document.documentElement.clientHeight,
      width: window.document.documentElement.clientWidth
    })
  }

  render () {
    return (this.props.children(this.state.scroll, this.state.height, this.state.width))
  }
}
