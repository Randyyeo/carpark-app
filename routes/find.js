const { Router } = require("express");
const db = require("../database");
const auth = require("../middleware/auth.js");


const router = Router();
router.use(auth);


router.get("/", async (req, res) => {
  const { userId } = req.body;
  try {
    let user = await db
        .promise()
        .query(
          `SELECT email, firstname, lastname, phone FROM ACCOUNTS`
        );

    res.status(200).send(user);
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
