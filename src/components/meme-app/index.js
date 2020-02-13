import React, { useEffect, useState, useLayoutEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import "./MemeApp.css";

import Meme from "../meme";
import SavedMeme from "../saved-meme";
import Nav from "../nav";

function MemeApp() {
    let location = useLocation();

    // handle storing memez
    const [memes, setMemes] = useState({ loading: true, memes: [], count: 0 });
    useEffect(() => {
        // caching last loaded meme data
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

    // reset search when changing route
    useEffect(() => {
        setSearch("");
    }, [location]);

    // handle scrolling ad infinitum
    const [intersect, setIntersect] = useState(false);
    useLayoutEffect(() => {
        if (location.pathname !== "/discover") return;
        const trigger = document.querySelector("#triggerButton");
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => setIntersect(e.isIntersecting));
        });
        trigger && setTimeout(() => observer.observe(trigger), 4000);
    }, [location]);

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
    useEffect(() => {
        const getSavedMemeFromLocal = localStorage.getItem("saved_meme");
        if (getSavedMemeFromLocal)
            setSaved(JSON.parse(getSavedMemeFromLocal).data);
    }, []);

    useEffect(() => {
        localStorage.setItem("saved_meme", JSON.stringify({ data: saved }));
    }, [saved]);

    function toggleSaveMeme(meme) {
        const getMeme = saved.filter(d => d.url === meme.url);
        if (getMeme.length === 1) {
            setSaved(prev => prev.filter(i => i.url !== meme.url));
        } else {
            setSaved(prev => [...prev, meme]);
        }
    }

    return (
        <>
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
                                              saved={
                                                  saved.filter(
                                                      s => s.url === items.url
                                                  ).length === 1
                                              }
                                              overlay={true}
                                          />
                                      );
                                  })
                                : memes.memes.map((items, idx) => {
                                      return (
                                          <Meme
                                              {...items}
                                              key={idx}
                                              toggleSave={toggleSaveMeme}
                                              saved={
                                                  saved.filter(
                                                      s => s.url === items.url
                                                  ).length === 1
                                              }
                                              overlay={true}
                                          />
                                      );
                                  })}
                        </div>
                        {memes.loading && (
                            <div style={{ width: "100%", textAlign: "center" }}>
                                <img
                                    src="https://i.giphy.com/media/T8Dhl1KPyzRqU/giphy.webp"
                                    alt="searching the interwebz"
                                />
                            </div>
                        )}
                        <button id="triggerButton" onClick={fetchMemez}>
                            fetch the memez
                        </button>
                    </div>
                </Route>
                <Route path="/saved">
                    <SavedMeme {...{ toggleSaveMeme, saved, search }} />
                </Route>
            </Switch>
        </>
    );
}

export default MemeApp;
