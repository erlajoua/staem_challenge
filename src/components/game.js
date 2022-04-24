import React from 'react'
import '../styles/game.css'

export const Game = ({ game }) => {

    const { image, title, platforms, price, tags } = game;
    return (
        <div className="main-game">
            <img src={image} className="game-image" alt="game" />
            <div className="game-informations">
                <div className="column-left">
                    <h3>{title}</h3>
                    <span>{tags.join(", ")}</span>
                </div>
                <div className="column-right">
                    {platforms[0] === 'Windows' ? <span>W</span> : null}
                    <span>${price}</span>
                </div>
            </div>
        </div>
    )
}