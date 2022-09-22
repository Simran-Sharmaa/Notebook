const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1:Get all the notes using GET 'api/notes/fetchallnotes'
router.get("/fetchallnotes", fetchUser, async (req, res) => {
    try {
        const note = await Notes.find({ user: req.user.id });
        res.json(note);
    } catch (error) {
        console.log("occured in 1");
        console.log(error.message);
        res.status(500).send({ error: "Some error occured" });
    }
});
// ROUTE 2:add the new note using post 'api/notes/addnote'
router.post(
    "/addnote",
    fetchUser,
    [
        body("title", "Enter the title name").isLength({ min: 3 }),
        body("description", "Description must be of 5 characters").isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { title, description, tag } = req.body;
            const note = new Notes({
                title,
                description,
                tag,
                user: req.user.id,
            });
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.log("occured in 2");

            console.log(error.message);
            res.status(500).send({ error: "Some error occured" });
        }
    }
);
// ROUTE 3:Update the  note using put 'api/notes/updatenote'
router.put("/updatenote/:id", fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Create a new note object
        const newNote={};
        if(title) {newNote.title=title};
        if(description) {newNote.description=description};
        if(tag) {newNote.tag=tag};

        // Find the note to be updated and update it
        let note=await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}
        
        if(note.user.toString()!==req.user.id){
          return  res.status(401).send("Not Allowed")
        }

        note =await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Some error occured" });
    }
});
// ROUTE 4:Delete the  note using delete 'api/notes/deletenote'
router.delete("/deletenote/:id",fetchUser,async (req, res) => {
    try {
      
        // Find the note to be updated and update it
        let note=await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}
        
        // Allow deletion only if user owns this Note
        if(note.user.toString()!==req.user.id){
          return  res.status(401).send("Not Allowed")
        }

        note =await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success ":"Note has been deleted",note})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Some error occured" });
    }

    });
module.exports = router;
