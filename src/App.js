import React from "react";
import "./index.css";
import ExchangeRate from "./components/ExchangeRate";
import Portfolio from "./components/Portfolio";
import SideList from "./components/SideList";
import CryptoChart from "./components/CryptoChart";
import Header from "./components/Header";

function App() {
  return (
    <div className="flex flex-col ">
      <Header/>
      <div >

      <div className="grid grid-cols-7 gap-4 px-10 py-10 bg-violet-100 mx-10 my-10 rounded-lg overflow-hidden">
      <div className="col-span-5">
      <CryptoChart />
      <div className="grid gap-2 grid-cols-2 ">
      <Portfolio />
      <ExchangeRate />
      </div>
      </div>
      <div className="col-span-2 max-h-screen">
      <SideList />
      </div>
      </div>
      </div>
    </ div >
  );
}

export default App;
