// using normal --
// const express = require('express');

// using import ---
import express from "express";
import { kill } from "process";

const app = express();
app.use(express.json());
const port = 3000;  

/*
app.get("/", function(req, res)=>{
    res.send("hello world");
});

// or --
app.get("/", (req, res)=>{
    res.send("hello world");
});
*/

app.listen(port, function(){
    console.log(`app running on port ${port}`);
});


let users = [
    {
        name:"John",
        kidneys:[
            {healthy: false},
            {healthy:true},
        ],
    },
    {
        name:"neel",
        kidneys:[
            {healthy:true},
            {healthy:true},
        ],
    },
    {
        name:"harry",
        kidneys:[
            {healthy:false},
            {healthy:false},
        ],
    },
    {
        name:"ron",
        kidneys:[
            {healthy:true},
        ],
    },
    {
        name:"hermionie",
        kidneys:[

        ]
    },

];

// one --- check total kidneys and no. of healthy
app.get("/", (req, res)=>{

    let result =[];
    for(let i=0; i<users.length; i++){
        const user = users[i];
        const totalkidneys = user.kidneys.length;
        const healthykidneys = user.kidneys.filter(kidney => kidney.healthy).length;
        result.push(`${user.name} has ${totalkidneys} number of kidneys and have ${healthykidneys} of which are healthy.`);
    }
    res.send(result);
});


// two -- add a new kidney
app.post("/addk", (req, res)=>{
    // eg req --
    /*
    {
        "name": "hermionie",
        "kidneys": [
          { "healthy": true },
          { "healthy": false }
        ]
      }
    */

    // can be done one by one not in the loop since we can send req for 1 user
    const username = req.body.name;
    const newKidneys = req.body.kidneys;
    const requestedKidneys = newKidneys.length;
    
    const user = users.find(u=>u.name.toLowerCase()=== username.toLowerCase());
    if(!user){
        return res.status(404).send("User not found");
    }
    const totalkidneys = user.kidneys.length;
    
    if(totalkidneys >=2){
        return res.status(400).send("User already has 2 kidneys");
    }

    if(totalkidneys==1 && requestedKidneys>1){
        return res.status(400).send("User can only add 1 kidney");
    }

    if(totalkidneys==0 && requestedKidneys>2){
        return res.status(400).send("User can add 2 kidneys only");
    }

    user.kidneys.push(...newKidneys);

    res.send({
        message:"Kidney(s) added successfully",
        totalkidneys : user.kidneys.length,
        kidneys: user.kidneys
    });
});


// three PUT - User can replace a kidney, make it healthy
app.put("/replacek", (req, res)=>{

    // eg request --
    /*
    {
        "name": "harry",
        "kidneys": [
          { "healthy": true },
          { "healthy": true }
        ]
      }
    */
    
    // method 1 ---
    /*
    const username = req.body.name;
    const newKidneys = req.body.kidneys;

    const user = users.find(u=>u.name.toLowerCase()===username.toLowerCase());
    if(!user){
        res.status(400).send("user not present");
    }   
    const unhealthyKidneysIndexes = user.kidneys.map((kidney, index) =>({index, healthy:kidney.healthy})).filter(k=>!k.healthy);   

    if(unhealthyKidneysIndexes.length===0){
        return res.status(400).send("All kidneys are healthy");
    }

    if(newKidneys.length > unhealthyKidneysIndexes.length){
        return res.status(400).send("too many replacements");
    }

    for(let i = 0; i<newKidneys.length; i++){
        const replaceIndex = unhealthyKidneysIndexes[i].index;
        user.kidneys[replaceIndex] = newKidneys[i];
    }

    */

    // method 2 ---
    const username = req.body.name;
    const newKidneys = req.body.kidneys;

    const user = users.find(u=>u.name.toLowerCase()===username.toLowerCase());
    if(!user){
        res.status(400).send("user not present");
    }   

    const requestedKidneys = newKidneys.length;
    const unhealthyKidneys = user.kidneys.filter(k=>!k.healthy);
    const unhealthyCount = unhealthyKidneys.length;
    if(unhealthyCount===0){
        return res.status(400).send("All are healthy");
    }

    if(requestedKidneys > unhealthyCount){
        return res.status(400).send("too many replacements");
    }

    let replaced = 0;
    for(let i=0; i<user.kidneys.length; i++){
        if(!user.kidneys[i].healthy && replaced<requestedKidneys){
            user.kidneys[i]= newKidneys[replaced];
            replaced++;
        }
    }

    res.send({
        message: "kidney(s) replaced successfully",
        kidney: user.kidneys
    });

});

// four -- DELETE - User can remove a kidney
app.delete("/delete", (req, res) =>{
    //eg req
    /*
    {
        "user": "john",
        "kidneys": [
          { "healthy": false }
        ]
      }
    */


      
    const username = req.body.user;
    const kidneysToDelete  = req.body.kidneys;

    const user = users.find(u=>u.name.toLowerCase()===username.toLowerCase());
    if(!user){
        res.status(400).send("user is not present");
    }

    const deleteLen = kidneysToDelete.length;
    const kidneyLength = user.kidneys.length;

    if(deleteLen===0){
        res.status(400).send("no kidneys deleted");
    }

    if(deleteLen>kidneyLength){
        res.status(400).send("number of kidneys to be deleted is more than actual");        
    }

    let deleted = 0;
    for(let i=0; i<kidneyLength; i++){
        const target = kidneysToDelete[i];
        const index = user.kidneys.findIndex(k=>k.healthy == target.healthy);

        if(index!==-1){
            // splice(index, 1) → Remove 1 item starting from index
            user.kidneys.splice(index,1);
            deleted++;
        }
    }    
    res.send({
        message: `${deleted} kidney(s) deleted successfully`,
        remainingKidneys: user.kidneys
    });

})