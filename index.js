const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Note = require('./src/models/Note');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json()); 


mongoose.connect('mongodb+srv://notesadmin:notes@notesdb.ugtwmuv.mongodb.net/?retryWrites=true&w=majority')
.then(function(){
    app.get("/" , function(req , res){
        res.send("New")
    })
    
    app.post("/notes/list" , async function(req , res){
        var notes = await Note.find({userid : req.body.userid});
        res.json(notes);
    })

    app.post("/notes/add", async function(req, res) {
        await Note.deleteOne({id : req.body.id})
        var newnote = new Note({
            id: req.body.id,
            userid: req.body.userid,
            title: req.body.title,
            content: req.body.content
        });
        await newnote.save();
        res.json(req.body);
    });

    app.delete("/notes/delete", async function(req, res) {
        await Note.deleteOne({id : req.body.id})
        res.json(req.body);
    });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT,function(){
    console.log("Server is Runnig");
})