var Tweet = require("../../models/tweet");
var User = require("../../models/user");
var List = require("../../models/list");
const mongoose = require("../../../sql/mongoose")
var express = require('express');
var router = express.Router();



router.get("/fetchlisttweets", function (req, res) {
    console.log("Inside fetch List Tweets");
    var email = req.query.email
    var list_id = req.query.list_id
    
    console.log(email)
    console.log(list_id)
    

    User.findOne({ email: email  }).then((doc) => {

        List.findOne({_id : list_id }).then((doc) => {
            console.log("Document of list ");
            console.log(doc);
            Tweet.find({ owner: { $in: doc.members } })
                .populate('owner')
                .populate('retweetdata')
                .populate({
                    path: 'retweetdata',
                    populate: {
                        path: 'owner'
                    }
                })
                // .populate('first_name')
                .exec()
                .then((result1) => {
                    console.log("Tweet res " + result1)
                    res.writeHead(200, {
                        "Content-Type": "text/plain"
                    });
                    res.end(JSON.stringify(result1));
    
                }).catch((err) => {
                    console.log("Inside tweet find error " + err)
                    console.log(err)
                })
    
        }).catch((err) => {
            console.log("get fetchtweets Error! " + err)
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            //console.log(JSON.stringify(resultObject))
            res.end("get fetchtweets fail");
        })            
        })
        // console.log(doc + " Name" + doc.first_name + "fetchtweets success!" + doc.following[0])
       
});

// router.get("/fetchtweets", function (req, res) {
//     console.log("Inside fetchtweets profile");
//     var email = req.query.email
//     console.log(email)


//     Tweet.find({ text: email }).then((result1) => {
//         console.log("Tweet res " + result1)
//         res.writeHead(200, {
//             "Content-Type": "text/plain"
//         });
//         res.end(JSON.stringify(result1));
//     }).catch((err) => {
//         console.log(err)
//         res.writeHead(400, {
//             "Content-Type": "text/plain"
//         });
//         //console.log(JSON.stringify(resultObject))
//         res.end("get fetchtweets fail");
//     })
// })

module.exports = router