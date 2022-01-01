const {Company} = require("../models/Company");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const {RatingSchema} = require("../models/Rating");
const {Job} = require("../models/job")
const {requireAuth} = require("./requireAuth");
const router = express.Router();

router.post("/login", async (req, res) => {
    Company.findOne({email: req.body.email}, async (err, company) => {
        if (err) return res.status(500).send({message: "server error"});
        if (!company) return res.status(404).send({message: "wrong email"});
        const valid = await bcryptjs.compare(req.body.password, company.password);
        if (!valid) return res.status(401).send({message: "wrong password"});
        const token = await jwt.sign({id: company._id}, "secret secret", {expiresIn: "1y"});
        return res.status(200).send({
            token
        });
    });
});
/*router.delete("/delete", [requireAuth], async (req, res) => {
    if (!req.user) {
        return res.status(401).send({message: "not authorized"});
    }
    Company.deleteOne({email: req.body.email}, async (err, company) => {
        if (err) return res.status(500).send({message: "server error"});
        if (!company)  return res.json({error: "don't delete"});
        return res.json({error: "done delete"});
});*/

router.put("/update", [requireAuth], async (req, res) => {
    if (!req.user) {
        return res.status(401).send({message: "not authorized"});
    }
    const company = await Company.findById(req.body.id);
    if (!company) return res.status(404).send({message: "employee not found"});
    company.name = req.body.name;
    company.email = req.body.email;
    company.phone = req.body.phone;
    company.address = req.body.address;
    company.city = req.body.city;
    company.state = req.body.state;
    company.country = req.body.country;
    company.hrName = req.body.hrName;
    await company.save();
    return res.json({company});
});

router.post("/register", async (req, res, next) => {
    const company = await Company.findOne({email: req.body.email});
    if (company) {
        return res.json({error: "exists"});
    }
    const emp1 = new Company({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        hrName: req.body.hrName
    });
    await company.save();
    res.json(company.toObject());
});

router.post("/rate/:id", [requireAuth], async (req, res) => {
    if (!req.user) {
        return res.status(401).send({message: "not authorized"});
    }
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).send({message: "company not found"});
    const rating = {
        user: req.user.id,
        company: company._id,
        rating: req.body.rating,
        comment: req.body.comment
    };
    company.rating.push(rating);
    return res.json({
        "rating": rating
    });
});

router.post("/addJob" , [requireAuth] , async (req,res)=>{
    if (!req.user) {
        return res.status(401).send({message: "not authorized"});
    }
    const company = await Company.findById(req.user.id);
    if (!company) return res.status(404).send({message: "company not found"});
    const job = new Job({
        company: req.user.id,
        title: req.body.title,
        description: req.body.description,
        salary: req.body.salary,
        location: req.body.location,
        experience: req.body.experience,
        skills: req.body.skills,
        status: req.body.status
    });
    await job.save();
    return res.json({
        "job": job
    });
});


module.exports = router;