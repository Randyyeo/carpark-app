const { Router } = require("express");

const auth = require("../middleware/auth.js");
const Post = require("../models/post.js");

const router = Router();
router.use(auth);
router.post("/post", async (req, res) => {
  const { userId, id } = req.body;
  try {
    const result = await Post.deleteOne({ "userId" : userId, "_id" : id });
    res.status(200).json({ message: "Successfully deleted"})
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
