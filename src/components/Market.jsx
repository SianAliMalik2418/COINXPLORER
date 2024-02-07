import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Loading from './Loading/Loading';
import { Link } from 'react-router-dom';
import { CryptoContext } from './Context';

function Market() {

    const { selectedCurrency, symbol} = useContext(CryptoContext)


    let [isLoading, setIsLoading] = useState(true)
    let [fetchedData, setFetchedData] = useState([]);
    let [page, setPage] = useState(1)

    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&order=market_cap_desc&per_page=10&page=${page}&sparkline=false&locale=en`;

    function handlePages(e) {
        var pageNumber = e.target.id
        setPage(pageNumber);

    }

    useEffect(function () {
        async function fetchData() {
            let { data } = await axios.get(url);
            setFetchedData(data);
            setIsLoading(false);
        }

        fetchData();

    }, [page, selectedCurrency, symbol])


    return (
        <>
            <div className=' py-8 px-10 font-bold overflow-auto smd:px-2' id='market-updates'>
                <h1 className='text-5xl mb-5 md:text-3xl'>Market Update</h1>
                <div className='market-top-content gap-3 flex flex-col '>

                    <div className=' bg-gradient-to-r from-[#4C00F9] via-[#9800F2] to-[#e204ed] flex  justify-between   p-4 text-xl md:w-[990px] rounded-t-md '>
                        <h1 className='w-44  p-2'>Coin</h1>
                        <h1 className='p-2  '>Price</h1>
                        <h1 className=' text-center p-2'>24h Change</h1>
                        <h1 className=' p-2 '>Market Cap</h1>
                    </div>

                    {isLoading ? (
                        <div className='flex items-center justify-center my-4'><Loading /></div>
                    ) : (
                        <>
                            {fetchedData.map(function ({ id, image, name, current_price, price_change_percentage_24h, market_cap }) {

                                var changedPriceColor = '';
                                if (price_change_percentage_24h > 0) {
                                    changedPriceColor = 'text-[#0ECB81]';
                                } else {
                                    changedPriceColor = 'text-[#FF0217]';
                                }



                                const formattedPrice = current_price.toLocaleString();
                                const formattedMarketCapValue = market_cap / 1e6; // Divide by 1,000,000 to get the value in millions
                                const formattedMarketCap = `$${formattedMarketCapValue.toLocaleString()}M`;
                                const formatted24hChangePercentage = price_change_percentage_24h.toFixed(2);

                                return (
                                    <Link to={`/coin/${id}`} key={id} className=' p-5 pr-5  overflow-x-auto coin-details text-xl flex justify-between items-center md:w-[1000px]'>
                                        <div className='flex items-center gap-3  w-56  p-2'>
                                            <img src={image} className=' w-14 h-14 object-contain' alt={name} />
                                            <h1>{name}</h1>
                                        </div>

                                        
                                            <h1 className=' p-2 w-56   centeredFlex'>{`${symbol} ${formattedPrice}`}</h1>
                                            <h1 className={`w-[128px]  p-2  centeredFlex ${changedPriceColor}`}>{`${formatted24hChangePercentage} %`}</h1>
                                            <h1 className=' w-[240px]   centeredFlex '>{`${formattedMarketCap}`}</h1>
                                        

                                    </Link>
                                )

                            })}

                            <div className='flex items-center justify-center  p-[20px] my-[20px] font-semibold'>
                                <a className='pagination-btn' onClick={handlePages} href="#market-updates" id='1'>1</a>
                                <a className='pagination-btn' onClick={handlePages} href="#market-updates" id='2'>2</a>
                                <a className='pagination-btn' onClick={handlePages} href="#market-updates" id='3'>3</a>
                                <a className='pagination-btn' onClick={handlePages} href="#market-updates" id='4'>4</a>
                                <a className='pagination-btn' onClick={handlePages} href="#market-updates" id='5'>5</a>


                            </div>
                        </>

                    )}






                </div>

            </div>

        </>

    )
}

export default Market