/* eslint-disable react/no-unknown-property */

import React from "react";
import { hydrate, render } from "react-dom";
import MetaTags from "react-meta-tags";
import { links, meta } from "./consts";
import Legos from "./legos";
import favicon from '../img/favicon.png';
import darkBg from '../img/bg-dark.png';
import lightBg from '../img/bg-light.png';

const App = () => (
  <>
    <MetaTags>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1" />
      <link rel="canonical" href={meta.url} />
      <link rel="icon" type="image/png" href={favicon} />
      <link rel="preload" fetchpriority="high" as="image" href={darkBg} type="image/png" />
      <link rel="preload" fetchpriority="high" as="image" href={lightBg} type="image/png" />
      <title>{meta.title}</title>
      <meta name="description" content={meta.desc} />
      <meta name="keywords" content="bryce,dorn,brycedorn,bryce.io,bryce dorn" />
      <meta name="author" content="bryce dorn" />
      <meta itemProp="name" content={meta.title} />
      <meta itemProp="description" content={meta.desc} />
      <meta itemProp="image" content={favicon} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.desc} />
      <meta name="twitter:image:src" content={favicon} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={meta.url} />
      <meta property="og:image" content={favicon} />
      <meta property="og:description" content={meta.desc} />
      <meta property="og:site_name" content={meta.title} />
    </MetaTags>
    <Legos />
    <div className="links">
      {links.map((link) => (
        <div key={link.url}>
          <a href={link.url} target="_blank" rel="noreferrer" aria-label={link.title}>
            <img src={link.icon} width={40} height={40} alt={`${link.title} logo`} />
          </a>
        </div>
      ))}
    </div>
  </>
);

const rootElement = document.getElementById("app");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}