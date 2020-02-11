import React from "react";
import { Link } from "react-router-dom";

import "./Nav.css";

function Nav({ search, setSearch }) {
    return (
        <div className="Nav">
            <div className="nav_container">
                <div className="nav_logo">
                    <h3>
                        <Link to="/discover">PACIL-GAG</Link>
                    </h3>
                </div>
                <div className="nav_search">
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search some juicy memez..."
                    />
                </div>
                <div className="nav_nav">
                    <ul>
                        <li>
                            <Link to="/discover">Discover</Link>
                        </li>
                        <li>Saved Meme</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Nav;
