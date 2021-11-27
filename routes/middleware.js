const jwt = require('jsonwebtoken');
const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        

        if (token && isCustomAuth) {
            jwt.verify(token, 'test', (err, decodedData) => {
                if (err) {
                    return res.status(403).json({ message: "Token expired"})
                } else {
                    return res.status(200).json({message: "Correct User"})
                }
                
            });
            
            
        }
        
    } catch (error) {
        console.error(error)
        next('router')
    }
  });


module.exports = router;