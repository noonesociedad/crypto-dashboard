import React, { useEffect, useState } from 'react';
import axios from 'axios';
import up from "../up.png"
import down from "../down.png"

const SideList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then(response => {
        setLoading(false);
        setData(response.data);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      });
  }, []);

  return (
    <div className="bg-white px-4 py-4 ">
      <div className="py-4 px-4">
        <h2 className="text-xl font-bold">Cryptocurrency by market cap</h2>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="overflow-y-auto max-h-screen no-scrollbar">
          {data.map(coin => (
           <div key={coin.id} className="flex py-4 border-b-2 border-slate-200 justify-between px-4">
           <div>
             <div className="flex">
               <img src={coin.image} alt={coin.name} width="25" height="25" />
               <span>{coin.name}</span>
             </div>
             <span className="text-base font-light ">Market Cap:</span>
             <span className="text-base font-light ml-1">{coin.market_cap}</span>
           </div>
           <h5 className="text-lg">
             <div className="flex">
               {coin.price_change_percentage_24h > 0 ? (
                 <img src={up} className="w-4" alt='up' />
               ) : (
                 <img src={down} className="w-4" alt='down' />
               )}
               {Math.abs(coin.price_change_percentage_24h)}%
             </div>
           </h5>
         </div>         
          ))}
        </div>
      )}
    </div>
  );
};

export default SideList;