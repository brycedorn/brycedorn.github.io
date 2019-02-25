import React, { Component } from 'react'
import { render } from 'react-dom'

const ga = {
  initialize: () => {},
  pageview: () => {}
};

import Legos from './js/legos'

import flickr from './img/flickr.svg'
import github from './img/github.svg'
import gmail from './img/gmail.svg'
import lastfm from './img/lastfm.svg'
import devto from './img/devto.svg'
import tumblr from './img/tumblr.svg'
import bg from './img/bg.png'

import "./styles/index.scss";

const links = [
  { url: 'https://www.flickr.com/photos/_burce', icon: flickr },
  { url: 'https://github.com/brycedorn', icon: github },
  { url: 'mailto:brycedorn@gmail.com', icon: gmail },
  { url: 'http://www.last.fm/user/BDORN', icon: lastfm },
  { url: 'https://dev.to/bryce', icon: devto },
  { url: 'http://asdpoigna.tumblr.com/', icon: tumblr }
]

const staticLinks = true // just rendering statically for now

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
        {staticLinks ? null : (<div className="links">
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
        </div>)}
      </div>
    )
  }
}

render(<Index />, document.getElementById('app'))
