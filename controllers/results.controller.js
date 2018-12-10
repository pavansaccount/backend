const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const request = require('request');
var http = require("http");
const express = require('express');
const Results = mongoose.model('Results');

module.exports.getresults = (req, res, next) => {
    Results.findOne( { rollno: req.params.rollno} , {year: {$elemMatch: {year: req.params.year}}} ,
        (err, Results) => {
            if (!Results)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else {
                 return res.json(Results);
            }
        }
    );
};
module.exports.postresults = (req, res, next) => {
    console.log(req.body.rollno );
    Results.findOne( { rollno: req.body.rollno },
        (err, doc) => {
            if (!doc){

                var results = new Results();
                results.rollno = req.body.rollno;
                results.year = [{ year: req.body.year,
                                  subject: [{subname: req.body.subname,
                                             submarks: req.body.submarks }] }];
                results.save((err, doc) => {
                    if (!err)
                        res.send(doc);
                    else {
                    }

                });


            }

            else {
                Results.findOne( { rollno: req.body.rollno , 'year.year': req.body.year },
                    (err, doc) => {
                        if (!doc) {
                            console.log('hi');
                            year = {
                                year: req.body.year,
                            };
                            Results.update({
                                    "rollno": req.body.rollno,
                                }, { "$push": {"year": year} }, {multi: true},
                                (err, doc) => {
                                    if (!err) {
                                        console.log('hi2');
                                        newdata = {
                                            subname: req.body.subname,
                                            submarks: req.body.submarks
                                        };
                                        Results.update({
                                                "rollno": req.body.rollno,
                                                "year.year": req.body.year
                                            }, {"$push": {"year.$.subject": newdata}}, {multi: true},
                                            (err, doc) => {
                                                if (!err) {
                                                    res.send(doc);
                                                }
                                                else {
                                                }
                                            }
                                        );
                                    }
                                    else {
                                        console.log('hi4');
                                    }
                                }
                            );
                        }
                        else {
                            console.log('hi3');
                            newdata = {
                                subname: req.body.subname,
                                submarks: req.body.submarks
                            };
                            Results.update({
                                    "rollno": req.body.rollno,
                                    "year.year": req.body.year
                                }, {"$push": {"year.$.subject": newdata}}, {multi: true},
                                (err, doc) => {
                                    if (!err) {
                                        res.send(doc);
                                    }
                                    else {
                                    }
                                }
                            );
                        }
                    });
            }
        }
    );


};
