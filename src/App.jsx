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
      <main className="bg-soviet-offwhite min-h-screen text-zinc-800">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<CardGame />} />
          <Route path="/cq" element={<CQPage />} />
        </Routes>
        
        <Footer />
      </main>
    </BrowserRouter>
  )
}

export default App
