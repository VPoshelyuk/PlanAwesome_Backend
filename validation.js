//Validations
const joi = require('@hapi/joi')


const registerValidation = (req) => {
    const regSchema = joi.object({
        first_name: joi.string().required(),
        last_name: joi.string().required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    })
    return regSchema.validate(req)
}

const loginValidation = (req) => {
    const logSchema = joi.object({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    })

    return logSchema.validate(req)
}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation