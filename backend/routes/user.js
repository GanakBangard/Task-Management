const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// SIGN-IN (i.e., Registration) API
router.post("/sign-in", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existUser = await User.findOne({ username });
    const existEmail = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    if (username.length < 4) {
      return res.status(400).json({ message: "Username should have at least 4 characters." });
    }

    if (existEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }
    const hashPass = await bcrypt.hash(password,10);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPass, 
    });
    

    await newUser.save();
    return res.status(200).json({ message: "Sign-up Successful" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


//Login
router.post("/log-in", async(req,res) =>{
    const {username,password} = req.body;
    const existUser = await User.findOne({ username });
    if (!existUser) {
        return res.status(400).json({ message: "Username does not exists!" });
      }
    bcrypt.compare(password,existUser.password,(err,data)=>{
        if(data){
            const authClaims = [{name:username}, {jti:jwt.sign({},"Ganak")}];
            const token = jwt.sign({authClaims},"Ganak",{expiresIn:"2d"});
            res.status(200).json({id:existUser._id, token:token})
        }else{
            return res.status(400).json({ message: "Invaild credentials" });
        }
    })
})
module.exports = router;
