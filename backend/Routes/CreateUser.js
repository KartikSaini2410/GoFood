const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const user = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = "MyFirstMernStackWebAplliation_GoFood$";

router.post('/createuser',
[body('email').isEmail(),
body('name').isLength({min: 5}),
body('password', 'incorrect password').isLength({min: 5})],
async(req, res)=> {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt)

    try {
        await user.create({
            name: req.body.name,
            password: secPassword,
            email:req.body.email,
            location:req.body.location
        })
        res.json({
            success:true
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false
        })
    }
})

router.post('/loginuser',
[body('email', 'incorrect email').isEmail(),
body('password', 'incorrect password').isLength({min: 5})],
async(req, res)=> {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    let email = req.body.email

    try {
        let userData = await user.findOne({email});
        if(!userData){
            return res.status(400).json({errors: 'Try login with correct credentials'});
        }

        const pwdCompare = bcrypt.compare(req.body.password, userData.password)

        if(!pwdCompare){
            return res.status(400).json({errors: 'Try login with correct credentials'})
        }

        const data = {
            user: {
                id: userData._id
            }
        }

        const authToken = jwt.sign(data,jwtSecret);

        return res.json({
            success:true,
            authToken:authToken
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false
        })
    }
})

module.exports = router;