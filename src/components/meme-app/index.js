import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import "./MemeApp.css";

import Meme from "../meme";
import SavedMeme from "../saved-meme";
import Nav from "../nav";

function MemeApp() {
    // handle storing memez
    const [memes, setMemes] = useState({ loading: true, memes: [], count: 0 });
    useEffect(() => {
        if (localStorage.getItem("memez_data")) {
            const memeFromLocal = JSON.parse(
                localStorage.getItem("memez_data")
            );
            setMemes({
                loading: false,
                count: memeFromLocal.count,
                memes: memeFromLocal.memes
            });
            return;
        }
        fetchMemez();
    }, []);

    // handle sorting memez from search
    const [search, setSearch] = useState("");
    const [res, setRes] = useState([]);
    useEffect(() => {
        if (!search) return;
        setRes(
            memes.memes.filter(e => {
                let res = true;
                for (let s of search.split(" ")) {
                    if (!e.title.toLowerCase().includes(s.toLowerCase()))
                        res = false;
                }
                return res;
            })
        );
    }, [search, memes.memes]);

    // handle scrolling ad infinitum
    const [intersect, setIntersect] = useState(false);
    const butRef = useRef();
    useLayoutEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => setIntersect(e.isIntersecting));
        });
        if (!memes.loading && butRef.current) observer.observe(butRef.current);
    });

    useEffect(() => {
        if (intersect && !search) fetchMemez();
    }, [intersect, search]);

    // func for fetching memez
    function fetchMemez() {
        setMemes(({ memes, count }) => ({ loading: true, memes, count }));
        fetch("https://meme-api.herokuapp.com/gimme/30")
            .then(r => r.json())
            .then(d => {
                d.loading = false;
                if (!d.memes) d = { loading: true, count: 0, memes: [] };

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

    // handle saving memes to saved list
    const [saved, setSaved] = useState([]);
    function toggleSaveMeme(meme) {
        const getMeme = saved.filter(d => d.url === meme.url);
        if (getMeme.length === 1) {
            setSaved(prev => prev.filter(i => i.url !== meme.url));
        } else {
            setSaved(prev => [...prev, meme]);
        }
    }

    return (
        <Router>
            <Nav setSearch={setSearch} search={search} />
            <Switch>
                <Route exact path="/">
                    <Redirect to="/discover" />
                </Route>
                <Route path="/discover">
                    <div className="App">
                        <div className="memeGrid">
                            {search
                                ? res.map((items, idx) => {
                                      return (
                                          <Meme
                                              {...items}
                                              key={idx}
                                              toggleSave={toggleSaveMeme}
                                          />
                                      );
                                  })
                                : memes.memes.map((items, idx) => {
                                      return (
                                          <Meme
                                              {...items}
                                              key={idx}
                                              toggleSave={toggleSaveMeme}
                                          />
                                      );
                                  })}
                        </div>
                        {memes.loading && (
                            <div style={{ width: "100%", textAlign: "center" }}>
                                <img
                                    src="https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif"
                                    alt=""
                                />
                            </div>
                        )}
                        <button ref={butRef} onClick={fetchMemez}>
                            fetch the memez
                        </button>
                    </div>
                </Route>
                <Route path="/saved">
                    <SavedMeme {...{ toggleSaveMeme, saved, res, search }} />
                </Route>
            </Switch>
        </Router>
    );
}

export default MemeApp;
