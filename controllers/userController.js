const users = require("../model/userSchema");
//import jwt library
const jwt = require('jsonwebtoken')


//logic for user registration 
exports.register = async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body

    try {
        const existingUser = await users.findOne({ mailId: email })

        if (existingUser) {
            res.status(406).json('User already exists')
        }
        else {
            const newUser = new users({
                username,
                mailId: email,
                password,
                profile: "",
                github: "",
                linkedIn: ""
            })
            //store the particular data in mongoDB mongoose method 
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        res.status(401).json('Registration process failed due to', err)
    }
}

//logic to login

exports.login = async (req, res) => {
    console.log('inside login function');
    const { email, password } = req.body

    try {
        const existingUser = await users.findOne({ mailId: email, password })

        if (existingUser) {
            //token generate - sign('data','secretkey')
            const token = jwt.sign({userId:existingUser._id},"supersecretkey")

            res.status(200).json({existingUser,token})
        }
        else {
            res.status(406).json('Incorrect email id or password')
        }
    }
    catch (err) {
        res.status(406).json('Login request failed due to', err)
    }
}


//logic to profile update 

exports.profileUpdate = async(req,res)=>{
    const userId = req.payload 
    const {username, emailId, password, profile, github, linkedIn} = req.body

    const uploadImage = req.file?req.file.filename:profile

    try {
        const userProfile = await users.findByIdAndUpdate({_id:userId},{
            username,
            mailId:emailId,
            password,
            profile:uploadImage,
            github,
            linkedIn},{new:true})

            await userProfile.save()
            res.status(200).json(userProfile)
        
    } catch (error) {
        res.status(401).json(`Update profile failed due to ${error}`)
        
    }
}
