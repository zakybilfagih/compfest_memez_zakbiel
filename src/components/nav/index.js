import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import "./Nav.css";

function Nav({ search, setSearch }) {
    const [toggle, setToggle] = useState(false);
    return (
        <div className="Nav">
            <div className="nav_container">
                <div className="nav_logo">
                    <h3>
                        <Link to="/discover">PACIL-GAG</Link>
                    </h3>
                    <div
                        className="nav_toggle"
                        onClick={() => setToggle(prev => !prev)}
                    >
                        <p>toggle</p>
                    </div>
                </div>
                <div
                    className="nav_content"
                    style={{ maxHeight: toggle ? "200px" : "0px" }}
                >
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
                                <NavLink
                                    to="/discover"
                                    activeStyle={{
                                        color: "white",
                                        opacity: 1
                                    }}
                                >
                                    Discover
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/saved"
                                    activeStyle={{
                                        color: "white",
                                        opacity: 1
                                    }}
                                >
                                    Saved Meme
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Nav;
