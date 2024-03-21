import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Editpost = () => {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get('http://localhost:3001/getPostById/'+id)
    .then(res=>{
      console.log(res);
      setTitle(res.data.title);
      setDesc(res.data.description);
    })
    .catch(err=>console.log(err))
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/toedit/"+id, {title, description:desc})
      .then(blog => {
        console.log(blog.data);
        navigate("/")
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <div className="border-2 border-black w-[50%] mt-12 m-auto p-4 bg-gray-300">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col gap-4">
          <p className="text-2xl font-bold text-blue-500">Update Post</p>
          <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Enter title" className="border-2 border-black p-2 text-2xl" />
          <textarea onChange={(e) => setDesc(e.target.value)} value={desc} placeholder="Enter Description" className="border-2 border-black p-2 text-xl" name="" id="" cols="30" rows="10"></textarea>
          <button type="submit" className="border-2 bg-blue-500 justify-end w-[25%] border-black my-5 rounded-xl p-2">Update</button>
        </form>
      </div>
    </div>
  )
}

export default Editpost
