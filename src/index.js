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

function load(sheet: Sheet): Promise<void> {
  const { href, before, media = "all" } = sheet;
  return new Promise((onload, onerror) => {
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

export class Stylesheet extends React.Component<Sheet & { children: Node }> {
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
