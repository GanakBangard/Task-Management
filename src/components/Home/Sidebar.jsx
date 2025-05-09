import React , {useEffect,useState} from 'react'
import { BsListTask } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';

const Sidebar = () => {
    const data = [
        {
            title:"All tasks",
            icons:<BsListTask />,
            link:"/"
        },
        {
            title:"Important tasks",
            icons:<BsListTask />,
            link:"/ImportantTask"
        },
        {
            title:"Completed tasks",
            icons:<BsListTask />,
            link:"/CompletedTask"
        },
        {
            title:"Incompleted tasks",
            icons:<BsListTask />,
            link:"/IncompleteTask"
        }
    ];

    const [Data, setData] = useState();
    const headers = {id:localStorage.getItem("id"),authorization:`Bearer ${localStorage.getItem("token")}`};
    const dispatch = useDispatch();
    const logout = () =>{
      dispatch(authActions.logout());
      localStorage.clear("id");
      localStorage.clear("token");
    };

    useEffect(() => {
      const fetch = async()=>{
        const response = await axios.get(
          "http://localhost:1000/api/v2/get-all-tasks",
          {
            headers,
          }
        )
        setData(response.data.data);
      };
      if(localStorage.getItem("id") && localStorage.getItem("token")){
        fetch();
      }
    }, []);
  return (
    <>
      {Data && <div >
        <h2 className='text-xl font-semibold'>{Data.username}</h2>
        <h4 className='mb-1 text-gray-400'>{Data.email}</h4>
        <hr />
      </div>}
      <div>
        {data.map((item,i)=>(
            <Link to={item.link} key={i} className='m-2 flex items-center hover:bg-gray-700 p-2 rounded transition-all duration-300 '>{item.icons}&nbsp;{item.title}</Link>
        ))}
      </div>
      <div><button className='bg-gray-600 w-full p-2 rounded-md' onClick={logout}>Log Out</button></div>
    </>
  )
}

export default Sidebar
