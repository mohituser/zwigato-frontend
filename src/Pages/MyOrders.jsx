import React, { useContext, useEffect } from 'react'
import { userContext } from '../Context/UserContext'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import moment from "moment";
import UserOrder from '../Components/UserOrder';
import AdminOrder from '../Components/AdminOrder';
import toast from 'react-hot-toast';
function MyOrders() {
    const {getOrderItems,user,order,setOrder,token}=useContext(userContext);
    const navigate=useNavigate();
    useEffect(()=>{
        
        if(!user){navigate("/login");}
        else{
          async function fun(){
          toast.loading("please wait...")
            await getOrderItems(setOrder,user,token);
            toast.dismiss();
        }
        fun();
            console.log("user.........",order);}
    },[])
  return (  <>
    <Navbar/>
    { user?.role=="admin"?(<AdminOrder/>):( <UserOrder/>)}
    </>     
  )
}

export default MyOrders