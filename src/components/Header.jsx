import React, { useContext,useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CryptoContext } from './Context';

function Header() {
  const { selectedCurrency, setSelectedCurrency, dropdownOpen, setDropDownOpen } = useContext(CryptoContext);
  const [sticky, setSticky] = React.useState(false);
  const navbarRef = useRef();

  const handleScroll = () => {
    setSticky(window.scrollY > 150);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarStatus = sticky ? 'fixed' : 'static';

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    setDropDownOpen(false);
  };

  return (
    <div className={`${navbarStatus} h-20 w-screen flex items-center justify-between px-20 py-11 sm:px-5 bg-[#030234] z-20`} ref={navbarRef}>
      <Link to={'/'} className='text-white font-semibold text-3xl sm:text-2xl xsm:text-lg'>
        COINXPLORER
      </Link>
      <div className='relative' onClick={() => setDropDownOpen(!dropdownOpen)}>
        <ul className='border-2 border-gray-500 cursor-pointer hover:border-white transition-all px-8 py-2 xsm:px-5 xsm:py-1'>
          <p>{selectedCurrency}</p>
          {dropdownOpen && <DropDownItems onCurrencyChange={handleCurrencyChange} />}
        </ul>
      </div>
    </div>
  );
}

function DropDownItems({ onCurrencyChange }) {
  const refContainer = useRef();

  const handleClick = (currency) => {
    onCurrencyChange(currency);
  };

  return (
    <div className='absolute top-10 z-10 bg-[#515151] h-20 w-[6.2rem] right-0'>
      <li className='flex flex-col gap-2'>
        <p className='text-center mt-2 hover:bg-[#606060]' ref={refContainer} onClick={() => handleClick('pkr')}>
          pkr
        </p>
        <p className='text-center hover:bg-[#606060]' onClick={() => handleClick('usd')}>
          usd
        </p>
      </li>
    </div>
  );
}

export default Header;
