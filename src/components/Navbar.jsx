import React from 'react'
import styled, { css } from "styled-components"
import { Link } from 'react-router-dom'
import './Navbar.css'
const Container = styled.div`
    height:55px;
    background-color: #eee;
`
const Wrapper = styled.div`
    display:flex;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
`

const Left = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60%;
`

const Logo = styled.h1`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bold;
    font-size: 25px;
    text-decoration: underline #2d61f1;
    color:#2d61f1;
    @media only screen and (max-width: 820px){
        font-size: 20px;
        text-indent:-9999px;
        &:before{
           text-indent:0;
           content: "JD";
           float:left;
           text-decoration: underline orange;
        }
    }
`
const Menu = styled.ul`
    display:flex;
    justify-content: space-between;
    width: 70%;
    list-style: none;
    @media only screen and (max-width:480px) {
        display: none;
    }
`;

const MenuItem = styled.li`
 font-size: 20px;
 padding:5px;
 color:gray;
 font-weight: 700;
 border-radius: 5px;
 cursor: pointer;
 &:hover{
     color:white;
     background-color:#2d61f1;
 }
 @media only screen and (max-width:480px) {
        font-size: 10px;
    }
 
`;

const Button = styled.button`
  padding:10px 15px;
  font-weight: bold;
  background-color:#2d61f1;
  color:white;
  border: solid 2px white;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  @media only screen and (max-width:480px) {
        font-size: 10px;
        border: none;
    }
`;






export default function Navbar() {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Logo>
                            JD Auction House
                    </Logo>
                    <Menu>
                        <MenuItem>
                            <Link className="routeLink" to="/">
                                Home
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link className="routeLink" to="/auctionStore">
                               Store
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link className="routeLink" to="/createAuction">
                                Create Auction
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link className="routeLink" to="/passDeal">
                                Pass Deal
                            </Link>
                        </MenuItem>
                    </Menu>
                </Left>
                <Button>Join Now</Button>
            </Wrapper>
        </Container>
    )
}
