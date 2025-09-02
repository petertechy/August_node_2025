const express = require("express")
const { landingPage, signUp, aboutPage, registerUser, deleteUser, editUser, updateUser, userDashboard } = require("../controllers/userController")

const router = express.Router()

router.get("/", landingPage)
router.get("/sign-up", signUp)
router.get("/about", aboutPage)
router.post("/register", registerUser)
router.post("/delete/:id", deleteUser)
router.post("/edit-user/:id", editUser)
router.post("/update-user/:id", updateUser)
router.get("/dashboard", userDashboard)

module.exports = router