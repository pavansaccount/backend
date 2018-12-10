const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const request = require('request');
var http = require("http");
const express = require('express');
const Request = mongoose.model('Request');
const User = mongoose.model('User');
module.exports.postrequest = (req, res, next) => {
    var request = new Request();
    requset.rollno= req.body.rollno;
    request.subject = req.body.subject;
    request.description = req.body.description;
    request.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
};

module.exports.getrequest = (req, res) => {
    Request.find( (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Retriving Student :' + JSON.stringify(err, undefined, 2));
        }
    });
};

module.exports.assign = (req, res, next) => {
    console.log(req.body.rollstudent);
    sup = {
        rollno: req.body.rollsupervisor,
    };
    stu = {
        rollno: req.body.rollstudent,
    };
    User.updateOne({
            "rollno": req.body.rollstudent,
        }, {"$push": {"assign": sup}},
        (err, doc) => {
            if (!err) {
                User.updateOne({
                        "rollno": req.body.rollsupervisor,
                    }, {"$push": {"assign": stu}},
                    (err, doc) => {
                        if (!err) {
                            res.send(doc);
                        }
                        else {
                            res.send("error");
                        }
                    }
                );
            }
            else {
                            res.send("error");
            }
        }
    );
};