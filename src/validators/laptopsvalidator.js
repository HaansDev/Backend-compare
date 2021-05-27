const Joi = require("joi");
const schema = Joi.object({
    image: Joi.string().uri().required(),
    brand: Joi.string().required(),
    model: Joi.string().required(),
    price: Joi.number().required(),
    url: Joi.string().uri(),
    fabric_date: Joi.date(),
    cpu: Joi.string(),
    cpu_core: Joi.number(),
    cpu_speed: Joi.number(),
    ram_type: Joi.string(),
    ram_speed: Joi.number(),
    ram_size: Joi.number(),
    ram_expand: Joi.number(),
    graphics: Joi.string(),
    resolution: Joi.string(),
    rom: Joi.string(),
    hdmi: Joi.string(),
    usb: Joi.string(),
    battery: Joi.number(),
    os: Joi.string(),
    weight: Joi.number(),
    valoration: Joi.number(),
});

//schema anterior con las validaciones

function validate(body) {
    return schema.validate({
    image: body.image,
    brand: body.brand,
    model: body.model,
    price: body.price,
    fabric_date: body.fabric_date,
    cpu: body.cpu,
    cpu_core: body.cpu_core,
    cpu_speed: body.cpu_speed,
    ram_type: body.ram_type,
    ram_speed: body.ram_speed,
    ram_size: body.ram_size,
    ram_expand: body.ram_expand,
    graphics: body.graphics,
    resolution: body.resolution,
    rom: body.rom,
    hdmi: body.hdmi,
    usb: body.usb,
    battery: body.battery,
    os: body.os,
    weight: body.weight,
    valoration: body.valoration,
     }, {abortEarly: false})
  }
 
 module.exports = {
     validate
  }