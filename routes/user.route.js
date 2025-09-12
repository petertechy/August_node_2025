const express = require("express")
const { landingPage, signUp, aboutPage, registerUser, deleteUser, editUser, updateUser, userDashboard, authUser, getDashboard, uploadFile } = require("../controllers/userController")

const router = express.Router()

router.get("/", landingPage)
router.get("/sign-up", signUp)
router.get("/about", aboutPage)
router.post("/register", registerUser)
router.post("/delete/:id", deleteUser)
router.post("/edit-user/:id", editUser)
router.post("/update-user/:id", updateUser)
router.get("/user-dashboard", userDashboard)
router.post("/signin", authUser)
router.get("/dashboard", getDashboard)
router.post("/upload", uploadFile)

module.exports = router
