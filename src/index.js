// @flow

import React, { type Node } from "react";
import { createCache, createResource } from "simple-cache-provider";

const isBrowser = typeof window !== "undefined";

type Sheet = {
  href: string,
  before?: HTMLElement,
  media?: string
};

const elements: { [href: string]: HTMLElement } = {};

export function load(sheet: Sheet): Promise<void> {
  const { href, before, media = "all" } = sheet;
  return new Promise((onload, onerror) => {
    if (!isBrowser) return;
    const link = document.createElement("link");
    let ref;
    if (before) {
      ref = before;
    } else {
      const refs = (document.body || document.getElementsByTagName("head")[0])
        .childNodes;
      ref = refs[refs.length - 1];
    }
    Object.assign(link, {
      rel: "stylesheet",
      href,
      onerror,
      onload,
      media
    });

    elements[href] = link;

    ref.parentNode.insertBefore(link, before ? ref : ref.nextSibling);
  });
}

const Resource = createResource(
  load,
  ({ href, media = "all" }) => `${href}.${media}`
);

const cache = createCache();

const ctr: { [name: string]: number } = {};

export class Stylesheet extends React.Component<Sheet & { children: Node }> {
  componentDidMount() {
    const { href } = this.props;
    ctr[href] = ctr[href] || 0;
    ctr[href]++;
  }
  componentWillUnmount() {
    const { href } = this.props;
    ctr[href]--;
    if (ctr[href] === 0) {
      elements[href].parentNode.removeChild(elements[href]);
      delete elements[href];
      // todo - invalidate cache
    }
  }
  render() {
    if (isBrowser) Resource.read(cache, this.props);
    const { children, ...props } = this.props;
    return (
      <React.Fragment>
        <link {...props} />
        {children}
      </React.Fragment>
    );
  }
}
