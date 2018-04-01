import React, { Component } from 'react'
import Lego from 'react-legos'
import { Motion, spring } from 'react-motion'

import letterPlacements from './letterPlacements'
import { letters } from '../../lib/shapes'

const MEDIUM_WIDTH = 682
const LARGE_WIDTH = 1240

const letterColoring = {
  b: 'Bright-blue',
  r: 'Bright-red',
  y: 'Light-grey',
  c: 'Bright-yellow',
  e: 'Dark-green'
}

const letterOrdering = {
  y: { style: { zIndex: 1 } }
}

export default class Legos extends Component {
  constructor(props) {
    super(props)

    this.state = {
      alt: false,
      size: '',
      step: '',
      letterVisibility: {
        b: false,
        r: false,
        y: false,
        c: false,
        e: false
      }
    }

    this.letters = Object.keys(this.state.letterVisibility)

    const brickProps = {}
    this.letters.forEach((l) => (
      brickProps[l] = {
        ...letterOrdering[l],
        color: letterColoring[l],
        name: l,
        shape: letters[`lowercase${l.toUpperCase()}`]
      }
    ))

    this.brickProps = brickProps

    this.setBrickSize = this.setBrickSize.bind(this)
    this.placeLetter = this.placeLetter.bind(this)
  }

  componentDidMount() {
    this.step = setInterval(this.placeLetter, 800)
  }

  placeLetter() {
    const { letterVisibility } = this.state
    const letter = this.letters.find(l => !this.state.letterVisibility[l])

    if (!letter) {
      clearInterval(this.step)

      return
    }

    letterVisibility[letter] = true

    this.setState({ letterVisibility })
  }

  componentWillMount() {
    window.addEventListener('resize', this.setBrickSize)

    this.setBrickSize()
  }

  setBrickSize() {
    const { innerWidth } = window
    const { alt, size } = this.state

    const isTiny = innerWidth <= MEDIUM_WIDTH
    const isSmall = innerWidth <= LARGE_WIDTH
    const shouldUpdateAlt = isTiny && !alt || !isTiny && alt
    const isMedium = !isSmall
    const shouldUpdateSize = size === '' || isSmall && size !== 'small' || isMedium && size !== 'medium'
    const shouldUpdate = shouldUpdateAlt || shouldUpdateSize

    if (shouldUpdate) {
      const newSize = isSmall ? 'small' : 'medium'

      // Update brick props before rerendering
      this.updateBrickProps(isTiny, newSize)
    }
  }

  updateBrickProps(alt, size) {
    const placement = letterPlacements[size]
    const altPlacement = alt && placement['alt'] || {}
    const brickProps = this.brickProps

    this.letters.forEach((l) => {
      brickProps[l].placement = altPlacement[l] || placement[l]
      brickProps[l].size = size
    })

    this.brickProps = brickProps

    this.setState({ alt, size })
  }

  render() {
    const { alt, size } = this.state
    const { brickProps, letters } = this

    return (
      <div className="container">
        <div className={`collection collection--${size}${alt ? ' mobile' : ''} motion-outer`}>
          {this.letters.filter(l => this.state.letterVisibility[l]).map((l, i) => 
            <Motion key={i} defaultStyle={{top: 0, opacity: 0}} style={{top: spring(60), opacity: spring(1)}}>
              {interpolatingStyle => <div className='motion-inner' style={interpolatingStyle}>
                <Lego { ...brickProps[l] } />
             </div>}
            </Motion>     
          )}
        </div>
      </div>
    )
  }
}
