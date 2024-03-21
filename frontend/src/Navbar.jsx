/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom"
import { userContext } from "./App"
import { useContext } from "react"
import axios from "axios";

function Navbar() {
  const user = useContext(userContext);
  const navigate = useNavigate();

  const handleLogout = ()=>{
    axios.get("http://localhost:3001/logout")
    .then(res=>{
      if(res.data==="success") {
        navigate('/login');
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }

  return (
    <div className="flex flex-row justify-between bg-gradient-to-l from-red-500 to-blue-500 w-full p-3 text-brown-600">
      <div className="text-3xl font-semibold">Blog App</div>
      <div className="flex gap-5 text-xl mt-2">
        <Link to="/">Home</Link>
        {
          user.username ? <Link to="/create">Create</Link> :
          ""
        }
        <Link to="/">Contact</Link>
      </div>
      {
        user.username ?
        <div className="flex gap-3 text-white">
          <button onClick={handleLogout} className="bg-transparent border-2 border-black p-2 hover:bg-blue-500 rounded-xl">Logout</button>
        </div>
        :
        <div className="flex gap-3 text-white">
          <button className="bg-transparent border-2 border-black p-2 hover:bg-blue-500 rounded-xl"><Link to="/register">Register</Link></button>
          <button className="bg-transparent border-2 border-black p-2 hover:bg-blue-500 rounded-xl"><Link to="/login">Login</Link></button>
        </div>
      }
    </div>
  )
}

export default Navbar
