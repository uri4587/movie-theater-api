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

router.get("/genre/:genre", async (req, res) => {
    const allShowsWithGnere = await Show.findAll({
        where: {
            genre: req.body.genre
        }
    });

    res.json(allShowsWithGnere);
})

router.post("/", [
    check("title").not().isEmpty().trim(),
    check("genre").not().isEmpty().trim(),
    check("rating").not().isEmpty().trim(),
    check("status").not().isEmpty().trim()
    ], async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
        res.json({error: errors.array()})
        } else {
            const createdShow = await Show.create({
                title: req.body.title,
                genre: req.body.genre,
                rating: req.body.rating,
                status: req.body.status
            })

            res.json(createdShow);
        }
                
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

router.put("/:id/updates", [
    check("status").not().isEmpty().trim(),
    check("status").isLength({min: 5, max: 25})

],
     async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
        res.json({error: errors.array()})
        } else {
            const showToUpdate = await Show.findByPk(req.params.id);
            if(showToUpdate.status === "canceled" || showToUpdate.status === "on-going") {
                const updatedShow = await showToUpdate.update({
                    
                    status: req.body.status
                    
                })
                res.json(updatedShow)
            } else {
                
                res.json("show already watched")
            }
    }
})

router.delete("/:id", async (req, res) => {
    const showToDelete = await Show.findByPk(req.params.id);
    await showToDelete.destroy();

    res.json(showToDelete)
})



module.exports = router;
