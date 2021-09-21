import { useState } from 'react'
import { ethers } from 'ethers'
import Store from './Store.json'
import './App.css'
import { Switch, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './container/Home'
import CreateAuction from './container/CreateAuction'
import AuctionStore from './container/AuctionStore'
import PassDeal from './components/PassDeal'

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/auctionStore">
          <AuctionStore />
       </Route>
        <Route path="/createAuction">
          <CreateAuction />
        </Route>
        <Route path="/passDeal">
          <PassDeal />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
