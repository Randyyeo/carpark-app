const { Router } = require("express");
/* const Todo = require('../models/todo.js'); */
const Tips = require("../models/tips")
const Post = require("../models/post")
const auth = require("../middleware/auth.js");



const router = Router();
router.use(auth)

router.post("/", async (req, res) => {
  const { text, day, reminder, userId } = req.body;
  try {
    /* const result = await Todo.insertMany({ userId, text, day, reminder, }) */
    console.log(result)
    res.status(201).send({message: "Succesfully added"})
  } catch (err) {
    console.log(err);
  }
});

router.post("/post", async (req, res) => {
  const { post, date, username, replies, userId } = req.body;
  try {
    const result = await Post.insertMany({ userId, post, username, date, replies })
    res.status(201).send({message: "Succesfully added"})
  } catch (err) {
    console.log(err);
  }
});

router.post("/tips", async (req, res) => {
  const { tips, userId } = req.body;
  
  try {
    const result = await Tips.find({ "userId" : userId });
    
    if (result.length > 0){
      
      const filter = { userId };
      const update = { tips: tips };
      let result = await Tips.findOneAndUpdate(filter, update);
      
      res.status(201).json({result})
    } else {
      
      
      const result = await Tips.insertMany({ userId, tips })
      
      res.status(201).json({result})
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
