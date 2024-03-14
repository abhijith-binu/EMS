// model import
const users = require('../model/userSchema')

// define logic to reslove client request

// register
exports.register =async(req,res)=>{
     console.log(req.file);
     const file = req.file.filename
     const {fname,lname,email,mobile,gender,status,location} = req.body
     if(!fname || !lname || !email || !mobile || !gender || !status || !location || !file) {
          res.status(403).json('All inputs are required!!')
     }
     try{
          const preuser = await users.findOne({email})
          if(preuser){
               res.status(406).send("User already exists")
          }
          else{
               const newuser = new users({
                    fname,lname,email,mobile,gender,status,profile:file,location
               })
               // db save
               await newuser.save()
               res.status(200).json(newuser)
          }

     }
     catch(error){
          res.status(401).json(error)
     }
}

// get users
exports.getusers = async(req,res)=>{
     // get search query from req
     const search = req.query.search
     const query = {
          fname:{$regex:search,$options:'i'}
     }
     try{
         const allusers = await users.find(query)
         res.status(200).json(allusers)
     }
     catch(error){
          res.status(401).json(error)
     }
}

// view profile
exports.viewprofile = async(req,res)=>{
     const {id} = req.params
     try{
          const preuser = await users.findOne({_id:id})
          if(preuser){
               res.status(200).json(preuser)
          }
          else{
               res.status(404).json("User not found")
          }
     }
     catch(error){
          res.status(401).json(error)
     }
}

// delete user
exports.deleteUser = async (req,res)=>{
     const {id} = req.params
     try{
          const removeitem = await users.findByIdAndDelete({_id:id})
          if(removeitem){
               res.status(200).json(removeitem)
          }
     }
     catch(error){
          res.status(401).json(error)
     }
}

//  update user info
exports.editUser = async(req,res)=>{
     // get values from req
     const {id} = req.params
     const {fname,lname,email,mobile,gender,status,location,user_profile} = req.body
     const file = req.file?req.file.filename:user_profile

     try{
          const updateUser = await users.findByIdAndUpdate({_id:id},{
           fname,lname,email,mobile,gender,status,profile:file,location
   
          },{new:true})
          // to save this to mongo
          await updateUser.save()
          res.status(200).json(updateUser)
     }
     catch(error){
          res.status(401).json(error)
     }
}