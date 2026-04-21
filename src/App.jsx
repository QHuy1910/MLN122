import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import SurplusValueOrigin from './components/SurplusValueOrigin'
import SurplusValueNature from './components/SurplusValueNature'
import Methodology from './components/Methodology'
import Footer from './components/Footer'
import CardGame from './components/CardGame'
import CQPage from './components/CQPage'
import OverviewPage from './components/OverviewPage'
import FallingLeaves from './components/FallingLeaves'
import ScrollToTop from './components/ScrollToTop'

const HomePage = () => (
  <>
    <div id="home">
      <HeroSection />
    </div>
    <SurplusValueOrigin />
    <SurplusValueNature />
    <div id="methodology">
      <Methodology />
    </div>
  </>
)

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <main className="bg-soviet-offwhite min-h-screen text-zinc-800 relative overflow-x-hidden">
        <FallingLeaves />

        <div className="relative z-10">
          <Navbar />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<CardGame />} />
            <Route path="/cq" element={<CQPage />} />
            <Route path="/tong-quat" element={<OverviewPage />} />
          </Routes>
          
          <Footer />
        </div>
      </main>
    </BrowserRouter>
  )
}

export default App
