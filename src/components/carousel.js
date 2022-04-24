import React from 'react'
import '../styles/carousel.css'

export const Carousel = ({ games }) => {
    return (
        <div className="main-carousel">
            <h1>Carousel WORKING IN PROGRESS</h1>
            {games.map((elem, index) => (
                <span key={index}>{elem.title}</span>
            ))}
        </div>
    )
}