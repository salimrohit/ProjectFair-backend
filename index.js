//import dotenv module

//Loads .env file contents into process.env by default.
require('dotenv').config()

//2) express

const express = require('express')

//3) import cors 
const cors = require('cors')

//import router
const router = require('./Routing/router')

//import application middleware
/* const appmiddleware = require('./middleware/appMiddleware') */

//import connection file
require('./DB/connection')

//4) create server
const profairServer=express()

//5) use cors by server 
profairServer.use(cors()) 

//6) convert json to javascript object
//json method returns a middleware that can convert json format to javascript object
//middleware - req-res cycle control 
profairServer.use(express.json())

//server using router
profairServer.use(router)

//first argument - name by which other applications can use this folder 
//second argument - express.static - export that folder
profairServer.use('/uploads/', express.static('./uploads')) 


//7)set port (deafult port is 3000)(we create a custom port to avoid clash)
const PORT = 4000 || process.env 

//8)run server 
profairServer.listen(PORT,()=>{
    console.log(`project fair server running successfully at port number ${PORT}`);
})

 /* //GET request 
 profairServer.get('/',(req,res)=>{
    res.send(`<h1 style="color:red">server running successfully and ready to resolve get request</h1>`)
 })

 //post request
 profairServer.post('/',(req,res)=>{
    res.send('post request')
 })

 //put request
 profairServer.put('/',(req,res)=>{
    res.send('put request')
 }) */