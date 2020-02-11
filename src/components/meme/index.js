import React from "react";

function Meme({ subreddit, title, url }) {
    return (
        <div>
            <img src={url} alt="meme_img" style={{ height: "300px" }} />
            <h1>{title}</h1>
            <p>/r/{subreddit}</p>
        </div>
    );
}

export default Meme;
