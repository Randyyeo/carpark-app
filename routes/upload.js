const { Router } = require("express");
const User = require("../models/user.js");
const auth = require("../middleware/auth.js");
const router = Router();

const {cloudinary} = require("../cloudinary")


router.use(auth);
router.post("/", async (req, res) => {
  try {
    const {userId} = req.body
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr,{
        folder: "utility/"
    })
    const publicid = uploadedResponse.url
    const filter = { "_id":userId };
    const update = { picture: publicid };
    let result = await User.findOneAndUpdate(filter, update);
        
    
    res.status(200).json({ url: publicid})
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Something went wrong"})
  }

});





module.exports = router