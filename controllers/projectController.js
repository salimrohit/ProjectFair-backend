const projects = require('../model/projectSchema')


exports.addProject = async(req, res)=>{ 
    console.log('inside projectController');
    /* res.status(200).json('upload successful') */
    const userId = req.payload 
    console.log(userId);

    const projectImage = req.file.filename
    console.log(projectImage);

    const {title,language,github,website,overview} = req.body
    console.log(title,language,github,website,overview);

    try {
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json('Project already exists')
        }
        else{
            const newProject = new projects({
                title,
                language,
                github,
                website,
                overview,
                projectImage,
                userId
            })

            await newProject.save()
            res.status(200).json(newProject)
        }

        
    } catch (error) {
        res.status(401).json('Request failed due to ',error )        
    }
}   

//controller to get first three projects for the home page
exports.getHomeProject = async(req,res) =>{
    try {
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject)
        
    } catch (error) {
        res.status(401).json(`failed due to ${error}`)
        
    }
}

//controller to get all project for the project page

exports.getAllProject = async(req,res) =>{
    const searchKey = req.query.search
    console.log(searchKey);
    const query = {
        language :{
            //1st - based on which search have to be executed 
            //2nd - to remove case sensitivity
            $regex:searchKey,$options:'i'
        }
    }
    try {        
        const AllProject = await projects.find(query)
        res.status(200).json(AllProject)
        
    } catch (error) {
        res.status(401).json(`failed due to ${error}`)
        
    }
}


//userPoject 

exports.getUserProject = async(req, res) =>{
    try {
        const userId = req.payload
        const userProject = await projects.find({userId})
        res.status(200).json(userProject)
        
    } catch (error) {
        res.status(401).json(`error occured due to ${error} `)
       
    }
}

//delete user project

exports.deleteUserProject = async(req,res)=>{
    try {
        const {id} = req.params
        const removeProject = await projects.findByIdAndDelete({_id: id})
        res.status(200).json(removeProject)
        
    } catch (error) {
        res.status(401).json(`error occured due to ${error}`)
        
    }

}

exports.editUserProject = async(req,res)=>{
    const {projectId} = req.params
    const userId = req.payload

    const { id, title, language, github, website, overview, projectImage } = req.body
    console.log(title, language, github, website, overview, projectImage);

    const uploadedprojectImage = req.file?req.file.filename: projectImage


    try {
        //1st - how to identify the document 
        //2nd - how to update the document 
        const updateProject = await projects.findByIdAndUpdate({_id:projectId},{title,language,github,website,overview, projectImage:uploadedprojectImage, userId},{new:true})
        //new value to the existing content
        await updateProject.save()//to save the content in mongodb
        res.status(200).json(updateProject)
        
    } catch (error) {
        res.status(401).json(`error occured due to ${error}`)
                
    }

}