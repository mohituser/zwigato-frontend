import { userContext } from '../Context/UserContext'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import {io} from "socket.io-client"

import React, { useContext, useEffect, useMemo, useState } from 'react'
import Block from './Block';

function AdminOrder() {
    const {order}=useContext(userContext);
    const [newOrder ,SetNewOrder]=useState([...order]);
    const socket=useMemo(()=>io("https://zwigato-backend-dm7f.onrender.com"),[]);
    // const socket=useMemo(()=>io("http://localhost:5002"),[]);
socket.on("newOrder",(s)=>{
  console.log(s);
  console.log("admin order.........");
// let id=s.itemId,status=s.status;
let tempOrder=[s,...newOrder];
SetNewOrder(tempOrder);


});
useEffect(()=>{
  console.log("setting order at admin..",order);
SetNewOrder([...order]);
},[order])
  
  return (
    <div className='bg-slate-700 py-10 min-h-[100vh]  md:min-h-[calc(100vh-20vh)]'>  
    <div className='  lg:w-[90%] h-auto min-h-[70vh] m-auto text-white'>
      <div className=' text-3xl items-center  mx-5 pt-5 text-center underline'> All Orders</div>

      <div className='flex text-2xl  mt-10 items-center justify-between m-5 px-4 border-b-2 border-gray-400'>
        <div className='flex items-center sm:w-[40%]'>
            <div>Orders of customer</div>
        </div>
        <div className='sm:w-[20%] hidden text-center sm:block'> Customer</div>
        <div className='sm:w-[20%] hidden text-center md:block'> Status</div>
        <h1 className=' sm:w-[20%] flex text-center justify-center items-center'>  Time</h1>
      </div>
      {
        newOrder?.map((data,i)=>(

//           <div key={data.id} className='   flex items-center border-b-2 border-gray-500 justify-between m-5 py-3 px-4 '>
//         <div className=' flex flex-col justify-center sm:w-[40%]   '>
//         < Link  to={`/order/detail/${data._id}` } className='cursor-pointer mb-4 text-green-300  hover:text-green-400'>   {data._id} </Link>
//             {/* <div>{data?.customerId?.fullname}</div> */}
//             {
//                 data?.items?.map((dat)=>(
//                     <div className='flex '>
//                     <div className='w-[60%]'>{dat.name} -</div>
//                     <div className='w-[40%]'>{dat.quantity}pcs</div>
                    
//                     </div>
//                 ))
//             }
//           </div>
//           <div className='sm:w-[20%] text-center  hidden sm:block'>{data.customerId.fullname} </div>
//           <label for="status" className='sm:w-[20%] text-center  bg-transparent hidden break-words md:block '>
//             <select onChange={(e)=>fun(e)} className='text-black p-2 border-2 rounded-lg' value={status} name="status"  id="status">
//                 <option  value="placed">placed</option>
//                 <option  value="completed">completed</option>
//                 <option  value="completed">completed</option>
//             </select>
//           </label>
//           <div className=' sm:w-[20%] text-center flex justify-center items-center'> 
//           {

//         moment(data.updatedAt).format("hh:mm a")

// }
//           </div>
//         </div>
<Block key={i} data={data}/>
        ))
      }
     
    </div>
</div>
  )
}

export default AdminOrder