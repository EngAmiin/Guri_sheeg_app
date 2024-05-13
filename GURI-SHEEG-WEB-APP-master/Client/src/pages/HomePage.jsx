

import React from 'react'
import HeroSection from '../components/HeroSection'
import HousesSection from '../components/HousesSection'
import HotelsSection from '../components/HotelsSection'
import Sponsored from '../components/Sponsored'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HouseContextProvider from '../context/HouseContext'
import LandSection from '../components/LandingSection'
import LandContextProvider from '../context/LandContext'

export default function HomePage() {
  return (
    <>
      <Header />

      <HeroSection />
      <HouseContextProvider>
        <HousesSection />
      </HouseContextProvider>
      <HotelsSection />
      <LandContextProvider>
        <LandSection />
      </LandContextProvider>
      <Sponsored />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
