const express = require("express");
const router = express.Router();
const {User} = require("../models/User")
const {check , validationResult} = require("express-validator");
const { Show } = require("../models");

router.get("/", async (req, res) => {
    const allUsers = await User.findAll();
    res.send(allUsers);
})

router.get("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if(user) {
        res.send(user)
    } else {
        res.json("User either has been deleted or does not exist")
    }
    
})

router.get("/:id/shows", async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        include: Show
    });

    if(user) {
        res.send(user)
    } else {
        res.json("User either has been deleted or does not exist")
    }
    
})

router.put("/:id/shows/:showId", async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        include: Show
    });

    const show = await Show.findByPk(req.params.showId)

    

    if(user && show) {
        await user.addShow(show);

        res.send(user)
    } else {
        res.json("Either USER or SHOW has been deleted or does not exist")
    }
    
})



module.exports = router;
