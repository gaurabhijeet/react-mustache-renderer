/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from "react";

import ReactHtmlParser, {
  HTMLReactParserOptions,
  Element as ReactHtmlElem,
  attributesToProps,
} from "html-react-parser";
import Mustache from "mustache";
import { createPortal } from "react-dom";

import data from "./data.json";
import { M_TEMPLATE } from "./Constants";

export const MustacheRender: FunctionComponent = () => {
  const [template, setTemplate] = useState<ReactNode>();
  const [contentRef, setContentRef] = useState<any>(null);

  const reactHtmlParserOptions: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof ReactHtmlElem && domNode.attribs) {
        if (domNode.name === "img") {
          const imgProps = attributesToProps(domNode.attribs);

          return (
            <div className="content">
              <img {...imgProps} />
              <a onClick={() => alert("click")}>sample</a>
            </div>
          );
        }
      }
    },
  };

  useEffect(() => {
    const html =
      typeof M_TEMPLATE === "string" ? Mustache.render(M_TEMPLATE, data) : null;

    if (html) {
      const reactComp = ReactHtmlParser(html, reactHtmlParserOptions);

      setTemplate(reactComp);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {template && (
        <iframe
          style={{ height: "90vh", width: "100%", border: "0px" }}
          ref={setContentRef}
        >
          {contentRef?.contentWindow?.document?.body &&
            createPortal(template, contentRef?.contentWindow?.document?.body)}
        </iframe>
      )}
    </>
  );

  // return (
  //     <div
  //         ref={(lblRef): void => {
  //             if (lblRef) {
  //                 // eslint-disable-next-line no-param-reassign
  //                 lblRef.innerHTML = template || '';
  //             }
  //         }}
  //     />
  // );

  //  return <>{template}</>;
};
