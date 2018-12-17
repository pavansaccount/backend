const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const _ = require('lodash');
var { Student } = require('../models/student.model.js');

// => localhost:3000/employees/
/*`
});*/
router.get('/:rollno', (req, res) => {
    console.log(req.params.rollno);
    Student.findOne({ rollno: req.params.rollno },
        (err, stu) => {
            if (!stu) {
                console.log('in get d1');
                return res.status(404).json({status: false, message: 'User record not found.'});
            }

            else {
                console.log('in get d2');
                return res.status(200).json({ status: true, stu: _.pick(stu, ['_id', 'rollno', 'email', 'name', 'position', 'office', 'salary']) });
                }
        }
    );
});

router.get('/:_id', (req, res) => {
    console.log('in get');
    if (!ObjectId.isValid(req.params._id))
        return res.status(400).send(`No record with given _id : ${req.params._id}`);

    Student.findById(req.params._id, (err, doc) => {

        if (!err) { res.send(doc); } else { console.log('Error in Retriving student :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    console.log(req.body.rollno);
    var stu = new Student({
        rollno: req.body.rollno,
        email: req.body.email,
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    stu.save((err, doc) => {
        if (!err) {
            res.send(doc);
            console.log('in post succ');
        } else { console.log('Error in student Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:_id', (req, res) => {
    console.log('in put');
    if (!ObjectId.isValid(req.params._id))
        return res.status(400).send(`No record with given _id : ${req.params._id}`);

    var emp = {
        rollno: req.body.rollno,
        email: req.body.email,
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };
    Student.findByIdAndUpdate(req.params._id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in student Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:_id', (req, res) => {
    if (!ObjectId.isValid(req.params._id))
        return res.status(400).send(`No record with given _id : ${req.params._id}`);

    Student.findByIdAndRemove(req.params._id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Student Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;