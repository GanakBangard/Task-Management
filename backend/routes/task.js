const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const authenticateToken = require("./auth");


//create Task
router.post("/create-task", authenticateToken, async (req, res) => {
    try {
      const { title, desc } = req.body;
      const { id } = req.headers;
  
      const newTask = new Task({ title, desc });
      const saveTask = await newTask.save();
  
      await User.findByIdAndUpdate(id, { $push: { tasks: saveTask._id } });
  
      // Return the newly created task to frontend
      res.status(200).json({ message: "Task Created", task: saveTask });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  

//Get all task
router.get("/get-all-tasks", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate({path: "tasks",options:{sort:{createdAt:-1}}});
        res.status(200).json({data:userData})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//Delete
router.delete("/delete-task/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers.id;

        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });

        res.status(200).json({ message: "Task Deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//Update
router.put("/update-task/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const {title,desc} = req.body;

        await Task.findByIdAndUpdate(id, { title, desc }, { new: true });

        res.status(200).json({ message: "Task Updated" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//update-Imp
router.put("/update-imp-task/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const TaskData = await Task.findById(id);
        const ImpTask = TaskData.important;

        await Task.findByIdAndUpdate(id,{important:!ImpTask});

        res.status(200).json({ message: "Task Updated-Imp" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//update-complete
router.put("/update-complete-task/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const TaskData = await Task.findById(id);
        const CompleteTask = TaskData.complete;

        await Task.findByIdAndUpdate(id,{complete:!CompleteTask});

        res.status(200).json({ message: "Task Updated-Complete" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// get imp task
router.get("/get-imp-tasks", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.headers;
        const Data = await User.findById(id).populate({
            path: "tasks",
            match:{important:true},
            options:{sort:{createdAt:-1}}
        });
        const ImpTaskData = Data.tasks; 
        res.status(200).json({data:ImpTaskData})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//get complete task
router.get("/get-complete-tasks", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.headers;
        const Data = await User.findById(id).populate({
            path: "tasks",
            match:{complete:true},
            options:{sort:{createdAt:-1}}
        });
        const CompleteTaskData = Data.tasks; 
        res.status(200).json({data:CompleteTaskData})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//get incomplete task
router.get("/get-incomplete-tasks", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.headers;
        const Data = await User.findById(id).populate({
            path: "tasks",
            match:{complete:false},
            options:{sort:{createdAt:-1}}
        });
        const InCompleteTaskData = Data.tasks; 
        res.status(200).json({data:InCompleteTaskData})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
module.exports = router;