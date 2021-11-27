const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const findRoute = require("./routes/find");
const authRoute = require("./routes/middleware")
const db = require("./database");
const jwt = require("jsonwebtoken");
const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));

app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
});

app.use(express.static(__dirname + "/public"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));

app.use("/find", findRoute);
app.use("/auth", authRoute);

app.post("/register", async (req, res) => {
  const { first, last, email, password, re_password, phone } = req.body;
  

  try {

  
    if (email && password && email && password && re_password) {
      
      let users = await db
        .promise()
        .query(`SELECT * FROM ACCOUNTS WHERE email = '${email}'`);
      
      if (users[0].length >= 1) {
        return res.status(400).json({ message: "User already exists" });
      }

      if (password !== re_password) {
        return res.status(400).json({ message: "Passwords are not the same" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      
      let user = await db
        .promise()
        .query(
          `INSERT INTO ACCOUNTS (email, password, firstname, lastname, phone) values ('${email}', '${hashedPassword}', '${first}', '${last}', ${phone})`
        );
      let added_user = await db
      .promise()
      .query(`SELECT * FROM ACCOUNTS WHERE email = '${email}'`);
      
      added_user = added_user[0][0]
      const token = jwt.sign({ email: added_user.email, id: added_user.id }, "test", {
        expiresIn: "1h",
      });
      
      res.status(200).json({ token });
    } else {
      res.status(500).json({ message: "Something went wrong." });
    }
  } catch(error){
    console.log(error)
  }
  
});

/* app.get("/login", async(req, res)=>{
  res.sendFile(__dirname + '/public/login.html')
}) */

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  if (email && password) {
    let user = await db
      .promise()
      .query(`SELECT * FROM ACCOUNTS WHERE email = '${email}'`);
    user = user[0][0];
    
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email, id: user.id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } else {
    return res.status(500).json({ message: "Missing Information" });
  }
});

app.listen(4000, console.log("Running this app on 4000"));
