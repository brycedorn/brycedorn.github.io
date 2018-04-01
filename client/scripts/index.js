import React, { Component } from 'react'
import { render } from 'react-dom'
import ga from 'react-ga'

import Legos from './legos'

import flickr from '../img/flickr.svg'
import github from '../img/github.svg'
import gmail from '../img/gmail.svg'
import lastfm from '../img/lastfm.svg'
import npm from '../img/npm.svg'
import tumblr from '../img/tumblr.svg'
import bg from '../img/bg.png'

require("../styles/index.scss")

const PROD = true;

class Index extends Component {
  componentWillMount() {
    if (PROD) { 
      ga.initialize('UA-40008117-1') 
    }
  }

  renderLinks() {
    const links = [
      { url: 'https://www.flickr.com/photos/_burce', icon: flickr },
      { url: 'https://github.com/brycedorn', icon: github },
      { url: 'mailto:brycedorn@gmail.com', icon: gmail },
      { url: 'http://www.last.fm/user/BDORN', icon: lastfm },
      { url: 'https://www.npmjs.com/~brycedorn', icon: npm },
      { url: 'http://asdpoigna.tumblr.com/', icon: tumblr }
    ]

    return links.map((item, index) => {
      return (
        <a
          className="link"
          dangerouslySetInnerHTML={{__html: item.icon}}
          href={item.url}
          key={index}
          target="_blank">
        </a>
      )
    })
  }

  render() {
    if (PROD) { 
      ga.pageview('/') 
    }

    const backgroundImage = `url(${PROD ? 'public/' : ''}${bg})`

    return (
      <div id="react-root">
        <div className="background-scaffold" style={{ backgroundImage }} />
        <Legos />
        <div className="links">
          {this.renderLinks()}
        </div>
      </div>
    )
  }
}

render(<Index />, document.getElementById('root'))
