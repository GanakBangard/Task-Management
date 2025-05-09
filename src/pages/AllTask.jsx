import React, { useState, useEffect } from 'react';
import Cards from '../components/Home/Cards';
import { IoAddCircleOutline } from 'react-icons/io5';
import InputData from '../components/InputData';
import axios from 'axios';

const AllTask = () => {
  const [inputDiv, setInputDiv] = useState("hidden");
  const [tasks, setTasks] = useState([]);
  const [updatedData, setupdatedData] = useState({id:"",title:"",desc:""});
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks", { headers });
        const sortedTasks = response.data.data.tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTasks(sortedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      fetchTasks();
    }
    
  }, []);
  

  return (
    <>
      <div>
        <div className="flex justify-end w-full px-4 py-2">
          <button onClick={() => setInputDiv("fixed")}>
            <IoAddCircleOutline className="text-5xl text-gray-300 hover:text-gray-100 transition-all duration-300" />
          </button>
        </div>

        {tasks && <Cards home="true" setInputDiv={setInputDiv} data={tasks} setupdatedData={setupdatedData}/>}
      </div>

      <InputData InputDiv={inputDiv} setInputDiv={setInputDiv} setTasks={setTasks} updatedData={updatedData} setupdatedData={setupdatedData} />
    </>
  );
};

export default AllTask;
