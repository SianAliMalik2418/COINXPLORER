import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Market from '../components/Market';

function Home() {
  return(
    <div className='gradientBg w-screen '>
     <Hero/>
     <Market/>
    </div>
  )
}

export default Home;
