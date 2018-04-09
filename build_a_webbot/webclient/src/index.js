import React from "react";
import ReactDOM from "react-dom";
import configureStore from "store/configureStore";
import { Provider } from "react-redux";
import "./index.css";
import Root from "containers/Root";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider store={configureStore}>
    <Root />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
