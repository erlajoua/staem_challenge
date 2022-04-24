import React, { useState, useEffect, useRef } from 'react'

import '../styles/list.css'

import { Game } from './game';
import { getGames } from '../utils/supabase';
import { defaultOptions, OPTIONS_FILTERS} from '../utils/const'

export const List = ({ games: data }) => {
    const [games, setGames] = useState(data);
    const loader = useRef(null);
    const options = useRef(defaultOptions)

    const addScroll = () => {
        options.current.limit += 5;
        getGames(setGames, options.current);
    }

    const findBySetting = (setting, value) => {
        if (value === "") value = null;
        options.current.limit = 0;
        options.current[setting] = value;
        getGames(setGames, options.current);
    }

    useEffect(() => {
        const handleObserver = (entries) => { if (entries[0].isIntersecting) addScroll() };
        const observer = new IntersectionObserver(handleObserver, { rootMargin: "20px" });
        if (loader.current) observer.observe(loader.current);
    }, []);

    return (
        <div className="main-list">
            <div className="list-header">
                <div className="list-header-title">
                    <span>{"New & Trending"}</span>
                </div>
                <div className="list-header-buttons">
                    <input type="text" placeholder="Search" className="input" onChange={e => findBySetting("name", e.target.value) } />
                    <div className="list-header-sortby">
                        <span>Sort by :</span>
                        <select className="input" onChange={e => { findBySetting("filter", e.target.value) }}>
                            {OPTIONS_FILTERS.map((option, index) => (
                                <option value={option.value} key={index} className="input">{option.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className='list-content'>
                {
                    games.length > 0 ?
                        games.map((game, index) => (
                            <Game key={index} game={game} />
                        ))
                        :
                        <span>No result found.</span>
                }
            </div>
            <div ref={loader} />
        </div>
    )
}