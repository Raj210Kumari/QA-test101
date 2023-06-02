import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPass]=useState("")

    const navigate = useNavigate();

    const handleSubmit= async ()=>{
        const payload={
            username : name, email, password
        }
        try {
          let res = await fetch("https://ill-gold-hippopotamus-hat.cyclic.app/auth/register", {
            method:"POST",
            headers:{
              "Content-Type":"application/json",
          },
                body:JSON.stringify(payload),
            
          });
          let data = await res.json();
          let error = data.hasOwnProperty("error")
          console.log("data", error);
          if(error===true) alert(data.error)
          else alert(data.msg)
          
        } catch (error) {
          console.log("error", error)
        }
    }
  return (
    <div>
        <div><h2>Register Page</h2></div>
        <input type="text" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type="email" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder='Enter Password'value={password} onChange={(e)=>setPass(e.target.value)}/>
        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Register