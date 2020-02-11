import React, { useEffect, useState } from "react";
import "./MemeApp.css";

import Meme from "../meme";

function MemeApp() {
    const [memes, setMemes] = useState({ loading: true, memes: [], count: 0 });
    useEffect(() => {
        if (localStorage.getItem("memez_data")) {
            setMemes({
                loading: false,
                count: JSON.parse(localStorage.getItem("memez_data")).count,
                memes: JSON.parse(localStorage.getItem("memez_data")).memes
            });
            return;
        }
        fetchMemez();
    }, []);

    function fetchMemez() {
        setMemes(({ memes, count }) => ({ loading: true, memes, count }));
        fetch("https://meme-api.herokuapp.com/gimme/10")
            .then(r => r.json())
            .then(d => {
                d.loading = false;
                setMemes(prev => {
                    return {
                        loading: d.loading,
                        count: [...prev.memes, ...d.memes].length,
                        memes: [...prev.memes, ...d.memes]
                    };
                });
                localStorage.setItem("memez_data", JSON.stringify(d));
            });
    }

    return (
        <div className="App">
            {memes.memes.map(items => {
                return <Meme {...items} />;
            })}
            {memes.loading && <h1>Loading..</h1>}
            <button onClick={fetchMemez}>fetch the memez</button>
        </div>
    );
}

export default MemeApp;
