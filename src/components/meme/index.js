import React from "react";

import "./Meme.css";

function Meme({ subreddit, title, url, toggleSave, saved }) {
    return (
        <div className="memeCard">
            <div className="cardWrapper">
                <div className="meme_imgwrapper">
                    <img height="250" src={url} alt="meme_img" />
                </div>
                <div className="caption">
                    <div className="captionContainer">
                        <div className="captionInfo">
                            <p>{title}</p>
                            <p>/r/{subreddit}</p>
                        </div>
                        <div className="captionSave">
                            <svg
                                width="11"
                                height="15"
                                fill={saved ? "#FFCB15" : "none"}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5.24772 11.354L.5 14.1287V.5h10v13.6287L5.75228 11.354 5.5 11.2066l-.25228.1474z"
                                    stroke="#FFCB15"
                                />
                            </svg>
                            <p
                                onClick={() => {
                                    toggleSave({ title, subreddit, url });
                                }}
                            >
                                {saved ? "Saved" : "Save"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Meme;
