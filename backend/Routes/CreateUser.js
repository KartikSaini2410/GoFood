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

// POST request to handle user login
router.post('/loginuser', [
    body('email', 'Incorrect email').isEmail(),
    body('password', 'Incorrect password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let userData = await user.findOne({ email });

        if (!userData) {
            return res.status(400).json({ errors: 'Invalid credentials' });
        }

        const pwdCompare = await bcrypt.compare(password, userData.password);

        if (!pwdCompare) {
            return res.status(400).json({ errors: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: userData._id
            }
        };

        const authToken = jwt.sign(payload, jwtSecret);

        return res.json({
            success: true,
            authToken: authToken
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;