const express = require('express');
const port = 3001;
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose")
const companyRouter = require('./routes/company');
const employeeRouter = require('./routes/employee');
const jobsRouter = require('./routes/jobs');
const adminRouter = require('./routes/admin');

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })
    .then(result => {
        console.log("mongodb connected");
    })
    .catch(err => {
        console.log(err);
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
app.get("/", (req, res) => {
    res.json("Heeeeeelllllooooo");
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/company", companyRouter);
app.use("/employee", employeeRouter);
app.use("/jobs", jobsRouter);
app.use("/admin", adminRouter);


module.exports = app;
