const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const landingPage = (req, res) => {
  // console.log("Welcome to my Landing page")
  // response.send("<h1>Hello Abel</h1>")
  // console.log(__dirname)
  // response.sendFile(__dirname + "/index.html")
  res.render("index");
};

const aboutPage = (req, res) => {
  // res.sendFile(__dirname + "/about.html")
  res.render("about");
};

const signUp = (req, res) => {
  res.render("signup");
};

const userDashboard = async (req, res) => {
  const studentUsers = await userModel.find();
  res.render("dashboard", { user: "Bukunmi", gender: "male", studentUsers });
};

const registerUser = (req, res) => {
  // studentUsers.push(req.body)
  // console.log(studentUsers)
  // res.send("User registered successfully")
  console.log(req.body);
  let form = new userModel(req.body);
  form
    .save()
    .then(() => {
      console.log("User Saved Successfully");
      res
        .status(201)
        .send({ status: true, message: "User registered successfully", form });
      // res.redirect("/dashboard");
    })
    .catch((err) => {
      console.log("There is an error");
      res
        .status(500)
        .send({ status: false, message: "Unable to register user" });
      console.log(err);
    });
};

const authUser = (req, res) => {
  // console.log(req.body)
  let { password } = req.body;
  userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        // res.send({ message: "Right credential", status: true });
        user.validatePassword(password, (err, same) => {
          if (!same) {
            res.send({ status: false, message: "Wrong Credential" });
          } else {
            let token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
            // console.log(token)
            res
              .status(200)
              .send({ status: true, message: "Right Credential", token });
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

const getDashboard = (req, res) => {
  let token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, "secret", async (err, decoded) => {
    if (err) {
      console.log(err);
      return res.send({ status: false, message: "Expired Token or Invalid token" });
    }

    try {
      // Find the user by ID from token
      const user = await userModel.findById(decoded.id).select(
        "firstname lastname email register_date"
      );

      if (!user) {
        return res.send({ status: false, message: "User not found" });
      }

      res.send({
        status: true,
        message: "Valid Token",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: false, message: "Server Error" });
    }
  });
};


const deleteUser = (req, res) => {
  userModel
    .findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "user doesn't exist" });
      } else {
        console.log("user deleted");
        console.log(user);
        res.redirect("/dashboard");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const editUser = (req, res) => {
  userModel.findById(req.params.id).then((user) => {
    if (!user) {
      console.log("No such user here");
    } else {
      res.render("edit-user", { user });
    }
  });
};

const updateUser = (req, res) => {
  userModel
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(() => {
      res.redirect("/dashboard");
    })
    .catch((error) => {
      console.log(error);
    });
};

const uploadFile = (req, res) => {
  let file = req.body.myfile;
  cloudinary.v2.uploader.upload(file, (err, result) => {
    if (err) {
      console.log("File could not be uploaded");
      res.send({ message: "Image not uploaded", status: false });
    } else {
      console.log(result);
      let imageLink = result.secure_url;
      res.send({ message: "Image Uploaded", status: true, imageLink });
    }
  });
};

module.exports = {
  registerUser,
  editUser,
  updateUser,
  deleteUser,
  userDashboard,
  aboutPage,
  signUp,
  landingPage,
  authUser,
  getDashboard,
  uploadFile,
};