const express = require("express");
const { getNote, createNote, updateNote, deleteNote } = require("../contollers/noteController");
const { updateMany } = require("../models/user");
const noteRouter = express.Router();
 
noteRouter.get("/", getNote);

noteRouter.post("/", createNote);
noteRouter.put("/:id", updateNote);
noteRouter.delete("/:id", deleteNote);

module.exports = noteRouter;