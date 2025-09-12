const express = require("express");
const {
  registerAdmin,
  authAdmin,
  getAdminDashboard,
  deleteAdmin,
  editAdmin,
  updateAdmin,
  adminSignUp,
} = require("../controllers/adminController");

const router = express.Router();

// Admin routes
router.get("/sign-up", adminSignUp);
router.post("/register", registerAdmin);
router.post("/signin", authAdmin);
router.get("/dashboard", getAdminDashboard);
router.post("/delete/:id", deleteAdmin);
router.post("/edit-admin/:id", editAdmin);
router.post("/update-admin/:id", updateAdmin);

module.exports = router;
