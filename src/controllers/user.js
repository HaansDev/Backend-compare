const controller = {};
const User = require("../models/user");
const Valoration = require("../models/valorations");
const Laptops = require("../models/laptops");
const authJWT = require("../auth/jwt");
const validator = require("../validators/usersvalidator");

controller.signup = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username

  const validation = validator.validate(req.body);

  if (validation.error) {
    const errors = [];
    for (let index = 0; index < validation.error.details.length; index++) {
      errors.push(validation.error.details[index].message);
    }
    console.log(validation.error);
    res.status(400).send(errors);
    return;
  }

  if (!email || !password || !username) {
    res.status(400).send();
    return;
  }
  try {
    const user = new User({ email: email, password: password, username: username });
    await user.save(); //Aquí se encripta
    const data = await User.findOne({ email: email });
    res.send({ status: "ok", data: data });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

controller.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(401).send("Credenciales incorrectas");
    return;
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(401).send("Credenciales incorrectas");
      return;
    }

    const validate = await user.isValidPassword(password);
    if (!validate) {
      res.status(401).send("Credenciales incorrectas");
      return;
    }
    const dataToken = authJWT.createToken(user);
    return res.send({
      access_token: dataToken[0],
      expires_in: dataToken[1],
    });
  } catch (err) {
    console.log(err);
    res.status(401).send("Credenciales incorrectas");
    return;
  }
};

controller.userDetail = async (req, res) => {
    res.send({ status: "ok", data: req.user })
};


controller.valoration = async (req, res) => {
  const user = req.user;
  const laptopToValorate = req.body.laptop;

  // if (user.role == "company") {
  //   res.status(400).send("Solo un ususario puede apuntarse a ofertas");
  //   return;
  // }

  try {
    const laptop = await Laptops.findById(laptopToValorate);

    if (!laptop) {
      res.status(400).send("El portátil no existe");
      return;
    }

    const previewsValoration = await Valoration.findOne({laptop: req.body.laptop, user: user._id})

    if (previewsValoration) {
      res.status(400).send("Ya has valorado anteriormente este portátil");
      return;
    }

    const valoration = new Valoration({
      user: user,
      laptop: laptop,
      valoration: req.body.valoration,
    });

    await valoration.save();
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

module.exports = controller;
