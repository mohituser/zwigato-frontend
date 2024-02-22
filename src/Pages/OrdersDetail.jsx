import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import { userContext } from '../Context/UserContext';
import { apiConnector } from '../Helpers/axiosInstance';
import Navbar from '../Components/Navbar';
import { AiOutlineFileDone } from "react-icons/ai";
import { LuClipboardCheck } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { IoMdDoneAll } from "react-icons/io";
import { GiCampCookingPot } from "react-icons/gi";
import { FaTruck } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import {io} from "socket.io-client"
import moment from "moment";

function OrdersDetail() {
    const { orderId } = useParams();
    const {user,token}=useContext(userContext);
    const [loading ,setLoading]=useState(false);
    const [data,setData]=useState(null);
    const [currStatus ,setCurrStatus]=useState(1);
    const navigate=useNavigate();
    // const socket=useMemo(()=>io("http://localhost:5002"),[]);
    const socket=useMemo(()=>io("https://zwigato-backend-dm7f.onrender.com"),[]);
    socket.on("message",(s)=>{
      console.log(s);
    // let id=s.itemId,status=s.status;
    if(s.id==orderId){
      if(s.status=="placed"){setCurrStatus(1);}
      if(s.status=="prepared"){setCurrStatus(2);}
      if(s.status=="delivered"){setCurrStatus(3);}
      if(s.status=="completed"){setCurrStatus(4);}
    }
    // console.log(tempOrder);/
    // SetNewOrder(tempOrder);
    });



    const track=[
      {
        id:1,
        logo:<LuClipboardCheck size={"50px"}/>,
        title:"Order Placed",
    },
   
  {
    id:2,
    logo:<GiCampCookingPot size={"50px"}/>,
    title:"Preparing",
},
{
  id:3,
  logo:<FaTruck size={"50px"}/>,
  title:"Out for delivery",
}
,
{
  id:4,
  logo:<MdEmojiEmotions size={"50px"}/>,
  title:"Completed",
}
  ]
   async function fun(){
      const BASE_URL=`https://zwigato-backend-dm7f.onrender.com/orderDetail/${orderId}`;
      // const BASE_URL=`http://localhost:5002/orderDetail/${orderId}`;

      const response=await apiConnector("GET",BASE_URL,null,{
          Authorization: `Bearer ${token}`,
      });
      console.log(response?.data?.data);

      setData(response?.data?.data);
      let temp=response?.data?.data;
      if(temp.status=="placed"){setCurrStatus(1);}
      if(temp.status=="prepared"){setCurrStatus(2);}
      if(temp.status=="delivered"){setCurrStatus(3);}
      if(temp.status=="completed"){setCurrStatus(4);}
    
    }
    useEffect(()=>{
      if(orderId){
     fun();}
     else{
      navigate(-1);
     }
    },[])
  return (
    <div className='bg-slate-400 m-0 h-[100vh]'>
    <Navbar/>
    <div className='h-[90%] flex justify-center items-center'>
      <div className=' w-[80%] lg:w-[60%] '> 
           <div className='flex justify-between'> 
          <div className='text-2xl font-bold mb-6 '>Track Delivery Status</div>
           <div className=' text-green-800 w-[40%] text-center'>{orderId}</div>
          </div>
        <div className='flex flex-col font-bold'>
        { track.map((item)=>( 
          <div className='flex justify-between  items-start'>
        <div className={`flex ${currStatus>item.id?("text-gray-600"):""}  ${currStatus==item.id?"text-green-800":""} items-start gap-x-3 `}>
            {/* <AiOutlineFileDone size={"50px"}/> */}
            {item.logo}
            <div className={`flex flex-col mt-3 gap-3`}>
            < GoDotFill/>
           { item.id < 4 && <div className={`h-[50px] border-l-2 m-auto border-black`}></div>}
            </div>
            <div className='mt-1' >{item.title}</div>
          </div>
          <div className='text-gray-600 w-[40%] text-center'> 
      {
        currStatus==item.id+1  &&

   ( moment(data?.updatedAt).format("hh:mm a"))

}
      </div>
          </div> ))}

        </div>

      
      </div>
    </div>
    </div>
  )
}

export default OrdersDetail