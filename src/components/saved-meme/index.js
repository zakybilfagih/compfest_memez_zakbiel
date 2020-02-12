import React, { useEffect, useState } from "react";

import Meme from "../meme";

import "./SavedMeme.css";

function SavedMeme({ toggleSaveMeme, saved, search }) {
    const [res, setRes] = useState([]);
    useEffect(() => {
        if (!search) return;
        setRes(
            saved.filter(e => {
                let res = true;
                for (let s of search.split(" ")) {
                    if (!e.title.toLowerCase().includes(s.toLowerCase()))
                        res = false;
                }
                return res;
            })
        );
    }, [search, saved]);

    return (
        <div className="SavedMeme">
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
                    : saved.map((items, idx) => {
                          return (
                              <Meme
                                  {...items}
                                  key={idx}
                                  toggleSave={toggleSaveMeme}
                              />
                          );
                      })}
            </div>
        </div>
    );
}

export default SavedMeme;
