import React from "react";
import { links } from "./consts";
import me from '../img/me.jpg';

function SidePane() {
  return (
    <div id="side-pane">
      <img id="me" src={me}></img>
      <h1 id="hi" className="box">Hi I'm Bryce 👋</h1>
      <h2>I’m a frontend engineer with a passion for building things, improving user experiences and shipping high-impact features.</h2>
      <h2>Currently living in Amsterdam & working at Uber.</h2>
      <h3>Previously: Glassdoor, The Onion, Avant.</h3>
      <div className="links">
        {links.map((link) => (
          <div key={link.url}>
            <a href={link.url} target="_blank" rel="noreferrer" aria-label={link.title}>
              <img src={link.icon} alt={`${link.title} logo`} />
            </a>
          </div>
        ))}
      </div>
      <h2 id="contact" className="box">Get in touch</h2>
      <h3>Feel free to email me at <a href="mailto:hi@bryce.io">hi@bryce.io</a>.</h3>
    </div>
  )
}

export default SidePane;