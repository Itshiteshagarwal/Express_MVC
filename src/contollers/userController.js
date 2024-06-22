const userModel = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET_KEY =  process.env.SECRET_KEY;

const signup = async (req,res) =>{

    //existing user or not
    const {username, email, password} = req.body;
    try {
        const existingUser = await userModel.findOne({email: email})
        if(existingUser){
            return res.status(400).json({message:"user already exist"});
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email:email,
            password:hashPassword,
            username:username
        });

        const token = jwt.sign({email:result.email,id:result._id}, SECRET_KEY);
        res.status(201).json({
            user:result,
            token
        });


    } catch (error) {
        console.log(error);
        res.send(500).json({message:"something went wrong"})
    }
}


const signin = async(req,res) =>{
    const {email,password} = req.body;

    try {

        const existingUser = await userModel.findOne({email: email})
        if(!existingUser){
            return res.status(404).json({message:"user not exist"});
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if(!matchPassword){
            return res.status(400).json({message:"invalid credentials"})
        }

        const token = jwt.sign({email:existingUser.email,id:existingUser._id}, SECRET_KEY);
        res.status(201).json({
            user:existingUser,
            token:token
        });
        
    } catch (error) {
        console.log(error);
        res.send(500).json({message:"something went wrong"})
    }

}

module.exports = {signup, signin};