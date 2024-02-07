import { useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Chart from './Chart';
import { CryptoContext } from './Context';
import Loading from './Loading/Loading';

function CoinDetails() {


  const { selectedCurrency, symbol} = useContext(CryptoContext)




  const { id } = useParams();
  const url = `https://api.coingecko.com/api/v3/coins/${id}`;

  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState('24h');
  const [chartArray, setChartArray] = useState([]);

  const chartButtons = ['24h', '30d', '90d', '365d', 'max'];

  const switchChartStats = (key) => {
    setDays(key);
    setLoading(true);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(url);
        setCoin(data);
        setLoading(false)

        // Chart API Data Fetching.
        const { data: chartData } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
        );
        setChartArray(chartData.prices);
        setLoading(false)

      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    }

    fetchData();
  }, [id, url, days, selectedCurrency]);


  // Check if coin properties are defined before accessing them
  const formattedPrice = coin.market_data?.current_price[selectedCurrency]?.toLocaleString() || 'N/A';
  const formattedMarketCap = coin.market_data?.market_cap[selectedCurrency]?.toLocaleString() || 'N/A';



  return (
    <div className="gradientBg w-screen h-screen flex items-center justify-center  md:flex-col lg:h-auto  ">
      {loading ?
      <div className='h-screen flex items-center justify-center'>
      <Loading />
      </div>
      
      : (

        <>
          <div className="coinDetailsLeft gap-3 w-[30%]  h-full  flex flex-col items-center justify-center px-5 pb-40 border-r-2 border-white md:border-r-0 md:border-b-2 md:w-screen md:my-20 ">
            <img src={coin.image?.large} alt={coin.id} className="h-40 w-40 mb-5 object-contain" />
            <h1 className="text-4xl font-extrabold mb-3">{coin.name}</h1>
            <p className="mb-5">
              {coin?.description?.en?.split(". ")[0]}.
            </p>
            <div>
            <h1 className="text-xl font-semi-bold self-start md:text-center md:mb-3 ">Rank: #{coin.coingecko_rank}</h1>
            <h1 className="text-xl font-bold self-start md:text-center md:mb-3 ">{`Current Price: ${symbol} ${formattedPrice}`}</h1>
            <h1 className="text-xl font-bold self-start md:mb-3 md:text-center">{`Market Cap: ${symbol} ${formattedMarketCap}`}</h1>
            </div>
            
          </div>

          <div className="coinDetailsRight w-[70%] px-5 pb-24 flex flex-col md:w-screen ">
            <Chart arr={chartArray} days={days} />

            <div className='p-10 flex justify-center items-center flex-wrap'>
              {chartButtons.map((i) => (

                <div key={i}>

                  <button 
                    className="chartBtns px-14 w-20 py-2 bg-transparent flex items-center justify-center border-2 border-white ml-5 mt-10"
                    disabled={days === i}
                    key={i}
                    onClick={() => switchChartStats(i)}
                  >
                    {i}
                  </button>

                </div>

              ))}
            </div>

          </div>
        </>
      )}

    </div>
  );
}

export default CoinDetails;
