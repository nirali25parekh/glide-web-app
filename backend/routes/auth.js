const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation')

router.post('/register', async (req, res) => {
    //let's validate before making user
    const { error } = registerValidation(req.body)
    if (error) {
        return res.status(400).send({error: error.details[0].message})
    }

    // if user exists in database
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) {
        return res.status(400).send({error: 'Email already exists'})
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // everything okay
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        sector: req.body.sector,
    })
    try {
        const savedUser = await user.save()
        res.send({ user: user._id , sector: req.body.sector})
    } catch (err) {
        console.log(err)
        res.status(400).send({error: err})
    }
})

router.post('/login', async (req, res) => {
    //let's validate logging user
    const { error } = loginValidation(req.body)
    if (error) {
        return res.status(400).send({error: error.details[0].message })
    }

    // if email exists in database
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send({error: "Email not found"})
    }

    // if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass){
        return res.status(400).send({error: 'Incorrect password'})
    }

    // create jwt token
    const token = jwt.sign({ _id: user._id}, process.env.TOKEN_SECRET )
    res.header('auth-token', token).send({token: token, user: user._id, sector: user.sector} )
})

module.exports = router
