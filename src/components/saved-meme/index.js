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
            <div className="saved_msg">
                <h1>Saved Memes</h1>
                <p>These are the memes that you love</p>
            </div>
            <div className="memeGrid">
                {search
                    ? res.map((items, idx) => {
                          return (
                              <Meme
                                  {...items}
                                  key={idx}
                                  toggleSave={toggleSaveMeme}
                                  saved={
                                      saved.filter(s => s.url === items.url)
                                          .length === 1
                                  }
                                  overlay={true}
                              />
                          );
                      })
                    : saved.map((items, idx) => {
                          return (
                              <Meme
                                  {...items}
                                  key={idx}
                                  toggleSave={toggleSaveMeme}
                                  saved={
                                      saved.filter(s => s.url === items.url)
                                          .length === 1
                                  }
                                  overlay={true}
                              />
                          );
                      })}
            </div>
        </div>
    );
}

export default SavedMeme;
