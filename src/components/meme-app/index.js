import React, { useEffect, useState } from "react";
import "./MemeApp.css";

import Meme from "../meme";

function MemeApp() {
    const [memes, setMemes] = useState({ loading: true, memes: [] });
    const [currPage, setCurrPage] = useState(1);
    const [memesPerPage, setMemesPerPage] = useState(10);

    function fetchMemez() {
        setMemes(({ memes }) => ({ loading: true, memes }));
        setCurrPage(1);
        fetch("https://meme-api.herokuapp.com/gimme/100")
            .then(r => r.json())
            .then(d => {
                d.loading = false;
                setMemes({ loading: d.loading, memes: d.memes });
                localStorage.setItem("memez_data", JSON.stringify(d));
            });
    }

    function prevMemez() {
        setCurrPage(prev => (prev <= 1 ? 1 : prev - 1));
    }

    function nextMemez() {
        let maxPage = Math.ceil(memes.memes.length / memesPerPage);
        setCurrPage(prev => (prev === maxPage ? maxPage : prev + 1));
    }

    function handlePerPage(e) {
        setCurrPage(1);
        setMemesPerPage(e.target.value);
    }

    useEffect(() => {
        if (localStorage.getItem("memez_data")) {
            setMemes({
                loading: false,
                memes: JSON.parse(localStorage.getItem("memez_data")).memes
            });
            return;
        }
        fetchMemez();
    }, []);

    return (
        <div className="App">
            {memes.loading ? (
                <h1>Loading...</h1>
            ) : (
                memes.memes
                    .slice(
                        (currPage - 1) * memesPerPage,
                        currPage * memesPerPage
                    )
                    .map(items => {
                        return <Meme {...items} />;
                    })
            )}
            {/* <button onClick={fetchMemez}>fetch the memez</button>
            <button onClick={() => setCurrPage(1)}>first page</button>
            <button onClick={prevMemez}>prev page</button>
            <button onClick={nextMemez}>next page</button>
            <button
                onClick={() =>
                    setCurrPage(Math.ceil(memes.memes.length / memesPerPage))
                }
            >
                last page
            </button>

            <h1>{currPage}</h1>
            <input
                type="number"
                name="nums"
                onChange={handlePerPage}
                value={memesPerPage}
            /> */}
        </div>
    );
}

export default MemeApp;
