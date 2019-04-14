import { Component } from 'react'
import Waypoint from 'react-waypoint'

export default class TrackUserDidSee extends Component {
  state = {}

  seenElement() {
    const { once, what } = this.props
    const hasSeenProp = `seen-${what}`
    const hasSeen = this.state[hasSeenProp]
    const trackEvent = `Seen ${what}`

    if (once && ! hasSeen) {
      this.setState({
        [hasSeenProp]: true
      })
      mixpanel.track(trackEvent)
    } else if (! once) {
      mixpanel.track(trackEvent)
    }
  }

  render() {
    return (
      <Waypoint onLeave={this.seenElement.bind(this)} />
    )
  }
}
