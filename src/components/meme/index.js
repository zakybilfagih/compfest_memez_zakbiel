import React from "react";

import "./Meme.css";

function Meme({ subreddit, title, url }) {
    return (
        <div className="memeCard">
            <div className="cardWrapper">
                <img src={url} alt="meme_img" />
                <div className="caption">
                    <div className="captionContainer">
                        <div className="captionInfo">
                            <p>{title}</p>
                            <p>/r/{subreddit}</p>
                        </div>
                        <div className="captionSave">
                            <p>save me</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Meme;
