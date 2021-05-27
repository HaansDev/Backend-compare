const Joi = require("joi");

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
    username: Joi.string().min(6).required()
});

//schema anterior con las validaciones

function validate(body) {
    return schema.validate({
        email: body.email,
        password: body.password,
        username: body.username,
     }, {abortEarly: false})
  }
 
 module.exports = {
     validate
  }