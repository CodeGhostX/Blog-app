const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require("multer");
const path = require('path');
const UserModel = require("./UserModel");
const app = express();
const PostModel = require('./PostModel');

app.use(express.json());
app.use(express.static('public'))
app.use(cors({
  origin:["http://localhost:5173"],
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}))
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/Blogging-App')
const db = mongoose.connection;
db.once('open',()=>{console.log("Database Connected✅")})

app.post('/register',(req,res)=>{
  const {username,email,password} = req.body;
  bcrypt.hash(password,10)
  .then(hash=>{
    UserModel.create({username,email,password:hash})
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
  })
  .catch(err=>console.log(err));
})

const storage = multer.diskStorage({
  destination:(req, file, cb) =>{
    cb(null, 'public/Images')
  },
  filename: (req, file, cb) =>{
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})

const verifyUser = (req,res,next) =>{
  const token = req.cookies.token;
  if(!token){
    return res.json("The token is missing");
  }
  else{
    jwt.verify(token, "jwt-secret-key",(err,decoded)=>{
      if(err){
        return res.json("The token is missing");
      } else{
        req.email = decoded.email;
        req.username = decoded.username;
        next();
      }
    })
  }
}

app.post('/create',verifyUser,upload.single('file'),(req,res)=>{
  PostModel.create({
    title:req.body.title,
    description:req.body.description,
    email:req.body.email,
    file:req.file.filename})
  .then(result =>{
    res.json(result.data)
  })
  .catch(err=>{
    res.json(err)
  })
})

app.get('/',verifyUser,(req,res)=>{
  return res.json({email:req.email, username:req.username})
})

app.post('/login',(req,res)=>{
  const {email,password} = req.body;
  UserModel.findOne({email:email})
  .then(user=>{
    if(user){
      bcrypt.compare(password,user.password,(err,response)=>{
        if(response){
          const token = jwt.sign({email:user.email , username:user.username},"jwt-secret-key")
          res.cookie('token',token)
          return res.json("success")
        } else{
          return res.json("Password not matched")
        }
      })
    }
    else{
      res.json("User Not Availiable")
    }
  })
})

app.get('/getPosts',(req,res)=>{
  PostModel.find()
  .then(result=>res.json(result))
  .catch(err=>res.json(err))
})

app.get('/logout',(req,res)=>{
  res.clearCookie('token');
  return res.json("success")
})

app.get('/getPostById/:id',(req,res)=>{
  const id = req.params.id;
  PostModel.findById({_id:id})
  .then(post=>res.json(post))
  .catch(err=>res.json(err))
})

app.post('/toedit/:id', async (req,res)=>{
  const id = req.params.id;
  const obj = req.body;
  const newObj = await PostModel.findByIdAndUpdate(id, obj)
  console.log(newObj);
  res.json(newObj);
})

app.delete('/del/:id',(req,res)=>{
  const id = req.params.id;
  PostModel.findByIdAndDelete(id)
  .then(result=>res.json(result))
  .catch(err=>res.json(err))
})

app.listen(3001, ()=>{
  console.log("Server is running on port 3001");
})