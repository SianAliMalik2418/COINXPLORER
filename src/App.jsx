import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Header';
import Home from './pages/Home';
import CoinPage from './pages/CoinPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<CoinPage />} />
      </Routes>
    </Router>
  );
}

export default App;
