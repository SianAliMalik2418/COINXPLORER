import axios from "axios";
import { IoMdArrowDropdown } from "react-icons/io";
import bitcoinImg from "../assets/Images/bitcoin.png";
import ethereumImg from "../assets/Images/ethereum.png";
import React, { useContext, useEffect, useState } from "react";
import Loading from "./Loading/Loading";
import { CryptoContext } from "./Context";

function Hero() {
    const { selectedCurrency, symbol } =
        useContext(CryptoContext);

    const homeUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&order=market_cap_desc&per_page=4&page=1&sparkline=false&locale=en`;

    let [homeFetchedData, setHomeFetchedData] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    useEffect(
        function () {
            async function homeFetchData() {
                let { data } = await axios.get(homeUrl);
                setHomeFetchedData(data);
                setIsLoading(false);
            }

            homeFetchData();
        },
        [selectedCurrency]
    );

    return (
        <div
            className="w-screen h-screen flex flex-col items-center  justify-center p-20"
            id="home"
        >
            {/* Main Headings */}
            <div className="flex flex-col items-center sm:justify-center mb-10 sm:mt-48  ">
                <div className="flex gap-8 items-center ">
                    <img
                        src={ethereumImg}
                        className="smd:hidden coinFloat w-16 h-16 object-contain"
                        alt=""
                    />
                    <h1 className="text-8xl text-white  whitespace-nowrap  font-medium mb-3 lg:text-5xl sm:text-5xl xsm:text-3xl">
                        TRACK AND TRADE
                    </h1>
                    <img
                        src={bitcoinImg}
                        className=" smd:hidden coinFloat w-16 h-16 object-contain"
                        alt=""
                    />
                </div>

                <h1 className="text-8xl lg:text-6xl whitespace-nowrap gradientText font-medium smd:whitespace-normal smd:text-center  smd:bg-blue-600 sm:text-6xl xsm:text-4xl">
                    CRYPTO CURRENCIES
                </h1>
            </div>

            {/* Top Currencies Display */}

            <div className=" h-48 w-screen  flex px-3 items-center justify-center  md:h-96 smd:flex-wrap smd:h-[50vh] text-white font-semibold mb-12">
                {isLoading ? (
                    <div className="centredFlex  ">
                        <Loading />

                    </div>
                ) : (
                    homeFetchedData.map(function (data) {
                        var changedPriceColor = "";
                        if (data.price_change_percentage_24h >= 0) {
                            changedPriceColor = "text-[#0ECB81]";
                        } else {
                            changedPriceColor = "text-[#FF0217]";
                        }

                        // Format current_price with commas
                        const formattedPrice = data.current_price.toLocaleString();

                        // Format price_change_percentage_24h with two decimal places
                        const formattedPercentage =
                            data.price_change_percentage_24h.toFixed(2);

                        return (
                            <div key={data.id} className="flex mt-5 sm:hidden flex-col items-center w-72">
                                <img
                                    src={data.image}
                                    className="  w-24 h-24 object-contain"
                                    alt=""
                                />

                                <div className="flex items-center justify-center gap-1 mb-1 mt-2">
                                    <p>{data.name}</p>
                                    <span
                                        className={` ml-1 text-xl ${changedPriceColor}`}
                                    >{`${formattedPercentage}%`}</span>
                                </div>

                                <p className="text-lg">{`${symbol} ${formattedPrice}`}</p>
                            </div>


                        );
                    })
                )}
                <a href="#market-updates" className="hidden cursor-pointer bg-[#BC00F0] px-16  sm:flex sm:mb-80 items-center  justify-center gap-2 py-4 rounded-md">See prices <IoMdArrowDropdown /></a>
            </div>
        </div>
    );
}

export default Hero;
