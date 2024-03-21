import axios from "axios";
import { useState } from "react";
import { userContext } from "./App"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const Create = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState('');
  const navigate = useNavigate();
  const user = useContext(userContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', desc);
    formData.append('file', file);
    formData.append('email', user.email);
    axios.post("http://localhost:3001/create", formData)
      .then(blog => {
        console.log(blog);
        navigate("/")
      })
      .catch(err => console.log(err));
    console.log(formData);
    setDesc('');
    setTitle('');
  };

  return (
    <div>
      <div className="border-2 border-black w-[50%] mt-12 m-auto p-4 bg-gray-300">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col gap-4">
          <p className="text-2xl font-bold text-blue-500">Create Post</p>
          <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Enter title" className="border-2 border-black p-2 text-2xl" />
          <textarea onChange={(e) => setDesc(e.target.value)} value={desc} placeholder="Enter Description" className="border-2 border-black p-2 text-xl" name="" id="" cols="30" rows="10"></textarea>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            placeholder="Select a file"
            className="border-2 p-2 border-black bg-white rounded-md text-sm focus:outline-none"
            type="file"
          />
          <button type="submit" className="border-2 bg-blue-500 justify-end w-[25%] border-black my-5 rounded-xl p-2">Post</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
