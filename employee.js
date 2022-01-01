const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const {Employee} = require('../models/Employee');
const {Job} = require('../models/job');
const {requireAuth} = require("./requireAuth");


router.post("/login", async (req, res) => {
    Employee.findOne({email: req.body.email}, async (err, employee) => {
        if (err) return res.status(500).send({message: "server error"});
        if (!employee) return res.status(404).send({message: "wrong email"});
        const valid = await bcryptjs.compare(req.body.password, employee.password);
        if (!valid) return res.status(401).send({message: "wrong password"});
        const token = await jwt.sign({id: employee._id}, "shaymaa shaymaa", {expiresIn: "1y"});
        return res.status(200).send({
            token
        });
    });
});

router.put("/update", [requireAuth], async (req, res) => {
    const employee = await Employee.findById(req.body.id);
    if (!employee) return res.status(404).send({message: "employee not found"});
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.phone = req.body.phone;
    employee.jobTitle = req.body.jobTitle;
    employee.dateOfBirth = req.body.dateOfBirth;
    employee.gender = req.body.gender;
    employee.nationality = req.body.nationality;
    employee.country = req.body.country;
    employee.city = req.body.city
    employee.skills = req.body.skills;
    employee.courses = req.body.courses;
    employee.workExperience = req.body.workExperience;
    employee.cvLink = req.body.cvLink;
    employee.recommendations = req.body.recommendations;
    await employee.save();
    return res.json({employee});
});

router.post("/register", async (req, res, next) => {
    const emp = await Employee.findOne({email: req.body.email});
    if (emp) {
        return res.json({error: "exists"});
    }
    const emp1 = new Employee({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        jobTitle: req.body.jobTitle,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        nationality: req.body.nationality,
        country: req.body.country,
        estate: req.body.estate,
        workExperience: req.body.workExperience,
        courses: req.body.courses,
        city: req.body.city,
        skills: req.body.skills
    });
    await emp1.save();
    res.json(emp1.toObject());
});

router.post("/recommendations/:id", [requireAuth],
    async (req, res) => {
        if (!req.user) {
            return res.status(401).send({message: "unauthorized"});
        }
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).send({message: "employee not found"});
        }
        employee.recommendations.push(req.body.recommendations);
        await employee.save();
        return res.json(employee.toObject());
    }
)
/*router.delete("/delete", [requireAuth], async (req, res) => {
    if (!req.user) {
        return res.status(401).send({message: "not authorized"});
    }
    Employee.deleteOne({email: req.body.email}, async (err, employee) => {
        if (err) return res.status(500).send({message: "server error"});
        if (!employee)  return res.json({error: "don't delete"});
        return res.json({error: "done delete"});
});*/
router.post("/apply/:id",[requireAuth] , async (req,res)=>{
    if(!req.user) return res.status(401).send({message:"unauthorized"});
    const job = Job.findOne(req.params.id);
    if(!job) return res.status(404).send({message:"job not found"});
    job.applied.push(req.user.id);
    return res.json(job.toObject());
})

module.exports = router;