import React, { Component } from 'react'
import { render } from 'react-dom'

const ga = {
  initialize: () => {},
  pageview: () => {}
}

import Legos from './js/legos'

import flickr from './img/flickr.svg'
import github from './img/github.svg'
import gitlab from './img/gitlab.svg'
import twitter from './img/twitter.svg'
import lastfm from './img/lastfm.svg'
import devto from './img/dev-dot-to.svg'
import bg from './img/bg.png'

import "./styles/index.scss"

const links = [
  { url: 'https://www.flickr.com/photos/_burce', icon: flickr },
  { url: 'http://www.last.fm/user/BDORN', icon: lastfm },
  { url: 'https://twitter.com/combatfetus', icon: twitter },
  { url: 'https://dev.to/bryce', icon: devto },
  { url: 'https://gitlab.com/brycedorn', icon: gitlab },
  { url: 'https://github.com/brycedorn', icon: github },
]

class Index extends Component {
  componentWillMount() {
    if (!DEV_MODE) {
      ga.initialize('UA-40008117-1')
    }
  }

  render() {
    if (!DEV_MODE) {
      ga.pageview('/')
    }

    return (
      <div id="react-root">
        <div className="background-scaffold" style={{ backgroundImage: `url(${bg})` }} />
        <Legos />
        <div className="links">
          {links.map((item, index) => (
            <a
              className="link"
              dangerouslySetInnerHTML={{__html: item.icon}}
              href={item.url}
              key={index}
              index={index}
              target="_blank"
            />
          ))}
        </div>
      </div>
    )
  }
}

render(<Index />, document.getElementById('app'))
