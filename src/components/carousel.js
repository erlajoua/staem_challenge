import React from 'react'
import '../styles/carousel.css'

export const Carousel = ({ games }) => {
    return (
        <div className="main-carousel">
            {games.map((elem, index) => (
                <span key={index}>{elem.title}</span>
            ))}
        </div>
    )
}