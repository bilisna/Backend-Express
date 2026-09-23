const express = require('express');
const app = express()
// const logger = require('./midleware/loggers.js');
// const one = require('./middleware/one.js');
// const two = require('./middleware/two.js');
// const three = require('./middleware/three.js');
// const hellomiddleware = require('./middleware/hellomiddleware.js')
const port = 3000
app.use(express.json())
app.use(express.static('public'))





app.get('/', (req, res)=> {
    res.send('Hello, World !')
}
)

// app.use(logger);

// app.get('/', one, two, three, (req, res)=>{
//     res.send('hello world')
// })


// //making our first request
// app.get("/name",hellomiddleware,(req,res)=>{
//     console.log("header value:", req.headers.myheader) //get header from postman
//     console.log("params value:", req.query.myparams) //get header from postman
//     res.status(200).json({
//         "message":"kreeshu"
//     })
// })

// app.post("/imga", (req,res)=>{
//     res.send()
// })


// //endpoint post to get body 
// app.post("/data", (req,res)=>{
    

//     console.log(req.body)

//     res.status(200).json({
//         "message":"success",
//     })
// })

//connect to mongo db database
const mongoose=require('mongoose')
require('dotenv').config()

//importing user schema
const User= require('./models/User')

//make a route 
app.post('/create/user',async(req,res,next)=>{
try{
    //create a user
    const user=await User.create(req.body)
    res.status(201).json({
        "success":true,
        data:user
    })
}
catch(error)
{
res.status(400).json({
    "success":false,
    data:error.message
})
}
})

//read
app.get('/read/user',async(req,res,next)=>{
try{
    //read a user
    const user=await User.find();
    res.status(201).json({
        "success":true,
        data:user
    })
}
catch(error)
{
res.status(400).json({
    "success":false,
    data:error.message
})
}
})

//delete
app.delete('/delete/user',async(req,res,next)=>{
try{
    //delete a user
    console.log(req.query.id)
    const user=await User.findByIdAndDelete(req.query.id); //find all user in database
    res.status(201).json({
        "success":true,
        data:user
    })
}
catch(error)
{ams
res.status(400).json({
    "success":false,
    data:user
})
}
})


//connection 
const connectDB =async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("mongo db database connected successfully")
    }
    catch(error){
        console.error("error while connecting ", error)
        process.exit(1);
    }
}
connectDB().then(()=> {
    app.listen(port,() =>{
      console.log('Example app listening on port ${port}')
        
    })
  })