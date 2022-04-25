import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '../styles/carousel.css'

import '@splidejs/react-splide/css';


export const Carousel = ({ games }) => {
    return (
        <>
            <Splide options={{
                type: 'loop',
                perPage: 1,
                focus: 'center',
                arrows: false,
                updateOnMove: true,
                padding: '20%',
                drag: false,
                isNavigation: true
            }}
                className="carousel"
            >
                {games.map((elem, index) => (
                    <SplideSlide>
                        <img src={elem.image} alt="Carousel" key={index} />
                    </SplideSlide>
                ))}
            </Splide>
        </>
    )
}