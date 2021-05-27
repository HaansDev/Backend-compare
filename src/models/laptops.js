const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LaptopSchema = new Schema({
  image: String,
  brand: String,
  model: String,
  price: Number,
  url: String,
  fabric_date: Date,
  cpu: String,
  cpu_core: Number,
  cpu_speed: Number,
  ram_type: String,
  ram_speed: Number,
  ram_size: Number,
  ram_expand: Number,
  graphics: String,
  resolution: String,
  rom: String,
  hdmi: String,
  usb: String,
  battery: Number,
  os: String,
  weight: Number,
  valoration: { type: Number, default: 0 },
  savedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {versionKey: false});

const LaptopModel = mongoose.model("laptops", LaptopSchema);

module.exports = LaptopModel;
