import React, { useContext, useEffect } from 'react'
import { userContext } from '../Context/UserContext'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import moment from "moment";
import UserOrder from '../Components/UserOrder';
import AdminOrder from '../Components/AdminOrder';
function MyOrders() {
    const {getOrderItems,user,order,setOrder}=useContext(userContext);
    const navigate=useNavigate();
    useEffect(()=>{
        
        if(!user){navigate("/login");}
        else{
            getOrderItems(setOrder,user);
            console.log("user.........",order);}
    },[])
  return (  <>
    <Navbar/>
    { user?.role=="admin"?(<AdminOrder/>):( <UserOrder/>)}
    </>



      
  )
}

export default MyOrders