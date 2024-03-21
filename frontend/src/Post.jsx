import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { userContext } from "./App"

const Post = () => {
  const {id} = useParams();
  const [post_id, setPost] = useState({});
  const navigate = useNavigate();
  const user = useContext(userContext);
  useEffect(()=>{
    axios.get('http://localhost:3001/getPostById/'+id)
    .then(post=>{
      console.log(post.data);
      setPost(post.data);
    })
    .catch(err=>console.log(err))
  },[])

  const handleDelete = ()=>{
    axios.delete('http://localhost:3001/del/'+id)
    .then(res=>{
      console.log(res)
      navigate("/")
    })
    .catch(err=>console.log(err))
  }

  return (
    <div className="mx-18 my-8 p-10">
      <div className="flex m-auto w-[30%] flex-col gap-4 border-2 border-black p-5">
        <img className="p-5" src={`http://localhost:3001/Images/${post_id.file}`} alt="posts" />
        <hr />
        <div className="bg-gray-300 p-5 rounded">
          <p className="text-5xl text-blue-500">{post_id.title}</p>
          <p className="text-3xl text-green-500 mb-5">{post_id.description}</p>
        </div>
      </div>
        {
          user.email===post_id.email?
          <div className="my-10 flex justify-end mr-[300px] gap-12">
            <Link to={`/postEdit/${id}`}><p className="border-2 bg-yellow-200 text-xl p-3 border-yellow-600 rounded">Edit</p></Link>
            <button className="border-2 text-xl p-3 bg-red-200 border-red-600 rounded" onClick={handleDelete}>Delete</button>
          </div>
        :""
        }
    </div>
  )
}

export default Post
