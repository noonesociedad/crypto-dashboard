import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { exchangeRateFetch } from '../redux/action/action';

const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};

export default function ExchangeRate() {

  //fetching exchange rate datas
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(exchangeRateFetch());
  }, []);
  const exchangeRateData = useSelector((state) => state.exchangeRate);
  // console.log(exchangeRateData.exchangeRateData.rates)

  let data = []
  if (exchangeRateData.exchangeRateData.rates) {
    data.push(exchangeRateData.exchangeRateData.rates)
  }
  // console.log(data[0])
  let dataRates = data[0]

  console.log(data)

  const [coinOne, setCoinOne] = useState("btc");
  const [coinTwo, setCoinTwo] = useState("inr");
  const [coinOneAmount, setCoinOneAmount] = useState(0);
  const [coinOneER, setCoinOneER] = useState(1);
  const [coinTwoER, setCoinTwoER] = useState(0);
  const [price, setPrice] = useState(0);

  const handleCoinOneChange = (event) => {
    setCoinOne(event.target.value);
  };

  const handleCoinTwoChange = (event) => {
    setCoinTwo(event.target.value);
  };

  const handleCoinOneAmountChange = (event) => {
    setCoinOneAmount(event.target.value);
  };


  const ERfunction = () => {

    //taking the exchange rate value for coin one
    for (const i in dataRates) {
      const object = dataRates[i];
      if (i === coinOne) {
        for (const j in object) {
          if (j === "value") {
            setCoinOneER(object[j]);
          }
        }
      }
    }

    //taking the exchange rate value for coin two
    for (const i in dataRates) {
      const object = dataRates[i];
      if (i === coinTwo) {
        for (const j in object) {
          if (j === "value") {
            setCoinTwoER(object[j]);
          }
        }
      }
    }

    //calculatinng the exchange rate and price
    let ER = coinTwoER / coinOneER;
    let price = ER * coinOneAmount;
    setPrice(price);
  };



  //creating data for the dropdown
  let dropdownData = [];
  for (const i in dataRates) {
    const object = dataRates[i];
    for (const j in object) {
      if (j === "name") {
        dropdownData.push({ label: object[j], value: i });
      }
    }
  }


  return (
    <div className="bg-white my-6 p-6 rounded-md">
      <div>
        <h1 className="text-xl font-bold py-2"> Exchange Rate </h1>
        </div>
        {(data.length === 0) ?
          (
            <div>loading......</div>
          ) :
          (
            <div className="flex flex-col">
  <div className="flex items-center">
    <div className="text-orange-600 font-semibold text-xl mr-2"> Sell </div>
    <div className="w-30 mr-2 ">
      <Dropdown
        label=" "
        options={dropdownData}
        value={coinOne}
        onChange={handleCoinOneChange}
        className="w-full"
      />
    </div>
    <div>
      <input
        type="number"
        name="coinOneAmount"
        value={coinOneAmount}
        onChange={handleCoinOneAmountChange}
        placeholder="enter amount"
        className="w-20"
      />
    </div>
  </div>
  <div className="flex items-center pt-4">
    <div className="text-green-600 font-semibold text-xl mr-2">Buy </div>
    <div className="w-30 mr-2">
      <Dropdown
        label=" "
        options={dropdownData}
        value={coinTwo}
        onChange={handleCoinTwoChange}
        className="w-full"
      />
    </div>
    <div className="text-green-400 ">
      {coinOneAmount} {coinOne}={price} {coinTwo}
    </div>
  </div>
  <div className="flex justify-center pt-8">
    <button type="submit" onClick={ERfunction} className="bg-blue-600 text-white py-2 px-3 rounded-md">
      Exchange
    </button>
  </div>
</div>
)}
      </div>
  )
}
