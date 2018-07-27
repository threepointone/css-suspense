// @flow

import React, { type Node } from "react";
import { createCache, createResource } from "simple-cache-provider";

const isBrowser = typeof window !== "undefined";
const Placeholder = React.Placeholder;

function nullthrows(x) {
  if (x === null || x === undefined) {
    throw new Error("unexpected nullsy value");
  }
  return x;
}

type Sheet = {
  href: string,
  before?: HTMLElement,
  media?: string
};

export function load(sheet: Sheet): Promise<void> {
  if (!isBrowser) return;
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

    nullthrows(ref.parentNode).insertBefore(
      link,
      before ? ref : ref.nextSibling
    );
  });
}

export const Resource = createResource(
  load,
  ({ href, media = "all" }) => href + media
);
const cache = createCache();

function LinkLoad(props: Sheet) {
  Resource.read(cache, props);
  const { children, ...rest } = props;
  return (
    <React.Fragment>
      <link {...rest} />
      {children}
    </React.Fragment>
  );
}

export function Stylesheet(props: Sheet & { children: Node, fallback?: Node, timeout?: number }) {
  return (
    <Placeholder 
      delayMs={typeof props.timeout === 'number' ? props.timeout : 1000 }
      fallback={props.fallback}
    >
      <LinkLoad {...props} />
    </Placeholder>
  );
}
