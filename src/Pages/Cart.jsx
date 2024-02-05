import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';
import { IoCartOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { userContext } from '../Context/UserContext';
import axios from 'axios';
import toast from 'react-hot-toast';

function Cart() {
    const navigate=useNavigate();
    const {user,setUser,cartItem,setCartItem,setTotalItems,totalItems,order,setOrder}=useContext(userContext);
    const [liveLocation,setLiveLocation]=useState("");
    const [phone,setPhone]=useState("");
    const [totalCost,setTotalCost]=useState(0);

    


    function removeCartItem(product){
      let item=[]
  // let x={name:product.name,id:product.id,image:product.image,flag:1,quantity:1};
  let f=0;
   for(let i=0;i<cartItem.length;i++){
    if(cartItem[i].id==product.id){
      if(cartItem[i].quantity>1){
      item.push({name:cartItem[i].name,id:cartItem[i].id,image:cartItem[i].image,flag:1,quantity:cartItem[i].quantity-1});}
    }
      else{
        item.push(cartItem[i]);
       }
   }
  //  if(f==0){item.push(x);}

   setCartItem(item);
   setTotalItems(totalItems-1);
   toast.success("removed from cart")
   
    }

    function Price(){
      let sum=0;
      for(let i=0;i<cartItem.length;i++){
         sum+=(cartItem[i].quantity*120);
      }
      setTotalCost(sum);
    }
    useEffect(()=>{
 Price();
    },[cartItem])



    async function getLocation(e){
      const result=  navigator.geolocation.getCurrentPosition(async(location)=>{
        console.log(location.coords.latitude);
        let res=await fetch(`http://api.weatherapi.com/v1/timezone.json?key=e947862cd49d48ef8bf195850240402&q=${location.coords.latitude},${location.coords.longitude}&aqi=yes`);
        res= await res.json();
        console.log(res?.location?.name);

        setLiveLocation(`${res?.location?.name},${res?.location?.region},${res?.location?.country}`);
      })
    }
     
    async function Order(){
      
      
       if(cartItem.length>0){
        if(liveLocation==""){
          return toast.error("Give Your location")
        }
        if(phone==""){
          return toast.error("Contact number is required")
        }
        if(!user){
          navigate("/login");
          return;
        }
       let items=cartItem.map((data)=>{
        return {id:data.id,name:data.name,quantity:data.quantity}
       })

      try {
        const orderedItem={customerId:user._id,phone,address:liveLocation,quantity:totalItems,items}
        const response=await  axios.post("http://localhost:5002/updateOrderItem",{orderedItem},{withCredentials:true});
        console.log("response",response?.data?.order);
        // setOrder(response?.data?.order);
        // if(response?.data?.success){
          
        // }
        setCartItem([]);
        setTotalCost(0);
        setTotalItems(0);

        navigate("/order")
        
      } catch (error) {
        
      }
    }
    else {navigate("/")}
    }


function fun2(e){
  setLiveLocation(e.target.value);
}

    function PhoneFun(e){
      
      let number=e.target.value;
      
      let f=0;
      if(number[0]=='0' || number.length>10){
       return toast.error("enter 10 digit  number")
      }
      for(let i=0;i<number.length;i++){
        if(number[i]>='0' && number[i]<='9'){}
        else{return toast.error("enter valid number")}
      }
      setPhone(number);
    }




  return (
    <>
    <Navbar/>
    <div className='bg-slate-700 m-0 min-h-[90vh]'>
        {/* <div className='text-3xl flex flex-col text-white justify-center items-center text-center p-5 '>
            Cart Empty ☹️
            <IoCartOutline size={"70vh"}/>
            <button onClick={()=>navigate(-1)} className='bg-green-700  py-2 px-5 rounded-2xl flex justify-between items-center'><FaArrowLeft /><span className='mx-2'>Go Back</span></button>
            </div> */}
        <div className='  md:w-[80%] h-auto min-h-[70vh] m-auto text-white'>
          <div className='flex text-2xl items-center border-b-2 mx-5 pt-5  border-gray-400'><IoCartOutline size={"3rem"}/><span className='mx-4'>Order Summary</span> </div>

          <div className='flex items-center justify-between m-5 px-4 border-b-2 border-gray-400'>
            <div className='flex items-center w-[60%]'>
                <img src="https://cdn.dummyjson.com/recipe-images/9.webp" alt=""  className='w-[100px] h-[100px] rounded-full shadow-2xl object-fill   m-3'/>
                <div>name</div>
            </div>
            <div className='w-[20%]'> 1 Pcs</div>
            <h1 className=' w-[20%] flex justify-center items-center'> <FaIndianRupeeSign /> 120</h1>
          </div>
          {
            cartItem.map((data)=>(

              <div key={data.id} className='flex items-center  justify-between m-5 px-4 border-b-2 border-gray-400'>
              <div className='flex items-center w-[60%]'>
                  <img src={data.image} alt=""  className='w-[100px] h-[100px] rounded-full shadow-2xl object-fill   m-3'/>
                  <div className='flex flex-col'>
                  <div>{data.name}</div>
                  <button onClick={()=>removeCartItem(data)} className='border-2 hover:bg-green-600 transition-all ease-in-out duration-500 border-green-600 w-14 py-1 px-2 rounded-2xl'>-1 </button>
                  </div>
              </div>
              <div className='w-[20%]'>{data.quantity} Pcs</div>
              <h1 className=' w-[20%] flex justify-center items-center'> <FaIndianRupeeSign /> 120</h1>
            </div>
            ))
          }
          <div className=''>
            <div className='flex items-center justify-end text-2xl mb-10'> <span>Total Amount: </span> <span className='flex items-center mx-3  text-green-600 font-bold'><FaIndianRupeeSign /> {totalCost} </span></div>
            <div className='flex flex-col  items-end justify-center m-3 ' ><input type="text" className='py-1 px-3 text-black'  placeholder='your address' onChange={(e)=>fun2(e)} value={liveLocation}/> <button onClick={getLocation} className='hover:bg-green-600 transistion-all duration-500 py-1 px-5 my-3 bg-green-700   rounded-2xl font-bold'>live location</button> </div>
            <div className='flex flex-col  items-end justify-center m-3 ' ><input type="text"  className='py-1 my-5 px-3 text-black'  placeholder=' contact number' value={phone} onChange={(e)=>PhoneFun(e)} />  </div>
            <div className='flex items-center justify-end m-3 '><button onClick={Order} className=' hover:bg-green-600 transistion-all duration-500 bg-green-700 py-1 px-5 my-5 rounded-2xl font-bold'>Order Now</button></div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Cart
