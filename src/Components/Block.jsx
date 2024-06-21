import React, { useContext, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from "moment";
import axios from 'axios';
import { userContext } from '../Context/UserContext';
import toast from "react-hot-toast"
import { apiConnector } from '../Helpers/axiosInstance';
import {io} from "socket.io-client"

function Block({data}) {
  console.log("data .........",data)
  console.log("data .........",data?.status)
  // const socket=useMemo(()=>io("http://localhost:5002"),[]);
  const socket=useMemo(()=>io("https://zwigato-backend-dm7f.onrender.com"),[]);
    // const [tempStatus,setTempStatus]=useState(data.status);
    const tempStatus=data.status;
    const {getOrderItems,user,order,setOrder,token}=useContext(userContext);
  async  function fun(e,itemId="38409493"){
    console.log(e.target.value);
        if(e.target.value!=data?.status){
            // const response= await axios.put(`https://zwigato-backend-dm7f.onrender.com/updateOrderStatus`,{status:e.target.value,id:data._id},{withCredentials:true});
            const BASE_URL="https://zwigato-backend-dm7f.onrender.com/updateOrderStatus";
            // const BASE_URL="http://localhost:5002/updateOrderStatus";
            const response= await apiConnector("Put",BASE_URL,{status:e.target.value,id:data._id},{
               Authorization: `Bearer ${token}`,
            });
              
            if(response?.data?.success){
                toast.success("status updated")
                console.log("updated status ..",response.data);
               await getOrderItems(setOrder,user,token);
            console.log("user.........",order);
             socket.emit("updated",{id:itemId,status:e.target.value})
            }
        }
        // setTempStatus(e.target.value)
     }
  return (
    <div key={data.id} className='   flex items-center border-b-2 border-gray-500 justify-between m-5 py-3 px-4 '>
    <div className=' flex flex-col justify-center sm:w-[40%]   '>
    < Link  to={`/order/detail/${data._id}` } className='cursor-pointer mb-4 text-green-300  hover:text-green-400'>   {data._id} </Link>
        {/* <div>{data?.customerId?.fullname}</div> */}
        {
            data?.items?.map((dat)=>(
                <div className='flex '>
                <div className='w-[60%]'>{dat.name} -</div>
                <div className='w-[40%]'>{dat.quantity}pcs</div>
                
                </div>
            ))
        }
      </div>
      <div className='sm:w-[20%] text-center  hidden sm:block'>{data?.customerId?.fullname || data?.name} </div>
      <div className='sm:w-[20%] text-center  bg-transparent hidden break-words md:block '>
        <select onChange={(e)=>fun(e,data._id)} className='text-black p-2 border-2 rounded-lg'  name="status"  id="status">
           { (data?.status==="placed" || data?.status==="order_placed") ? (<option  selected  value="placed">placed</option>):(<option  value="placed">placed</option>)}
           { data?.status==="prepared" ? (<option selected  value="prepared">prepared</option>):(<option  value="prepared">prepared</option>)}
           { data?.status==="delivered" ?(<option  selected   value="delivered">delivered</option>):(<option  value="delivered">delivered</option>)}
           {/* { data?.status==="completed" ?(<option  selected value="completed">completed</option>):(<option  value="completed">completed</option>) } */}
           <option  value="completed">completed</option>
        </select>
      </div>
      <div className=' sm:w-[20%] text-center flex justify-center items-center'> 
      {

    moment(data.updatedAt).format("hh:mm a")

}
      </div>
    </div>
  )
}

export default Block
