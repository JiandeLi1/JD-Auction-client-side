import React from 'react'
import styled, { css } from "styled-components"
import AnimatedShapes from '../components/AnimatedShapes'
import JDAuctionHouse from '../img/JDAuctionHouse.png'

const Container = styled.div`
    width: 100vw;
    height: calc(100vh - 55px);
    overflow: hidden;
`

const BodyContainer = styled.div`
    display: flex;
    height: 100%;
   
`
const Left = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    
`
const Image = styled.img`
    height:50%;
`
const Right = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    width: 50%;
    height: 100%;
`
const TextArea = styled.div`
    margin: 10px;
    color:#2d61f1;
`

const Text = styled.label`
    font-size: 25px;
    font-weight: bold;
`

export default function Home() {
    return (
        <Container>
            <AnimatedShapes />
            <BodyContainer>
                <Left>
                    <Image src={ JDAuctionHouse } />
                </Left>
                <Right>
                    <TextArea><Text>Fair</Text> Auction</TextArea>
                    <TextArea><Text>Amazing</Text> NFT</TextArea>
                </Right>
            </BodyContainer>
        </Container>    
    )
}
