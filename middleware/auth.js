const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        
        const token = req.headers.authorization.split(" ")[1];
        
        const isCustomAuth = token.length < 500;

        

        if (token && isCustomAuth) {
            jwt.verify(token, 'test', (err, decodedData) => {
                if (err) return res.status(403).json({ message: "Token expired" })
                req.body.userId = decodedData?.id;
            });
            
            
        }
        
        next()
    } catch (error) {
        console.error(error)
        next('router')
    }
}

module.exports = auth;