import React from "react";
import ReactDOM from "react-dom";
import { loadFederatedModule } from "./loadFederatedModule";

import "./index.scss";

const url = `http://localhost:${window.config.port}/remoteEntry.js`;
const Header = React.lazy(loadFederatedModule( url, 'remoteapp', './Header'));

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: hostapp</div>
    <React.Suspense fallback="Loading Header">
      <Header />
    </React.Suspense>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));




