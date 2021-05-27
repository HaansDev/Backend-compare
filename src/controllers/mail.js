const controller = {};
const mailer = require("../helpers/mailer");

// const Email = require("email-templates");
// const path = require("path");
// const appDir = path.join(__dirname, "../templates/");
// const emailObj = new Email({
//   views: {
//     root: appDir,
//   },
// });

controller.sendAdminToAdmin = async (req, res) => {
    const destination = req.query.destination;
    const subject = req.query.subject;
    const message = req.query.message;
    

  try {
    
    await mailer.send(subject, destination, message);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error al enviar el email" });
  }
};

controller.sendPageToNewUser = async (req, res) => {
    const destination = req.query.destination;
    
    
  try {
    const subject = "Bienvenido a Laptop Compare";
    const message = "Bienvenido a la mejor página para comparar portátiles. Compara y puntúa desde ya";

    await mailer.send(subject, destination, message);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error al enviar el email" });
  }
};





module.exports = controller;
