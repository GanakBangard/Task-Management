import React, { useState,useEffect } from 'react';
import { CiHeart } from 'react-icons/ci';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { IoAddCircleOutline } from 'react-icons/io5';
import { FaHeart } from "react-icons/fa";
import axios from 'axios';

const Cards = ({ home, setInputDiv, data,setupdatedData }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      setTasks(data);
    }, [data]); // whenever `data` prop changes, update local state
     // local copy to allow UI updates

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleCompleteTask = async (id) => {
    // Optimistically update the UI
    const updatedTasks = tasks.map((task) =>
      task._id === id ? { ...task, complete: !task.complete } : task
    );
    setTasks(updatedTasks);

    // Call API in background
    try {
      await axios.put(
        `http://localhost:1000/api/v2/update-complete-task/${id}`,
        {},
        { headers }
      );
    } catch (error) {
      console.error("Update failed:", error);

      // OPTIONAL: Rollback the UI if the API call fails
      setTasks(data);  // fallback to original props
    }
  };
  const handleImportantTask = async (id) => {
    // Optimistically update the UI
    const updatedTasks = tasks.map((task) =>
      task._id === id ? { ...task, important: !task.important } : task
    );
    setTasks(updatedTasks);

    // Call API in background
    try {
      await axios.put(
        `http://localhost:1000/api/v2/update-imp-task/${id}`,
        {},
        { headers }
      );
    } catch (error) {
      console.error("Update failed:", error);

      // OPTIONAL: Rollback the UI if the API call fails
      setTasks(data);  // fallback to original props
    }
  };

  const updateTask = (id,title,desc) => {
    setInputDiv("fixed");
    setupdatedData({id:id,title:title,desc:desc}); 
  };
  

  const deleteTask = async (id) => {
    // Optimistically remove the task from UI
    const updatedTasks = tasks.filter((task) => task._id !== id);
    setTasks(updatedTasks);
  
    try {
      await axios.delete(`http://localhost:1000/api/v2/delete-task/${id}`, {
        headers, 
      });
    } catch (error) {
      console.error("Delete failed:", error);
  
      // OPTIONAL: Rollback to original tasks
      setTasks(data);
    }
  };
   

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {tasks &&
        tasks.map((item, i) => (
          <div key={i} className="bg-gray-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-400 my-2">{item.desc}</p>
            </div>

            <div className="mt-4 w-full flex flex-row gap-4 justify-between">
              <button
                className={`${
                  item.complete ? 'bg-green-500' : 'bg-red-500'
                } p-2 rounded w-3/6`}
                onClick={() => handleCompleteTask(item._id)}
              >
                {item.complete ? 'Completed' : 'Incomplete'}
              </button>

              <div className="flex flex-row justify-around w-3/6 text-2xl text-white">
                <button onClick={()=>handleImportantTask(item._id)}>{item.important === false ? <CiHeart /> : <FaHeart />}</button>
                {home !== "false" && <button onClick={()=>updateTask(item._id,item.title,item.desc)}><FaRegEdit /></button>}
                <button onClick={()=>deleteTask(item._id)}><MdDeleteOutline /></button>
              </div>
            </div>
          </div>
        ))}

      {home === 'true' && (
        <button
          className="flex flex-col items-center justify-center bg-gray-800 rounded-xl p-4 hover:scale-105 hover:cursor-pointer transition-all duration-200"
          onClick={() => setInputDiv('fixed')}
        >
          <IoAddCircleOutline className="text-5xl" />
          <h2 className="text-2xl mt-4">Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
