const express = require("express");
const app = express();
require("dotenv").config();
require("./connection/connection")
const cors = require("cors");
const UserAPI = require("./routes/user");
const TaskAPI = require("./routes/task");
app.use(cors());
app.use(express.json());    
app.use("/api/v1", UserAPI);
app.use("/api/v2", TaskAPI);

app.use("/",(req,res)=>{
    res.send("Hello from the backend side!!!")
});

const PORT = 1000;

app.listen(PORT, ()=>{
    console.log("Server has started")
});