// import React from "react";
// import ReactDOM from "react-dom";
import dva from "dva";

import "./index.css";
// import App from "./App";

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require("./models/progress").default);

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");

// ReactDOM.render(<App />, document.getElementById("root"));
