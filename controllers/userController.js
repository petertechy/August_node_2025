const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken")

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
  let { password } = req.body
  userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        // res.send({ message: "Right credential", status: true });
        user.validatePassword(password, (err,same) => {
          if(!same){
            res.send({status: false, message: "Wrong Credential"})
          }
          else{
            let token = jwt.sign({email: req.body.email}, "secret", {expiresIn:60*60})
            // console.log(token)
            res.status(200).send({status: true, message: "Right Credential", token})
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

const getDashboard = (req, res) =>{
  let token = req.headers.authorization.split(" ")[1]
  console.log(token)
  jwt.verify(token, "secret", (err, result)=>{
    if(err){
      console.log(err)
      res.send({status: false, message: "Expired Token or Invalid token"})
    }else{
      console.log(result)
      res.send({status: true, message: "Valid Token"})
    }
  })
}

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
  getDashboard
};
