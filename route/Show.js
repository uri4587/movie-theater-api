const express = require("express");
const router = express.Router();
const {Show} = require("../models/Show")
const {check , validationResult} = require("express-validator");



router.get("/", async (req, res) => {
    const allShows = await Show.findAll();
    res.send(allShows);
})

router.get("/:id", async (req, res) => {
    const show = await Show.findByPk(req.params.id);

    if(show) {
        res.send(show)
    } else {
        res.json("Show either has been deleted or does not exist")
    }
    ;
})

router.get("/genres/:genre", async (req, res) => {
    const allShowsWithGnere = await Show.findAll({
        where: {
            genre: req.params.genre
        }
    });

    res.json(allShowsWithGnere);
})

router.put("/:id/watched", [
    check("rating").not().isEmpty().trim()]
, async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
    res.json({error: errors.array()})
    } else {
    const showToUpdate = await Show.findByPk(req.params.id);
        if(showToUpdate.userId === null) {
            res.json("show not yet watched")
        } else {
        
        
        const updatedShow = await showToUpdate.update({
          
            rating: req.body.rating,
            
        })
        res.json(updatedShow)
        }
    }
    
})

module.exports = router;