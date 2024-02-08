const express = require('express');
const router = express.Router();
const Object = require("../models/model");

router.get("/", async (req, res)=> {
    try{
        const cafes = await Object.find();
            
            res.render("home",{
                title: "home page",
                data: cafes
            });
    }catch{
        console.log("error while getting values from data")
    }
})
router.get('/add', (req, res)=> {
    res.render("add_cafe", {
        title: "Add a new cafe"
    })
})

router.post('/add', async (req, res)=> {
    try{
        const cafe = new Object({
            name : req.body.name,
            phone: req.body.phone,
            reviewSum: 0,
            reviewCount: 0
        });
        await cafe.save();
        req.session.message = {
            type: "success",
            info: "you have added a cafe successfully"
        }
        res.redirect('/');
    }catch{
        console.log("error while adding cafe data")
    }
   
});
router.get("/rate/:id", async(req, res)=> {
    const id = req.params.id;
    try{
        const cafe =await Object.findById(id);
        console.log(id);
        res.render("rate_cafe", {
            title: "Rate Cafe",
            cafe: cafe
        });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    }catch(err){
        console.log(err);
    }
});
router.post("/rate/:id", async(req, res)=> {
    const id = req.params.id;
    const rating = parseInt(req.body.rating);
    try{
        const cafe = await Object.findById(id);
        const newSum = parseInt(cafe.reviewSum+ rating);
        const newCount = parseInt(cafe.reviewCount+1);
        await Object.findByIdAndUpdate(id,{
           reviewSum: newSum,
           reviewCount: newCount,
        });

        req.session.message = {
            type: "success",
            info: "you have rated successfully"
        }
        res.redirect("/");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    }catch(err){
        console.log(err);
    }
})
module.exports = router;