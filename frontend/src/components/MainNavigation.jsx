import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
const MainNavigation = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default MainNavigation