import React from 'react'
import foodrecipe from "../assets/chickenbiryani-removebg-preview.png"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Recipeitems from '../components/Recipeitems'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'

const Home = () => {
    const navigate=useNavigate();
    const[isOpen,setIsOpen]=useState(false);
    const addRecipe=()=>{
      let token=localStorage.getItem("token");
      if(token){
         navigate("/addRecipe")
      }else{
        setIsOpen(true);
      }  
    }
  return (
   <>
   <section className='home'>
    <div className='left'>
    <h1>
       Recipe Box
    </h1>
    <h5>
        The interface is intuitive and visually appealing, making it simple to add new recipes, categorize them, and access detailed cooking instructions whenever needed. This design aims to enhance the overall cooking experience by keeping everything neatly in one place.
    </h5>
    <button onClick={addRecipe}>
       Share your Recipe
    </button>
    </div>
    <div className='right'>
      <img src={foodrecipe} width="320px" height="300px">
        </img>
    </div>
   </section>
   <div className='bg'>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6e8" fill-opacity="1" d="M0,96L30,85.3C60,75,120,53,180,74.7C240,96,300,160,360,160C420,160,480,96,540,64C600,32,660,32,720,58.7C780,85,840,139,900,160C960,181,1020,171,1080,160C1140,149,1200,139,1260,122.7C1320,107,1380,85,1410,74.7L1440,64L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
   </div>
    {(isOpen)&& <Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
   <div className='recipe'>
    <Recipeitems/>
   </div>
   </>
  )
}

export default Home