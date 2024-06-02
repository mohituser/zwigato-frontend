import { userContext } from '../Context/UserContext'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import moment from "moment";
import React, { useContext, useEffect, useMemo, useState } from 'react'
import {io} from "socket.io-client"

function UserOrder() {
    const {order}=useContext(userContext);
    const [newOrder ,SetNewOrder]=useState([...order]);
    
// const socket=useMemo(()=>io("http://localhost:5002"),[]);
const socket=useMemo(()=>io("https://zwigato-backend-dm7f.onrender.com"),[]);
socket.on("message",(s)=>{
  console.log(s);
// let id=s.itemId,status=s.status;
let tempOrder=newOrder?.map((data)=>{
  console.log("mohit............",data._id," ",s.id);
  if(data._id==s.id){
    let tempdata={...data};
    tempdata.status=s.status;

    return tempdata;
  }
  else return data;
})
console.log(tempOrder);
SetNewOrder(tempOrder);
});
useEffect(()=>{
SetNewOrder(order);
},[order])

  return (
    <div className='bg-slate-700 py-10  min-h-[100vh]  md:h-[calc(100vh-20vh)]'>  
    <div className='  lg:w-[80%] h-auto min-h-[70vh] m-auto text-white'>
      <div className='text-3xl text-center  mx-5 pt-5  underline'> All Orders</div>

      <div className='flex  text-2xl mt-10 items-center justify-between m-5 px-4 border-b-2 border-gray-400'>
        <div className='flex  items-center sm:w-[40%]'>
            <div>Orders</div>
        </div>
        <div className='sm:w-[20%] hidden sm:block text-center'> Phone</div>
        <div className='sm:w-[20%] hidden md:block text-center'> status</div>
        <h1 className=' sm:w-[20%] text-center'>  Time</h1>
      </div>
      {
        newOrder?.map((data)=>(

          <div key={data.id} className='   flex items-center border-b-2  justify-between m-5 px-4 '>
        <div className=' flex flex-col justify-center sm:w-[40%]   '>
        < Link  to={`/order/detail/${data._id}` } className={`cursor-pointer mb-4 text-green-300 ${data.status=="completed" ?("line-through"):("")}  hover:text-green-400`}>   {data._id} </Link>
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
          <div className='sm:w-[20%] text-center  hidden sm:block'>{data.phone} </div>
          <div className='sm:w-[20%] text-center hidden md:block'>{data.status} </div>
          <div className=' sm:w-[20%] text-center'> 
          {

        moment(data.updatedAt).format("hh:mm a")

}
          </div>
        </div>
        ))
      }
     
    </div>
</div>
  )
}

export default UserOrder