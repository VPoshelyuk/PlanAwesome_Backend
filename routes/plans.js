const router = require('express').Router()
const Plan = require('../models/Plan')
const User = require('../models/User')

router.post('/add', async (req, res) => {
    
    // const { error } = registerValidation(req.body)
    // if(error) return res.status(400).send(error.details[0].message)
    
    // const emailExists = await User.findOne({email: req.body.email})
    // if(emailExists) return res.status(400).send("Email already exists!")

    // const salt = await bcrypt.genSalt(3)
    // const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // const user = new User({
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     email: req.body.email,
    //     password: hashedPassword
    // })
    // try {
    //     const svdUser = await user.save()
    //     res.send(svdUser)
    // } catch (er) {
    //     res.status(400).send(er)
    // }
})

router.get('/get', async (req, res) => {
    
})

router.delete('/remove', async (req, res) => {
    
    // const { error } = loginValidation(req.body)
    // if(error) return res.status(400).send(error.details[0].message)
    
    // const user = await User.findOne({email: req.body.email})
    // const validPass = await bcrypt.compare(req.body.password, user.password)
    // if(!user || !validPass) return res.status(400).send("User with entered credentials doesn't exist!")

    // const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

    // res.header("Auth-token", token).send(user)
})


module.exports = router