import React, { useState, useEffect, useRef } from 'react'
import '../styles/list.css'
import { Game } from './game';
import { getGames } from '../utils/supabase';

const options = [
    {
        label: "All",
        value: "",
    },
    {
        label: "Price",
        value: "price",
    }
];

export const List = ({ games: data }) => {
    const [games, setGames] = useState(data);
    const limit = useRef(0);
    const loader = useRef(null);
    const filter = useRef(null);

    const addScroll = () => {
        limit.current += 5;
        getGames(setGames, limit.current, filter.current);
    }

    const selectFilter = (value) => {
        limit.current = 0;
        filter.current = value;
        getGames(setGames, limit.current, filter.current);
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
                    <button>Search</button>
                    <div className="list-header-sortby">
                        <span>Sort by :</span>
                        <select onChange={e => { selectFilter(e.target.value !== '' ? e.target.value : null) }}>
                            {options.map((option, index) => (
                                <option value={option.value} key={index}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className='list-content'>
                {
                    games.map((game, index) => (
                        <Game key={index} game={game} />
                    ))
                }
            </div>
            <div ref={loader} />
        </div>
    )
}