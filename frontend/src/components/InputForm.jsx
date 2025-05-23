import React from 'react'
import { useState } from 'react';
import axios from "axios";
const InputForm = ({setIsOpen}) => {
    const [email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[isSignuup,setIsSignup]=useState(false);
    const [error,setError]=useState("")
    const handleOnsubmit=async(e)=>{
        e.preventDefault();
        let endpoint=(isSignuup)?"signup":"login"
        await axios.post(`https://recipe-heaven.onrender.com/${endpoint}`,{email,password})
        .then((res)=>{
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("user",JSON.stringify(res.data.user));
            setIsOpen()
        })
        .catch(data=>setError(data.response?.data?.error))
    }
  return (
    <>
    <form className='form' onSubmit={handleOnsubmit}>
     <div className='form-control'>
     <label>
        Email
     </label>
     <input type="email" className='input' onChange={(e)=>setEmail(e.target.value)}required>
     </input>
     </div>
      <div className='form-control'>
     <label>
        Password
     </label>
     <input type="password" className='input' onChange={(e)=>setPassword(e.target.value)} required>
     </input>
     </div>
     <button type='submit'>
    {(isSignuup)?"SignUp":"Login"}
     </button><br></br>
     { (error!="")&&<h6 className='error'>
      {error}
     </h6>}
     <p onClick={()=>setIsSignup(prev=>!prev)}>{(isSignuup)?"Already have an account":"Create new Account"}</p>
    </form>
    </>
  )
}

export default InputForm
