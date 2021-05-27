const Joi = require("joi");

const schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
    adminID: Joi.string().pattern(new RegExp('^[0-9]{6}\-LCA$')),
    name: Joi.string(),
    lastname: Joi.string(),
});

//schema anterior con las validaciones

function validate(body) {
    return schema.validate({
        email: body.email,
        password: body.password,
        adminID: body.adminID,
        name: body.name,
        lastname: body.lastname
     }, {abortEarly: false})
  }
 
 module.exports = {
     validate
  }