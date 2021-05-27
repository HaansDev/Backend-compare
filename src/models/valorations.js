const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ValorationSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'user'},
  laptop:  {type: Schema.Types.ObjectId, ref: 'laptop'},
  valoration: { type: Number, required: true},
  savedAt: { type: Date, default: Date.now },
}, {versionKey: false});

const ValorationsModel = mongoose.model("valorations", ValorationSchema);

module.exports = ValorationsModel;
