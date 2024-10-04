/* eslint-disable react/jsx-key */
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const Home = () => {
  const [myPosts, setMyPosts] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:3001/getPosts")
    .then(posts=>{
      setMyPosts(posts.data);
    })
    .then(err=>console.log(err))
  },[])
  return (
    <div className="flex flex-col gap-20 my-5">
      <h1 className="text-3xl text-blue-800">Adding Something in the Home to check</h1>
      {
        myPosts?.map((post)=>{
          return <Link to={`/post/${post._id}`}>
              <div className="flex m-auto w-[60%] flex-row gap-9 border-2 border-black p-5">
              <img className="w-[30%]" src={`http://localhost:3001/Images/${post.file}`} alt="posts" />
              <div>
                <p className="text-5xl text-blue-500">{post.title}</p>
                <p className="text-3xl text-green-500 mb-5">{post.description}</p>
              </div>
            </div>
          </Link>
        })
      }
    </div>
  )
}

export default Home
