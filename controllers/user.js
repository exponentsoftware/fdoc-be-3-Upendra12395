const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config_data = require('../../config.json')
//day3 task
// Create api to get TODO list for User
module.exports.getAll = async (req, res)=>{
    User.find().populate('todoList')
    .then((user)=>{
        res.status(200).json(user)
    })
    .catch(err =>{
        res.status(500).json({message : err.message})
    })
}

module.exports.addUser = async(req, res)=>{
    const {userName, email, phone, role, password} = req.body
    if(!userName || !email || !phone || !role || !password){
        return res.status(400).json('All fields required')
    }else{
        User.findOne({email : email}).then((user)=>{
            if(user){
                return res.status(400).json({message : ' user already registered'})
            }else{
                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(password, salt, (err, hash)=>{
                        if(err){
                            throw err;
                        }else{
                            const newUser = new User({
                                userName : userName,
                                email : email,
                                phone : phone,
                                role : role,
                                password : hash
                            })
                            newUser.save()
                            .then((user)=>{
                                res.status(200).json({user : user, message : 'user saved successfully'})
                            })
                            .catch(err =>{
                                res.status(500).json({message: err.message})
                            })
                        }
                    })
                })
            }
        })
    }
}

module.exports.getLogIn = async (req, res)=>{
    const {email, password } = req.body
    if(!email || !password){
        return res.status(400).json({message : 'All fields required'})
    }else{
        User.findOne({email : email}).then((user)=>{
            if(!user){
                res.status(400).json({message : 'User doen not exist Please signIn'})
            }else{
                bcrypt.compare(password, user.password,).then((isMatch)=>{
                    if(!isMatch){
                        res.status(401).json({message : 'Email id or password incorrect'})
                    }else{
                        jwt.sign(
                            {id : user._id},
                            config_data.JWT_KEY,
                            {
                                expiresIn : 3600
                            },
                            (err, token)=>{
                                if(err){
                                    throw err;
                                }else{
                                    res.status(200).json({token : token})
                                }
                            }
                        )
                    }
                })
            }
        })
    }
}

module.exports.getOneUser = async(req, res)=>{
    const id = req.params.id
    User.findById(id)
    .then(user =>{
        res.status(200).json(user)
    })
    .catch(err =>{
        res.status(500).json({message : err.message})
    })
}

module.exports.updateOneUser = async(req, res)=>{
    const id = req.params.id
    User.findByIdAndUpdate(id, req.body, {useFindandModify : false})
    .then(()=>{
        res.status(200).json({message: "user details updated successfully"})
    })
    .catch(err=>{
        res.status(500).json({message: err.message})
    })
}

module.exports.deleteAllUser = async(req, res)=>{
    User.deleteMany()
    .then(()=>{
        res.status(200).json({message : "all user deleted"})
    })
    .catch(er =>{
        res.status(500).json({message : err.message})
    })
}

module.exports.deleteOneUser = async(req, res)=>{
    const id = req.params.id
    User.findByIdAndDelete(id)
    .then(()=>{
        res.status(200).json({message : "user delete successfully"})
    })
    .catch(err =>{
        res.status(500).json({message : err.message})
    })
}