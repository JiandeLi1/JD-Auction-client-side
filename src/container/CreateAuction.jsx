import React, { useState, useRef } from 'react'
import { create } from "ipfs-http-client"
import { ethers } from 'ethers'
import Store from '../Store.json'
import styled, { css } from 'styled-components'
import Grid from '@material-ui/core/Grid';
import NoPicture from '../img/NoPicture.png'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/DateTimePicker'
import TextareaAutosize from '@mui/material/TextareaAutosize';

const Title = styled.h1`
    width:calc(100vw - 20px);
    margin: 10px 0; 
    color:#2d61f1;
    text-align: center;
`

const Container = styled.div`
    width: calc(100vw - 50px);
    padding:10px;
`

const Form = styled.form`
    flex:1;
`
const InputContainer = styled.div`
    padding-bottom:10px;
`

const Input = styled.input`
     padding-bottom:5px;
`
const InputPicture = styled.label`
    display:block;
    width: 155px;
    text-align: center;
    padding:6px 10px;
    margin:5px  0;
    color:white;
    font-weight: bold;
    background: linear-gradient(#64d3e6, #2d61f1);
    border-radius: 10px;
`

const TextArea = styled.textarea`
    padding-bottom:5px;
`

const FormContainer = styled.div`
    display:flex;
    padding-left: 10px;
    
`
const ProductPicture = styled.img`
   width: 300px;
   height: 400px;
   padding-right: 10px;
   flex:1;
`

const AddButton = styled.button`
    width: 200px;
    padding:10px 10px;
    margin:5px  0;
    color:white;
    font-weight: bold;
    background: linear-gradient(#64d3e6, #2d61f1);
    border:none;
    border-radius: 10px;
    
`

const Address = process.env.REACT_APP_Contract_Address
const client = create('https://ipfs.infura.io:5001/api/v0')

export default function CreateAuction() {
    const [fileUrl, setFileUrl] = useState(`https://bafybeiecvlsxvcqp2waezkdgliynmgkxytaohvw6iyfnddfnv3zdq6ieeu.ipfs.infura-ipfs.io/`)
    const uploadPhoto = useRef(null)
    const [name, setName] = useState()
    const [desc, setDesc] = useState()
    const [category, setCategory] = useState('Art')
    const [startPrice, setStartPrice] = useState()
    const [condition, setCondition] = useState(0)
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState('0.00347')
    
    const requestAccount = async () => {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        // const file = uploadPhoto.current.files[0]
        // console.log(file)
        // try {
        //     const added = await client.add(file)
        //     const url = `https://ipfs.infura.io/ipfs/${added.path}`
        //     console.log(url)
        //     await setFileUrl(url)
        //     console.log(fileUrl)
        // } catch (error) {
        //     console.log('Error uploading file ',error )
        // }
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            console.log(await signer.getAddress())
            const contract = new ethers.Contract(Address, Store.abi, signer)
            // console.log( name,
            //          category,
            //          fileUrl,
            //          desc,
            //          Math.floor(Date.parse(startTime) /1000),
            //          Math.floor(Date.parse(startTime) /1000) + endTime*24*60*60,
            //          startPrice,
            //         condition)
            console.log(contract.address)
            try {
                await contract.addProductToStore(
                     name,
                     category,
                     fileUrl,
                     desc,
                     Math.floor(Date.parse(startTime) /1000),
                     Math.floor(Date.parse(startTime) /1000) + Math.floor(endTime*24*60*60),
                     ethers.utils.parseEther(`${startPrice}`),
                    condition
                )
                
            } catch (err) {
                console.log('Pleas enter the correct type for options!')
            }
        }
    }
    return (
        <div>
            <Container>
                <Title>Create Auction</Title>
                <Grid container >
                    <Grid xs={0} sm={0} md={3} />
                <Grid xs={12} sm={12} md={6}>
                <FormContainer>
                    {fileUrl ?
                            <ProductPicture src={fileUrl}></ProductPicture> :
                            <ProductPicture src={NoPicture}></ProductPicture>}        
                <Form onSubmit={e=> formSubmit(e) }>
                    <InputContainer>
                        <TextField
                            type="text"
                            onChange={e => setName(e.target.value)}
                            label="Product Name"
                            variant="standard"
                            style={{ width: 250 }}            
                            required />
                    </InputContainer>
                    <InputContainer>
                        <TextareaAutosize
                            minRows={3}
                            maxRows={4}            
                            aria-label="maximum height"
                            placeholder="Enter Description"
                            style={{ width: 250 }}
                            onChange={e => setDesc(e.target.value)}
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <InputPicture for="product-img">Upload product photo</InputPicture>
                        <input type="file" style={{display:"none"}} id="product-img" ref={ uploadPhoto }/>
                    </InputContainer>
                    {/* <InputContainer>
                                    
                        <label>Category: </label>
                        <select onChange={ e=>setCategory(e.target.value)}>
                            <option value='Art'>Art</option>
                            <option value='Other'>Other</option>
                        </select>
                                </InputContainer> */}
                    <FormControl variant="standard" sx={{ margin:"10px 0", minWidth: 250 }}>
                    <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={category}
                        onChange={ e=>setCategory(e.target.value)}
                        label="Age"
                    >
                        <MenuItem value='Art'>Art</MenuItem>
                        <MenuItem value='Other'>Other</MenuItem>
                    </Select>
                    </FormControl>
                    <InputContainer>
                        <TextField
                            onChange={e => setStartPrice(e.target.value)}
                            pattern="[0-9]{1,5}"
                            title="Enter number only and the number need to less than 5 digits!"
                            label="Start Price"
                            variant="standard"
                            style={{ width: 250 }}                        
                            required />
                    </InputContainer>
                    {/* <InputContainer>
                        <label>Procuct Condition: </label>
                        <select onChange={ e=>setCondition(e.target.value)}>
                            <option value="0">New</option>
                            <option value="1">Used</option>
                        </select>
                                </InputContainer> */}

                                
                                <FormControl variant="standard" sx={{ margin:"10px 0", minWidth: 250 }}>
                    <InputLabel id="demo-simple-select-standard-label">Condition</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={condition}
                        onChange={ e=>setCondition(e.target.value)}
                        label="Condition"
                    >
                        <MenuItem value="0">New</MenuItem>
                        <MenuItem value="1">Used</MenuItem>
                    </Select>
                    </FormControl>
                    {/* <InputContainer>
                        <label>Auction start time: </label>
                        <input type="datetime-local" onChange={ e=>setStartTime(e.target.value)} required/>
                                </InputContainer> */}
                    <div style={{margin:"10px 0"}}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="DateTimePicker"
                        value={startTime}
                        onChange={ e=>setStartTime(e)}
                    />
                    </LocalizationProvider>
                    </div>
                    {/* <InputContainer>
                        <label>Days to run the auction: </label>
                        <select onChange={e => setEndTime(e.target.value)}>
                            <option value="0.00347">5mins</option>
                            <option value="1">1</option>
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="7">7</option>
                        </select>
                    </InputContainer> */}
                    <FormControl variant="standard" sx={{ margin:"10px 0",minWidth: 250 }}>
                    <InputLabel id="demo-simple-select-standard-label">End Time</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={endTime}
                        onChange={e => setEndTime(e.target.value)}
                        label="endTime"
                    >
                        <MenuItem value="00.00347">5 mins</MenuItem>
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="7">7</MenuItem>
                    </Select>
                    </FormControl>
                    <InputContainer>         
                            <AddButton type="submit">
                                    Add Product to Store
                            </AddButton>
                    </InputContainer>
                        </Form>
                </FormContainer>            
                </Grid>
                <Grid xs={0} sm={0} md={ 3 } />
                </ Grid>
            </Container>

            {/* {fileUrl ? <img src={ fileUrl }></img> : <img src={ NoPicture }></img>} */}
            
        </div>
    )
}
