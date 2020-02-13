import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import MemeApp from "./components/meme-app";

ReactDOM.render(
    <Router>
        <MemeApp />
    </Router>,
    document.getElementById("root")
);
