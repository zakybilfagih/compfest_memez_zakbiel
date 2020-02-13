import React from "react";

import Meme from "../../meme";

import "./MemeOverlay.css";

function MemeOverlay(memeData) {
    return (
        <div className="memeOverlay">
            <Meme {...memeData} overlay={false} />
        </div>
    );
}

export default MemeOverlay;
