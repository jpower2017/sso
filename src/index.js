import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

/**
-- If no local JWT && no query String :
        API/JWT/REDIRECT   :param(redirect-url)
-- If local JWT:
        API/JWT/ENCRYPT or DECRYPT   :param(jwt + pin)
-- If query str :
        API/JWT/KEY  :param(code)
**/
/** TO DO CHANGE URLS **/
const portalUrls = {
  REDIRECT_INIT: "REDIRECT_INIT",
  REDIRECT_KEY: "REDIRECT_KEY",
  AUTHENTICATE: "AUTHENTICATE"
};

const containsQuery = str => {
  const pattern = /[?]/;
  return pattern.test(str);
};

const hasJWT = () => {
  console.log("hasJWT called");
  return localStorage.getItem("JWT");
};
const onAction = action => {
  console.log("index.js onAction f " + action);
  if (action === "success") {
    window.location.replace(portalUrls.AUTHENTICATE);
  } else {
    //action === skip
    window.location.replace(portalUrls.REDIRECT_INIT);
  }
};
/* IF QUERY   ELSE JWT OR NO JWT */
const loadLogic = () => {
  console.log("loadLogic f href: " + window.location.href);
  let evalURL = null;
  evalURL = window.location.href;
  if (containsQuery(evalURL)) {
    window.location.replace(portalUrls.REDIRECT_KEY);
  }

  if (hasJWT()) {
    return <App urls={portalUrls} action={onAction} />;
  } else {
    // temp  TO DO change
    return <App urls={portalUrls} action={onAction} />;
    ////  window.location.replace(portalUrls.REDIRECT_INIT);
  }
};

ReactDOM.render(loadLogic(), document.getElementById("root"));
registerServiceWorker();
