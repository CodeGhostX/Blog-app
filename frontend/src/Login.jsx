import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
axios.defaults.withCredentials = true

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e)=>{
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e)=>{
    setPassword(e.target.value);
  }
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:3001/login",{email,password})
    .then(data=>{
      if(data.data==="success"){
        window.location.href = '/'
      }
    })
    .catch(err=>console.log(err.message))
    setEmail("");
    setPassword("");
  }

  return (
    <div className="border-2 border-gray-500 flex flex-col m-auto w-[22%] p-5 my-24 rounded">
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-semibold">Log In</p>
        <form onSubmit={handleSubmit}>
          <div className="my-1">
            <label>Email: </label><br />
            <input value={email} onChange={handleEmailChange} className="border-2 border-gray-300 p-1 w-[100%] rounded" type="email" placeholder="Enter email"  />
          </div>
          <div className="my-2">
            <label>Password: </label><br />
            <input value={password} onChange={handlePasswordChange} className="border-2 border-gray-300 p-1 w-[100%] rounded" type="password" placeholder="Enter password"  />
          </div>
          <button className="border-2 py-1 border-blue-700 text-white bg-blue-600 w-[100%] rounded my-3" type="submit">Sign In</button>
        </form>
      </div>
      <div>
        <label>Not Registered</label><br />
        <button className="border-2 py-1 border-green-700 text-white bg-green-600 w-[100%] rounded"><Link to='/register'>Register</Link></button>
      </div>
    </div>
  )
}

export default Login
