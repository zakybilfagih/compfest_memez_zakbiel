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
                        <svg
                            width="26"
                            height="13"
                            viewBox="0 0 26 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                width="26"
                                height="4"
                                rx="2"
                                transform="matrix(1 0 0 -1 0 4)"
                                fill="white"
                            />
                            <rect
                                width="26"
                                height="4"
                                rx="2"
                                transform="matrix(1 0 0 -1 0 13)"
                                fill="white"
                            />
                        </svg>
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
