import React, { Component } from 'react'
import Lego, { shapes } from '../react-legos'
import posed, { PoseGroup } from 'react-pose';

import letterPlacements from './letterPlacements'

const MEDIUM_WIDTH = 682
const LARGE_WIDTH = 1240

const Thing = posed.div({
  enter: {
    y: 0,
    // x: 0,
    // opacity: 1,
    transition: {
      duration: 600,
      ease: 'easeInOut',
      // type: 'spring',
      // stiffness: 500
    },
    delay: ({ index }) => index * 400
  },
  exit: {
    y: -1200,
    // x: -300,
    // opacity: 1
  },
  // hoverable: true,
  // hover: { y: 40, }
})

const letterColoring = {
  b: 'Bright-blue',
  r: 'Bright-red',
  y: 'Light-grey',
  c: 'Bright-yellow',
  e: 'Dark-green'
}

const letterOrdering = {
  y: { style: { zIndex: 1 } },
  c: { style: { zIndex: 2 } },
  e: { style: { zIndex: 2 } }
}

export default class Legos extends Component {
  constructor(props) {
    super(props)

    this.state = {
      alt: false,
      size: '',
      step: '',
    }

    this.letters = ['b','c','r','e','y']

    const brickProps = {}
    this.letters.forEach((l) => (
      brickProps[l] = {
        ...letterOrdering[l],
        color: letterColoring[l],
        name: l,
        shape: shapes.letters[l]
      }
    ))

    this.brickProps = brickProps

    this.setBrickSize = this.setBrickSize.bind(this)
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
        <div className={`collection collection--${size}${alt ? ' mobile' : ''}`}>
          <PoseGroup>
            {this.letters.map((l, i) =>
              <Thing key={l} index={i} initialPose="exit">
                <Lego { ...brickProps[l] } />
              </Thing>
            )}
          </PoseGroup>
        </div>
      </div>
    )
  }
}
