'use strict'

import React from 'react'
import { render } from 'react-dom'
import Legos from './legos'

import flickr from '../svg/flickr.svg'
import github from '../svg/github.svg'
import gmail from '../svg/gmail.svg'
import lastfm from '../svg/lastfm.svg'
import npm from '../svg/npm.svg'
import tumblr from '../svg/tumblr.svg'

require("../styles/index.scss")

class Index extends React.Component {
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
    return (
      <div id="react-root">
        <Legos />
        <div className='links'>
          {this.renderLinks()}
        </div>
      </div>
    )
  }
}

render(<Index />, document.getElementById('root'))
document.body.setAttribute("style","display:block")