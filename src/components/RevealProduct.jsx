import React, { useState ,useEffect } from 'react'
import styled from 'styled-components'
import Store from '../Store.json'
import {  ethers } from 'ethers'
import Modal from '@material-ui/core/Modal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ProductCondition =['New' , 'Used']
const font = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
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
const ModalTemplate = styled.div`
    position: absolute;
    top:0;
    right:0;
    bottom: 0;
    left:0;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70vw;
    height: 70vh;
    background-color: #fff;
`

const ModalTemplateLeft = styled.img`
    width: 300px;
    height: 400px;
    margin:0 10px;
`

const ModalTemplateRight = styled.div`
   
`
const ModalProductName = styled.div`
    padding-bottom:5px;
    font-family: ${font};
    font-size: 30px;
    font-weight: bold;
`

const ModalProductDesc = styled.div`
    padding-bottom:5px;
    font-family: ${font};
    color:#999;
`
const ModalProductText = styled.div`
    padding-bottom:5px;
`

const ModalProductButton = styled.button`
    display: block;
    width: 50%;
    padding:5px 0;
    margin: 5px 25%;
    text-align: center;
    color:white;
    font-weight: bold;
    background: linear-gradient(#64d3e6, #2d61f1);
    border:none;
    border-radius: 10px;
    outline: none;
`
const Address = process.env.REACT_APP_Contract_Address
export default function RevealProduct({ item }) {
    const [open, setOpen] = useState(false)
    const [openAlert, setOpenAlert] = useState(false);
    const [error, setError] = useState(false);

     const handleOpen = () => {
        setOpen(true);
    };

    const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

    const handleClose = () => {
        setOpen(false);
    };

     const requestAccount = async () => {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(Address, Store.abi, signer)
            
            try {
                await contract.finalizaAuction(
                    item[0].toNumber()
                )
                setError(false);
                setOpenAlert(true);
            } catch (err) {
                console.log(err)
                setError(true);
                setOpenAlert(true);
            }
        }
    }

    const convertTime = (timeStamp) => {
        const date = new Date(timeStamp * 1000)
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const year = date.getFullYear()
        const month = months[date.getMonth()]
        const day = date.getDate()
        const hour = date.getHours()
        const min = date.getMinutes()
        const sec = date.getSeconds() > 10 ? date.getSeconds() : `0${date.getSeconds()}`
        
        return `${month}/${day} ${year}, ${hour}:${min}:${sec}`
    }
    return (
        <div>
            <ProductContainer onClick={ handleOpen }>
                <ProductImg src={ item[3]}/>
                <ProductName>
                    {item[1]}
                </ProductName>
                <BidTime>
                    Waiting for Reveal
                </BidTime>
            </ProductContainer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <ModalTemplate>
                    <ModalTemplateLeft src={item[3]} />
                    <ModalTemplateRight>
                        <ModalProductName>
                            { item[1] }
                        </ModalProductName>
                        <ModalProductDesc>{item[4]}</ModalProductDesc>
                        <ModalProductText >Type: {item[2]}</ModalProductText >
                        <ModalProductText >
                            {`Start time: ${convertTime(item[5].toNumber())}`}
                        </ModalProductText >
                        <ModalProductText >
                            {`End time: ${convertTime(item[6].toNumber())}`}
                        </ModalProductText>
                        <ModalProductText >
                            {`Start Price: ${ethers.utils.formatEther(item[7])} ETH`}
                        </ModalProductText >
                        <ModalProductText >
                            {`Condition:${ProductCondition[item[9]]}`}
                        </ModalProductText >
                        <form onSubmit={ formSubmit }>
                            
                            <ModalProductButton  type="submit">
                                End The Aution
                            </ModalProductButton >
                        </form>
                    </ModalTemplateRight>
                </ModalTemplate>
                {/* <div>
                    <form onSubmit={ formSubmit }>
                        <button type="submit">
                            End The Aution
                        </button>
                    </form>
                </div> */}
            </Modal>
            <Snackbar
                anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleCloseAlert}>
                {error ? 
                    <Alert severity="error" onClose={handleCloseAlert} sx={{ width: '100%' }}>
                        Error was came! Make sure you are the product provider!
                    </Alert> :
                    <Alert severity="success" onClose={handleCloseAlert} sx={{ width: '100%' }}>
                        Reveal Successful!
                    </Alert> 
                }
                
            </Snackbar>
            
        </div>
    )
}
