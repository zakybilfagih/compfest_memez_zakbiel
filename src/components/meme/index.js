import React, { useState } from "react";

import "./Meme.css";
import MemeOverlay from "./meme-overlay";

function Meme(props) {
    const [clicked, setClicked] = useState(false);
    const {
        subreddit,
        title,
        url,
        postLink,
        toggleSave,
        saved,
        overlay
    } = props;
    console.log(props);
    return (
        <div className="memeCard">
            <div className="cardWrapper">
                <div
                    className="meme_imgwrapper"
                    onClick={() => {
                        if (!overlay) return;
                        setClicked(true);
                    }}
                >
                    <img height="250" src={url} alt="meme_img" />
                </div>
                <div
                    className="caption"
                    style={
                        !overlay
                            ? {
                                  position: "initial",
                                  maxHeight: "initial",
                                  marginBottom: "0"
                              }
                            : null
                    }
                >
                    <div className="captionContainer">
                        <div className="captionInfo">
                            <p>
                                <a href={postLink}>{title}</a>
                            </p>
                            <p>/r/{subreddit}</p>
                        </div>
                        <div
                            className="captionSave"
                            onClick={() => {
                                toggleSave({ title, subreddit, url });
                            }}
                        >
                            <svg
                                width="12"
                                height="15"
                                fill={saved ? "#FFCB15" : "none"}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5.24772 11.354L.5 14.1287V.5h10v13.6287L5.75228 11.354 5.5 11.2066l-.25228.1474z"
                                    stroke="#FFCB15"
                                />
                            </svg>
                            <p>{saved ? "Saved" : "Save"}</p>
                        </div>
                    </div>
                </div>
            </div>
            {clicked && (
                <div>
                    <div
                        className="overlay"
                        onClick={e => {
                            e.stopPropagation();
                            console.log("im backb");
                            setClicked(false);
                        }}
                    ></div>
                    <MemeOverlay {...props} />
                </div>
            )}
        </div>
    );
}

export default Meme;
