import React, { useState ,useEffect } from 'react'
import styled from 'styled-components'
import Store from '../Store.json'
import { ethers } from 'ethers'
import Grid from '@material-ui/core/Grid';

const Title = styled.h1`
    width:calc(100vw - 20px);
    margin: 10px 0; 
    color:#2d61f1;
    text-align: center;
`
const ProductCondition =['New' , 'Used']
const font ="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding:10px;
    overflow: hidden;
    text-overflow: ellipsis;
    border-radius: 10px;
    &:hover{
        background-color: #eee;
    }
`
const ProductImg = styled.img`
    width:150px;
    height: 200px;
    margin-bottom: 5px;
`
const ProductName = styled.div`
    margin-bottom: 5px;
`
const Start = styled.div`
    margin-bottom: 5px;
`
const End = styled.div`
    margin-bottom: 5px;
`
const Price = styled.div`
    margin-bottom: 5px;
`

const BidTime = styled.div`
    width: 50%;
    padding:5px 0;
    text-align: center;
    color:white;
    font-weight: bold;
    background: linear-gradient(#64d3e6, #2d61f1);
    border:none;
    border-radius: 10px;
    outline: none;
`
const Address = process.env.REACT_APP_Contract_Address
export default function PassDeal() {
    const [passProduct, setPassProduct] = useState([])
    const requestAccount = async () => {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
    }
    useEffect(() => {
        async function callProduct(){
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(Address, Store.abi, signer)
            const products = [];
            let a = await contract.getProductNumber()
            a = a.toNumber()
            while (a>0) {
                let item = await contract.getProduct(a)
                
                if (item[8] !== 0) {
                    let i = await contract.getWinner(a)
                    console.log(i)
                        products.push([item,i])
                    }
                
                a--
            }
            console.log(products)
            setPassProduct([...products])
            
        }
        callProduct()
    }, [])
    return (
        <div>
            {/* <Grid container >
            {
            passProduct?.length ? 
                    passProduct.map(item => (
                        <div>{ item[1] }</div>
                    )):<div>no product</div>
            
            }
            </Grid> */}
            <Title>Pass Product</Title>
            <Grid container >
                
                <Grid xs={0} sm={0} md={2} />
                <Grid xs={12} sm={12} md={8} >
                    {   passProduct?.length ? 
                            passProduct.map(item => (
                                <Grid xs={6} sm={ 6 } md={ 3 }>
                                <ProductContainer>
                                    <ProductImg src={item[0][3]}/>
                                     <ProductName>
                                        {`Name: ${item[0][1]}`}
                                    </ProductName>
                
                                <BidTime>
                                    { `End Price: ${ethers.utils.formatEther(item[1][1])} ETH`}
                                </BidTime>
                                </ProductContainer>  
                                </Grid>
                        )  
                    ):
                        <div>No Any Product in the Store!</div>
                }
                </Grid>
                <Grid xs={0} sm={0} md={2} />
            </Grid>
        </div>
    )
}
