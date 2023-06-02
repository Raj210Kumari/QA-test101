import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const navigate = useNavigate();

    const handleSubmit=()=>{
        const payload={
            email,
            password
        }
        console.log(payload)
        fetch("https://ill-gold-hippopotamus-hat.cyclic.app/auth/login",{
            method:"POST",
            body:JSON.stringify(payload),
            headers:{
                "Content-type":"application/json"
            }
        }).then(res=>res.json())
        .then(res=>{
          console.log(res)
          // console.log(res.user.token)
          localStorage.setItem("token",JSON.stringify({token : res.user.token}))
          navigate('/dashboard');
          alert("login")
        })
        .catch(err=>console.log(err))
    }

  return (
    <div style={{textAlign:"center"}}>
      <h1>Login</h1>
      <input type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={handleSubmit}>Login</button>
    </div>
  )
}

export  {Login}
