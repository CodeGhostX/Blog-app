/* eslint-disable no-unused-vars */
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:3001/register",{username,email,password})
    .then(data => navigate('/login'))
    .catch(err=>console.log(err))
    setUsername("")
    setEmail("")
    setPassword("")
  }
  
  const handleUsernameChange = (e)=>{
    setUsername(e.target.value);
  }
  const handleEmailChange = (e)=>{
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e)=>{
    setPassword(e.target.value);
  }

  return (
    <div className="border-2 border-gray-500 flex flex-col m-auto w-[22%] p-5 my-24 rounded">
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-semibold">Sign Up</p>
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <label>Username: </label><br />
            <input value={username} onChange={handleUsernameChange} className="border-2 border-gray-300 p-1 w-[100%] rounded" type="text" placeholder="Enter username" />
          </div>
          <div className="my-2">
            <label>Email: </label><br />
            <input value={email} onChange={handleEmailChange} className="border-2 border-gray-300 p-1 w-[100%] rounded" type="email" placeholder="Enter email"  />
          </div>
          <div className="my-2">
            <label>Password: </label><br />
            <input value={password} onChange={handlePasswordChange} className="border-2 border-gray-300 p-1 w-[100%] rounded" type="password" placeholder="Enter password"  />
          </div>
          <button className="border-2 py-1 border-blue-700 text-white bg-blue-600 w-[100%] rounded my-3" type="submit">Sign Up</button>
        </form>
      </div>
      <div>
        <label>Already have account?</label><br />
        <button className="border-2 py-1 border-green-700 text-white bg-green-600 w-[100%] rounded"><Link to='/login'>Login</Link></button>
      </div>
    </div>
  )
}

export default Register
