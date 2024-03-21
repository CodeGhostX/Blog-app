import Navbar from "./Navbar"
import {BrowserRouter as Router ,Routes, Route} from 'react-router-dom'
import Register from "./Register"
import Login from "./Login"
import Home from "./Home"
import { createContext, useEffect, useState } from "react"
import axios from "axios"
import Create from "./Create"
import Post from "./Post"
import Editpost from "./Editpost"
import ErrorPage from "./ErrorPage"
axios.defaults.withCredentials = true;

export const userContext = createContext();

const App = () => {
  const [user, setUser] = useState({})
  useEffect(()=>{
    axios.get('http://localhost:3001/')
    .then(user=>{
      setUser(user.data);
    })
    .catch(err=>{
      console.log(err)
    })
  },[])

  return (
    <userContext.Provider value={user}>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/post/:id" element={<Post/>}></Route>
          <Route path="/Create" element={<Create/>}></Route>
          <Route path="/postEdit/:id" element={<Editpost/>}></Route>
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
      </Router>
    </userContext.Provider>
  )
}

export default App
