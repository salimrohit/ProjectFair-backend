//to verify the token 
const jwt = require('jsonwebtoken')


const jwtMiddleware = (req,res,next)=>{
    console.log('inside jwtMiddleware');
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);
    try {
        const response = jwt.verify(token,"supersecretkey")
        console.log(response);
        req.payload = response.userId
        next() //to pass the control to projectController.js

        

    } catch (error) {
        res.status(401).json('Authorization failed', error) 
        
    }
}

module.exports = jwtMiddleware