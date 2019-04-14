import { Component } from 'react'
import Router from 'next/router'
import 'whatwg-fetch'

/* Import common components */
import Page from '../components/Page'
import TrackUserDidSee from '../components/TrackUserDidSee'
import StickyDiv from '../common/StickyDiv'

/* Import landing page components */
import CTA from '../components/landing/CTA'
import SplashHeader from '../components/landing/SplashHeader'
import HowItWorks from '../components/landing/HowItWorks'
import WhatWeDo from '../components/landing/WhyEchelon'
import Security from '../components/landing/Security'
import FundChart from '../components/landing/FundChart'
import Introduction from '../components/landing/Introduction'
import Signup from '../components/landing/Signup'

class IndexPage extends Component {
  state = {stickyCTA: false, splash: false, hidden: true, bottomCTA: false}

  componentDidMount () {
    mixpanel.track('Load Main')
    setTimeout(() => {
      if (!this.state.splash) {
        this.setState({stickyCTA: true})
      }
    }, 400)
  }

  render () {
    return (
      <Page title='Echelon Fund'>
        <SplashHeader
          onEnter={(pos) => { this.setState({splash: true, stickyCTA: false}) }}
          onLeave={(pos) => { this.setState({stickyCTA: true}) }}
        />
        <div style={{position: 'relative'}}>
          <TrackUserDidSee what='Introduction' once />
          <Introduction />

          <TrackUserDidSee what='Fund Chart' once />
          <StickyDiv child={FundChart} />

          <TrackUserDidSee what='What We Do' once />
          <StickyDiv child={WhatWeDo} />

          <TrackUserDidSee what='How it Works' once />
          <StickyDiv child={HowItWorks} />

          <TrackUserDidSee what='Security' once />
          <StickyDiv child={Security} />
          <CTA sticky visible={this.state.stickyCTA} />
        </div>
        <Signup
          onEnter={(pos) => { this.setState({splash: true, stickyCTA: false}) }}
          onLeave={(pos) => { this.setState({stickyCTA: true}) }}
        />

      </Page>
    )
  }
}

export default IndexPage
