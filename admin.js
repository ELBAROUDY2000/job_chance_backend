const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const {Employee} = require('../models/Employee');
const {Job} = require('../models/job');
const {Company} = require("../models/Company");
const {requireAuth} = require("./requireAuth");
const {Admin} = require("../models/Admin");

router.post("/register", async (req, res, next) => {
    const admin = await Admin.findOne({user_name: req.body.user_name});
    if (admin) {
        return res.json({error: "exists"});
    }
    const admin1 = new Admin({
        user_name: req.body.user_name,
        apass: req.body.password,
    });
    await admin1.save();
    res.json(admin1.toObject());
});
router.post("/login", async (req, res) => {
    Admin.findOne({email: req.body.email}, async (err, admin) => {
        if (err) return res.status(500).send({message: "server error"});
        if (!admin) return res.status(404).send({message: "wrong username"});
        const valid = await bcryptjs.compare(req.body.password, company.password);
        if (!valid) return res.status(401).send({message: "wrong password"});
        const token = await jwt.sign({id: admin._id}, "secret secret", {expiresIn: "1y"});
        return res.status(200).send({
            token
        });
    });
});
router.delete("/dCompany", [requireAuth], async (req, res) => {
    if (!req.user) {
        return res.status(401).send({message: "not authorized"});
    }
    Company.deleteOne({email: req.body.email}, async (err, company) => {
        if (err) return res.status(500).send({message: "server error"});
        if (!company) return res.json({error: "don't delete company"});
        return res.json({error: "done delete company"});
    })
});

router.delete("/dEmployee", [requireAuth], async (req, res) => {
    if (!req.user) {
        return res.status(401).send({message: "not authorized"});
    }
    Employee.deleteOne({email: req.body.email}, async (err, employee) => {
        if (err) return res.status(500).send({message: "server error"});
        if (!employee) return res.json({error: "don't delete employee"});
        return res.json({error: "done delete employee"});
    })
});

router.delete("/dJobs", [requireAuth], async (req, res) => {
    if (!req.user) {
        return res.status(401).send({message: "not authorized"});
    }
    Job.deleteOne({email: req.body.email}, async (err, job) => {
        if (err) return res.status(500).send({message: "server error"});
        if (!job) return res.json({error: "don't delete job"});
        return res.json({error: "done delete job"});
    })
});


module.exports = router;
