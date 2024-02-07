import React, { createContext, useEffect, useState } from 'react'

export const CryptoContext = createContext()

function Context({ children }) {

    const [selectedCurrency, setSelectedCurrency] = useState('usd');
    const [symbol, setSymbol] = useState('$');
    const [dropdownOpen, setDropDownOpen] = useState(false);

   useEffect(function()
   {
    if(selectedCurrency === 'usd')
    {
        setSymbol('$')
    }

    else if(selectedCurrency === 'pkr')
    {
        setSymbol('PKR')
    }
   },[selectedCurrency])

    return (
        <CryptoContext.Provider value= {{selectedCurrency,setSelectedCurrency,symbol,setSymbol,dropdownOpen,setDropDownOpen}}>
            {children}
            </CryptoContext.Provider>
    )
}

export default Context