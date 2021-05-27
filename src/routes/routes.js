const express = require("express")
const router = express.Router()
const laptopsController = require("../controllers/laptops")
const userController = require("../controllers/user")
const adminController = require("../controllers/admin")
const mailController = require("../controllers/mail")
const passport = require('../auth/auth')
const passportadmin = require('../auth/authadmin')

router.post("/savelaptop",  laptopsController.saveLaptop)
router.get("/laptops", laptopsController.getLaptops)
router.get("/laptops/:page", laptopsController.getLaptopsPagination)
router.get("/alllaptops", laptopsController.getAllLaptops)
router.get("/somelaptops/:page", laptopsController.getSomeLaptops)
router.get("/pagelaptops/:page", laptopsController.getPaginationLaptops)
router.get("/bestlaptops", laptopsController.getBestLaptops)
router.get("/laptop/:ident", laptopsController.getLaptop)
router.put("/laptop/:id",  laptopsController.updateLaptop)
router.delete("/laptop/:id",  laptopsController.deleteLaptop)


router.post("/signup", userController.signup)
router.post("/login", userController.login)
router.get("/user", passport.auth, userController.userDetail) // Este auth viene de la línea 8 de auth.js

router.post("/valoration", passport.auth, userController.valoration)

router.post("/signupadmin", adminController.signup)
router.post("/loginadmin", adminController.login)
router.get("/admin", passportadmin.authadmin, adminController.adminDetail) // Este auth viene de la línea 8 de auth.js
router.put("/admin/:id", passportadmin.authadmin, adminController.updateAdmin)
router.get("/admins",passportadmin.authadmin, adminController.getAdmins)

router.get("/sendAdminToAdmin",passportadmin.authadmin, mailController.sendAdminToAdmin)
router.get("/sendPageToNewUser", mailController.sendPageToNewUser)



module.exports = router
