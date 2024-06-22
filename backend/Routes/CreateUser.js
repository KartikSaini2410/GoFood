const express = require('express');
const { body, query, validationResult } = require('express-validator');
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

router.get('/loginuser',
    [
        query('email', 'incorrect email').isEmail(),
        query('password', 'incorrect password').isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.query;

        try {
            let userData = await User.findOne({ email });

            if (!userData) {
                return res.status(400).json({ errors: 'Try login with correct credentials' });
            }

            const pwdCompare = await bcrypt.compare(password, userData.password);

            if (!pwdCompare) {
                return res.status(400).json({ errors: 'Try login with correct credentials' });
            }

            const payload = {
                user: {
                    id: userData._id
                }
            };

            const authToken = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

            return res.json({
                success: true,
                authToken: authToken
            });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ errors: 'Server Error' });
        }
    });

module.exports = router;