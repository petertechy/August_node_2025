const userModel = require("../models/userModel");

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
      // res.status(201).send({status: true, message: "User registered successfully", form})
      res.redirect("/dashboard");
    })
    .catch((err) => {
      console.log("There is an error");
      res
        .status(500)
        .send({ status: false, message: "Unable to register user" });
      console.log(err);
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

module.exports = {registerUser,editUser,updateUser,deleteUser,userDashboard,aboutPage,signUp,landingPage}