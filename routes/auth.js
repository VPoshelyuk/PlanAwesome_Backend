const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Cryptr = require('cryptr')
const User = require('../models/User')
const cryptr = new Cryptr(process.env.CRYPTR_KEY)
const { registerValidation, loginValidation } = require('../validation')


router.post('/register', async (req, res) => {
    
    const { error } = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).send("Email already exists!")

    const salt = await bcrypt.genSalt(3)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const svdUser = await user.save()
        res.send(svdUser)
    } catch (er) {
        res.status(400).send(er)
    }
})

router.post('/login', async (req, res) => {
    
    const { error } = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    const user = await User.findOne({email: req.body.email})
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!user || !validPass) return res.status(400).send("User with entered credentials doesn't exist!")

    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
    if(user.notes.length !== 0)user.notes.forEach(note => {
        note.content = cryptr.decrypt(note.content)
    });
    res.header("Auth-token", token).send({user})
})


module.exports = router
