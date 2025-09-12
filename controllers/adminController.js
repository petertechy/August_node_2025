const adminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");

// Render admin signup page
const adminSignUp = (req, res) => {
  res.render("admin-signup");
};

// Register admin
const registerAdmin = (req, res) => {
  let form = new adminModel(req.body);
  form
    .save()
    .then(() => {
      console.log("Admin registered successfully");
      res.status(201).send({ status: true, message: "Admin registered", form });
    })
    .catch((err) => {
      console.log("Admin registration error", err);
      res.status(500).send({ status: false, message: "Unable to register admin" });
    });
};

// Authenticate admin
const authAdmin = (req, res) => {
  let { password } = req.body;
  adminModel
    .findOne({ email: req.body.email })
    .then((admin) => {
      if (admin) {
        admin.validatePassword(password, (err, same) => {
          if (!same) {
            res.send({ status: false, message: "Wrong Credential" });
          } else {
            let token = jwt.sign({ id: admin._id, role: "admin" }, "secret", { expiresIn: "1h" });
            res.status(200).send({ status: true, message: "Login successful", token });
          }
        });
      } else {
        res.send({ message: "Wrong credential", status: false });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get Admin Dashboard (with token verification)
const getAdminDashboard = (req, res) => {
  let token = req.headers.authorization?.split(" ")[1];

  jwt.verify(token, "secret", async (err, decoded) => {
    if (err) {
      return res.send({ status: false, message: "Expired or Invalid Token" });
    }

    try {
      const admin = await adminModel.findById(decoded.id).select("firstname lastname email role register_date");

      if (!admin) {
        return res.send({ status: false, message: "Admin not found" });
      }

      res.send({ status: true, message: "Valid Token", admin });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: false, message: "Server Error" });
    }
  });
};

// Delete Admin
const deleteAdmin = (req, res) => {
  adminModel
    .findByIdAndDelete(req.params.id)
    .then((admin) => {
      if (!admin) {
        return res.status(404).send({ message: "Admin not found" });
      }
      console.log("Admin deleted");
      res.redirect("/admin/dashboard");
    })
    .catch((err) => console.log(err));
};

// Edit Admin
const editAdmin = (req, res) => {
  adminModel.findById(req.params.id).then((admin) => {
    if (!admin) {
      console.log("No such admin found");
    } else {
      res.render("edit-admin", { admin });
    }
  });
};

// Update Admin
const updateAdmin = (req, res) => {
  adminModel
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(() => res.redirect("/admin/dashboard"))
    .catch((error) => console.log(error));
};

module.exports = {
  registerAdmin,
  authAdmin,
  getAdminDashboard,
  deleteAdmin,
  editAdmin,
  updateAdmin,
  adminSignUp,
};
