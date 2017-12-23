'use strict'

import React from 'react'
import { render } from 'react-dom'

import Lego from 'react-legos'
import { letters } from '../../lib/shapes'
import letterPlacements from './letterPlacements'

export default class Legos extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      size: 'medium'
    }

    this.setBrickSize = this.setBrickSize.bind(this)
  }

  componentWillMount() {
    window.addEventListener('resize', this.setBrickSize)

    this.setBrickSize()
  }

  setBrickSize() {
    const { innerWidth } = window

    this.setState({
      size: (innerWidth > 1240) ? 'medium' : 'small'
    })
  }

  render() {
    const { size } = this.state
    const placement = letterPlacements[size]
    const bryce = ['b','r','y','c','e']
    const brickProps = {}

    bryce.forEach((letter) => (
      brickProps[letter] = {
        name: letter,
        placement: placement[letter],
        shape: letters[`lowercase${letter.toUpperCase()}`],
        size: size
      }
    ))

    return (
      <div className="container">
        <div className={`collection collection--${size}`}>
          <Lego { ...brickProps['b'] } />
          <Lego { ...brickProps['r'] } />
          <Lego { ...brickProps['y'] } style={{zIndex: 1}} />
          <Lego { ...brickProps['c'] } />
          <Lego { ...brickProps['e'] } />
        </div>
      </div>
    )
  }
}