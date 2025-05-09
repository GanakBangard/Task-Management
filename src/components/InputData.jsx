import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ImCross } from "react-icons/im";

const InputData = ({ InputDiv, setInputDiv, setTasks, updatedData, setupdatedData }) => {
  const [Data, setData] = useState({ title: "", desc: "" });
  const headers = {
    id: localStorage.getItem("id") || "", // Ensure the ID is not null
    authorization: `Bearer ${localStorage.getItem("token") || ""}`, // Ensure the token is not null
  };

  // Check if updatedData is available and has a valid ID
  const isUpdating = updatedData && updatedData.id !== "";

  useEffect(() => {
    if (isUpdating) {
      setData({ title: updatedData.title, desc: updatedData.desc });
    }
  }, [updatedData]);

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const createtask = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:1000/api/v2/create-task", Data, { headers });
      const res = await axios.get("http://localhost:1000/api/v2/get-all-tasks", { headers });
      const sortedTasks = res.data.data.tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTasks(sortedTasks);

      setData({ title: "", desc: "" });
      setInputDiv("hidden");
    } catch (err) {
      console.error("Error creating task:", err.response || err);
      alert("Task creation failed");
    }
  };

  const UpdateTask = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required");
      return;
    }

    try {
      await axios.put(`http://localhost:1000/api/v2/update-task/${updatedData.id}`, Data, { headers });
      const res = await axios.get("http://localhost:1000/api/v2/get-all-tasks", { headers }); // Change put to get for fetching tasks
      const sortedTasks = res.data.data.tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTasks(sortedTasks);

      setupdatedData({ id: "", title: "", desc: "" }); // Reset updated data
      setData({ title: "", desc: "" });
      setInputDiv("hidden");
    } catch (err) {
      console.error("Error updating task:", err.response || err);
      alert("Task update failed");
    }
  };

  return (
    <>
      <div className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-50 h-screen w-full`}></div>
      <div className={`${InputDiv} top-0 left-0 flex justify-center items-center h-screen w-full`}>
        <div className='bg-gray-900 rounded w-2/6 p-4 flex flex-col gap-4'>
          <button
            className='flex justify-end text-xl'
            onClick={() => {
              setInputDiv("hidden");
              setData({ title: "", desc: "" });
              setupdatedData({ id: "", title: "", desc: "" });
            }}
          >
            <ImCross />
          </button>
          <input
            type="text"
            name='title'
            placeholder='Title'
            className='p-2 rounded w-full bg-gray-700'
            value={Data.title}
            onChange={change}
          />
          <textarea
            name="desc"
            cols={30}
            rows={10}
            placeholder='Description...'
            className='p-2 rounded w-full bg-gray-700'
            value={Data.desc}
            onChange={change}
          ></textarea>
          {isUpdating ? (
            <button className='bg-blue-500 text-xl text-black p-2 font-semibold' onClick={UpdateTask}>
              Update Task
            </button>
          ) : (
            <button className='bg-blue-500 text-xl text-black p-2 font-semibold' onClick={createtask}>
              Create Task
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
