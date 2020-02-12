import React, { useState } from "react";

import "./Meme.css";

function Meme({ subreddit, title, url, toggleSave }) {
    const [saved, setSaved] = useState(false);

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
                            <p
                                onClick={() => {
                                    setSaved(prev => !prev);
                                    toggleSave({ title, subreddit, url });
                                }}
                            >
                                save me
                            </p>
                            {saved && <p>im saved</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Meme;
