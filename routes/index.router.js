const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlResult = require('../controllers/results.controller');
const ctrlRequest = require('../controllers/request.controller');
const ctrlstud = require('../controllers/student.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/sturegister', ctrlUser.sturegister);
router.post('/supregister', ctrlUser.supregister);

router.post('/authenticate', ctrlUser.authenticate);
router.post('/updatepassword', ctrlUser.updatepassword);
router.post('/sub', ctrlUser.sub);
router.post('/putnoti', ctrlUser.putnoti);
router.post('/putmessage', ctrlUser.putmessage);
router.post('/postresults', ctrlResult.postresults);
router.post('/postrequest', ctrlRequest.postrequest);
router.post('/assign', ctrlRequest.assign);

router.get('/getresults/:rollno/:year', ctrlResult.getresults);
router.get('/getrequest', ctrlRequest.getrequest);
router.get('/userprofile', jwtHelper.verifyJwtToken, ctrlUser.userprofile);
router.get('/send', ctrlUser.send);
router.get('/verify', ctrlUser.verify);
router.get('/getnoti', ctrlUser.getnoti);
router.get('/getmessage/:rollno', ctrlUser.getmessage);
router.get('/userdet', ctrlUser.userdet);
router.get('/deluser', ctrlUser.deluser);



module.exports = router;