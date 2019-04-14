import {Component} from 'react'
export default class BreathingCircle extends Component {
  componentDidMount () {
    if (typeof window !== 'undefined') {

    }
    const ctx = this.canvas.getContext('2d')
    let w, h

    const draw = (radius, fill) => {
      ctx.beginPath()
      ctx.arc(this.canvas.width / 2, this.canvas.height / 2, radius, 0, Math.PI * 2)
      ctx.fillStyle = fill
      ctx.fill()
    }

    let x = 0
    window.setInterval(() => {
      ctx.clearRect(0, 0, w, h)
      draw(40 * (Math.cos(x / 5) + 1), `rgba(255,255,255, ${Math.abs(Math.sin(x / 5))})`)

      x += 0.05
    }, 30)
  }

  render () {
    return <canvas ref={r => { this.canvas = r }} style={{width: '100%', height: '100%'}} />
  }
}
