import React, { useState ,useEffect } from 'react'
import styled from 'styled-components'
import Store from '../Store.json'
import {  ethers } from 'ethers'
import BidProduct from '../components/BidProduct'
import RevealProduct from '../components/RevealProduct'
import Grid from '@material-ui/core/Grid';



const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
`

const ContainerItem = styled.div`
    width: 80%;
    padding:10px;
    @media only screen and (max-width:560px) {
        width: 100%;
    }
`

const Title = styled.h1`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bold;
    color:#2d61f1;
`
const ProductTitle = styled.h3`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bold;
    color:#2d61f1;
`
const ProductContainer = styled.div`
`
const ProductImg = styled.img`
    width:100px;
    height: 100px;
`
const ProductName = styled.div`
`
const Start = styled.div`
`
const End = styled.div`
`
const Price = styled.div`
`
const Address = process.env.REACT_APP_Contract_Address
export default function AuctionStore() {
    let [productsList, setProductsList] = useState([])
    const [revealProductList, setRevealProductList]= useState([])
    const requestAccount = async () => {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
    }
    useEffect(() => {
        async function callProduct(){
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(Address, Store.abi, signer)
            const newProductList = [];
            const revealProducts=[]
            let a = await contract.getProductNumber()
            a = a.toNumber()
            while (a>0) {
                let item = await contract.getProduct(a)
                console.log(item)
                if (item[6].toNumber() * 1000 > Date.now()) {
                    newProductList.push(item)
                } else {
                    if (item[8] === 0 ) {
                        revealProducts.push(item)
                    }
                }
                a--
            }
            setProductsList(newProductList)
            setRevealProductList(revealProducts)
        }
        callProduct()
    }, [])
    
    return (
        <Container>
            <ContainerItem>
                <Title>Auction Store</Title>
                <ProductTitle>Product</ProductTitle>
                <br />
                <Grid container >
                    {   productsList.length ?
                            productsList.map(item => (
                                <Grid xs={6} sm={ 6 } lg={ 3 }>
                                    <BidProduct item={ item }/>    
                                </Grid>
                        )  
                    ):
                        <div>No Any Product in the Store!</div>
                    }
                </Grid>
                
                    
                <br />
                <ProductTitle>Reveal Stage</ProductTitle>
                <br />
                 <Grid container >
                    {   revealProductList.length ?
                        revealProductList.map(item => (
                            <Grid xs={6} sm={ 6 } lg={ 3 }>
                                <RevealProduct item={ item }/>
                            </Grid>
                        )) :
                        <div>No Any Product is Waitting For Reveal!</div>
                    }
                </Grid>
            </ContainerItem>
        </Container>
    )
}
