const { Router } = require("express");

const auth = require("../middleware/auth.js");
const User = require("../models/user.js");
const router = Router();

router.use(auth);



router.post("/profile", async (req, res)=>{
    const { userId, name, address, zip, description } = req.body;
    
    try {
        
        const filter = { "_id":userId };
        const update = { name, address, zip, description };
        let result = await User.findOneAndUpdate(filter, update);
        
        res.status(200).json({message: "Successfully updated"})
        
        
    } catch(err){
        res.status(500).json({ message: "Something went wrong." });
    }
})

router.post("/profile/occupation", async (req, res)=>{
    const { userId, occupation } = req.body;
    
    try {
        
        const filter = { "_id":userId };
        const update = { occupation };
        let result = await User.findOneAndUpdate(filter, update);
        
        res.status(200).json({message: "Successfully updated"})
        
        
    } catch(err){
        res.status(500).json({ message: "Something went wrong." });
    }
})

router.post("/profile/status", async (req, res)=>{
    const { userId, status } = req.body;
    
    try {
        
        const filter = { "_id":userId };
        const update = { status };
        let result = await User.findOneAndUpdate(filter, update);
        
        res.status(200).json({message: "Successfully updated"})
        
        
    } catch(err){
        res.status(500).json({ message: "Something went wrong." });
    }
})

router.post("/pic", async (req, res)=>{
    const { userId, picture } = req.body;
    
    try {
        
        const filter = { "_id":userId };
        const update = { picture };
        let result = await User.findOneAndUpdate(filter, update);
        
        res.status(200).json({message: "Successfully updated"})
        
        
    } catch(err){
        res.status(500).json({ message: "Something went wrong." });
    }
})

router.post("/first", async (req, res)=>{
    const { userId, dashboard, bills, community, live } = req.body;
    
    try {
        if (dashboard){
            const filter = { "_id":userId };
            const update = { dashboard };
            let result = await User.findOneAndUpdate(filter, update);
            
            res.status(200).json({message: "Successfully updated"})
        } else if (bills){
            const filter = { "_id":userId };
            const update = { bills };
            let result = await User.findOneAndUpdate(filter, update);
            
            res.status(200).json({message: "Successfully updated"})
        } else if (community){
            const filter = { "_id":userId };
            const update = { community };
            let result = await User.findOneAndUpdate(filter, update);
            
            res.status(200).json({message: "Successfully updated"})
        } else if (live){
            const filter = { "_id":userId };
            const update = { live };
            let result = await User.findOneAndUpdate(filter, update);
            
            res.status(200).json({message: "Successfully updated"})
        } 
        
        
        
    } catch(err){
        res.status(500).json({ message: "Something went wrong." });
    }
})





module.exports = router