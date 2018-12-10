const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
var nodemailer = require("nodemailer");
const request = require('request');
var http = require("http");
const express = require('express');
const User = mongoose.model('User');
var ObjectId = require('mongoose').Types.ObjectId;
var { notification } = require('../models/notification.model.js');
var { message } = require('../models/message.model.js');
const bcrypt = require('bcryptjs');

module.exports.register = (req, res, next) => {
    console.log(req.body.rollno);
    var user = new User();
    user.rollno = req.body.rollno;
    user.email = req.body.email;
    user.role = 'student';
    user.password = req.body.password;
    user.save((err, doc) => {
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


module.exports.putnoti = (req, res, next) => {
    var noti = new notification();
    noti.head = req.body.head;
    noti.body = req.body.body;
    noti.save((err, doc) => {
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
module.exports.putmessage = (req, res, next) => {
    var mess = new message();
    mess.rollno = req.body.rollno;
    mess.message = req.body.message;
    mess.save((err, doc) => {
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

module.exports.sturegister = (req, res, next) => {
    var user = new User();
    user.rollno = req.body.rollno;
    user.email = req.body.email;
    user.role = 'student';
    user.password = req.body.password;
    user.save((err, doc) => {
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
module.exports.supregister = (req, res, next) => {
    var user = new User();
    user.rollno = req.body.rollno;
    user.email = req.body.email;
    user.role = 'supervisor';
    user.password = req.body.password;
    user.save((err, doc) => {
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

module.exports.getnoti = (req, res) => {
    notification.find((err, docs) => {
        if (!err) { res.send(docs); } else { console.log('Error in Retriving Student :' + JSON.stringify(err, undefined, 2)); }
    });
};
module.exports.getmessage = (req, res) => {
    message.find({rollno: req.params.rollno},(err, docs) => {
        if (!err) { res.send(docs); } else { console.log('Error in Retriving Student :' + JSON.stringify(err, undefined, 2)); }
    });
};

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
};

module.exports.userprofile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['rollno', 'email', 'role', 'assign']) });
        }
    );
};

module.exports.updatepassword = (req, res, next) => {
console.log(req.body.email);
    console.log(req.body.password);
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            var emp = {
                password: hash,
                saltSecret: salt
            };
            User.findOneAndUpdate({email: req.body.email}, { $set: emp }, { new: true }, (err, doc) => {
                if (!err) { res.send(doc); } else { console.log('Error in password Update :' + JSON.stringify(err, undefined, 2)); }
            });
        });
    });

};

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "pavankalyan4241@gmail.com",
        pass: "pavan.kalyan"
    }
});
var rand, mailOptions, host, link;

module.exports.send = (req, res, next) => {
    rand = Math.floor((Math.random() * 100) + 54);
    host = req.get('host');
    email = req.query.to;
    link = "http://" + req.get('host') + "/api" + "/verify?id=" + rand + "&email=" + req.query.to;
    mailOptions = {
        to: req.query.to,
        subject: "Please confirm your Email account",
        html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    };
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(err, res) {
        if (err) {
            console.log(err);

        } else {
            console.log("Message sent: " + res.message);
            res.end("sent");
        }
    });
};

module.exports.verify = (req, res, next) => {
    rands = Math.floor((Math.random() * 100) + 54);
    console.log(req.protocol + ":/" + req.get('host'));
    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        console.log("Domain is matched. Information is from Authentic email");
        if (req.query.id == rand && req.query.email == email) {
            res.render("update/updatepassword", {
                viewTitle: req.query.email
            });
        } else {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    } else {
        res.end("<h1>Request is from unknown source");
    }
};




// recap
module.exports.sub = (req, res) => {
    var homepage = 'homepage';
    console.log("homepage");
    if (
        req.body.success == false
    ) {
        return res.status(422).send(['false']);
    } else if (
        req.body.score == 0.0
    ) {
        return res.status(422).send(['score is 0.0']);
    } else if (
        req.body.action == homepage
    ) {
        return res.status(422).send(['action not valid']);
    }

    // Secret Key
    const secretKey = '6Lc9jXgUAAAAAB-99dmv4dbGVXcJLeMzBizqZQWB';

    // Verify URL
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    // Make Request To VerifyURL
    request(verifyUrl, (err, response, body) => {
        body = JSON.parse(body);
        console.log(body);

        // If Not Successful
        if (body.success != false && !body.success) {
            return res.status(422).send(['Failed captcha verification']);
        }

        //If Successful
        return res.status(200).send(['captcha verification']);
    });
};


module.exports.userdet = (req, res) => {
    User.find({ role: req.query.super }, (err, docs) => {
        if (!err) { res.send(docs); } else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
    });
};
module.exports.deluser = (req, res) => {
    User.findByIdAndRemove(req.query._id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Student Delete :' + JSON.stringify(err, undefined, 2)); }
    });
};





