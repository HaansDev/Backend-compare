const controller = {};
const Admin = require("../models/admin");
const authJWT = require("../auth/jwtadmin");
const validator = require("../validators/adminvalidator");

controller.signup = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const adminID = req.body.adminID;
  const name = req.body.name;
  const lastname = req.body.lastname;

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

  if (!email || !password || !adminID || !name || !lastname) {
    res.status(400).send();
    return;
  }
  try {
    const admin = new Admin({
      email: email,
      password: password,
      adminID: adminID,
      name: name,
      lastname: lastname,
    });
    await admin.save(); //Aquí se encripta
    const data = await Admin.findOne({ adminID: adminID });
    res.send({ status: "ok", data: data });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

controller.login = async (req, res) => {
  const adminID = req.body.adminID;
  const password = req.body.password;
  if (!adminID || !password) {
    res.status(401).send("Credenciales incorrectas");
    return;
  }

  try {
    const admin = await Admin.findOne({ adminID: adminID });
    if (!admin) {
      res.status(401).send("Credenciales incorrectas");
      return;
    }

    const validate = await admin.isValidPassword(password);
    if (!validate) {
      res.status(401).send("Credenciales incorrectas");
      return;
    }
    const dataToken = authJWT.createToken(admin);
    return res.send({
      access_token_admin: dataToken[0],
      expires_in: dataToken[1],
    });
  } catch (err) {
    console.log(err);
    res.status(401).send("Credenciales incorrectas");
    return;
  }
};

controller.adminDetail = async (req, res) => {
  res.send({ status: "ok", data: req.user });
};

controller.updateAdmin = async (req, res) => {
  // let image = req.body.image
  let name = req.body.name;
  let lastname = req.body.lastname;

  const id = req.params.id;

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

  try {
    await Admin.findByIdAndUpdate(id, {
      name: name,
      lastname: lastname
    });
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
};


controller.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = controller;
