const router = require('express').Router();
const User = require('../models/User');
const authenticateToken = require('../middlewares/auth')

// get a single user using jsonwebtokens
router.get("/get-user", authenticateToken, (req, res) => {
    User.find({}, async (error, each) => {
        if (error){
            res.send({message: error});
            return;
        }
        
        res.json(each.filter((user) => user.email === req.user.email));

    });
    
});

module.exports = router;