import React from 'react'
import styled from 'styled-components'

const Square = styled.div`
    width: 50px;
    height: 50px;
    background-color: #ffbb00;
    opacity:0.7;
    position:absolute;
    top:-60px;
    left:-60px;
    z-index:-1;
    animation: square 20s linear alternate infinite;
    @keyframes square {
        to{
            transform: translate(100vw, 100vh);
        }
    }
`

const Rect = styled.div`
    width: 50px;
    height: 100px;
    background-color: #ff9100;
    opacity:0.7;
    position:absolute;
    top:400px;
    left:-60px;
    z-index:-1;
    animation: rect 25s linear alternate infinite;
    @keyframes rect {
        to{
            transform: translate(100vw, -50vh);
        }
    }
`
const Circle = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #d9ff00;
    opacity:0.7;
    position:absolute;
    top:200px;
    left:-100px;
    z-index:-1;
    animation: circle 15s linear alternate infinite;
    @keyframes circle {
        to{
            transform: translate(100vw, -60vh);
        }
    }
`


export default function AnimatedShapes() {
    return (
        <>
            <Square />
            <Circle />
            <Rect />
        </>
    )
}