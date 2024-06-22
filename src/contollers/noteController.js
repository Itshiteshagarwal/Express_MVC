const noteModel = require("../models/note");

const createNote = async(req,res)=>{
    const {title, description} = req.body;

    const newnote = new noteModel({
        title:title,
        description:description,
        userId:req.userId
    });
    try {
        
        await newnote.save();
        res.status(201).json(newnote);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wromg"});
    }
}

const updateNote = async(req,res)=>{
    const id = req.params.id;
    const {title, description} = req.body;

    const newnote = ({
        title:title,
        description:description,
        userId:req.userId
    });

    try {
        await noteModel.findByIdAndUpdate(id, newnote, {new:true});
        res.status(200).json(newnote)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wromg"});
    }

}

const deleteNote = async(req,res)=>{
    const id = req.params.id;
    try {
        const note = await noteModel.findByIdAndDelete(id);
        res.status(202).json(note)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wromg"});
    }
}

const getNote = async(req,res)=>{
    try {
        const notes = await noteModel.find({userId:req.userId});
        res.status(200).json(notes)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wromg"});
    }
}
module.exports= {
    createNote,updateNote,deleteNote,getNote
}