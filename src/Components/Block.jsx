import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from "moment";
import axios from 'axios';
import { userContext } from '../Context/UserContext';
import toast from "react-hot-toast"

function Block({data}) {
    const [tempStatus,setTempStatus]=useState(data.status);
    const {getOrderItems,user,order,setOrder}=useContext(userContext);
  async  function fun(e){
    console.log(e.target.value);
        if(e.target.value!=tempStatus){
            const response= await axios.put(`http://localhost:5002/updateOrderStatus`,{status:e.target.value,id:data._id},{withCredentials:true});
              
            if(response.data.success){
                toast.success("status updated")
                console.log("updated status ..",response.data);
               await getOrderItems(setOrder,user);
            console.log("user.........",order);
            }
        }
        setTempStatus(e.target.value)
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
      <div className='sm:w-[20%] text-center  hidden sm:block'>{data?.customerId?.fullname} </div>
      <div className='sm:w-[20%] text-center  bg-transparent hidden break-words md:block '>
        <select onChange={(e)=>fun(e)} className='text-black p-2 border-2 rounded-lg'  name="status"  id="status">
           { tempStatus=="placed" ? (<option  selected  value="placed">placed</option>):(<option  value="placed">placed</option>)}
           { tempStatus=="prepared" ? (<option selected  value="prepared">prepared</option>):(<option  value="prepared">prepared</option>)}
           { tempStatus=="delivered" ?(<option  selected   value="delivered">delivered</option>):(<option  value="delivered">delivered</option>)}
           { tempStatus=="completed" ?(<option  selected value="completed">completed</option>):(<option  value="completed">completed</option>) }
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