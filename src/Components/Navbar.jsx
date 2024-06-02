import React, { useContext } from 'react';
// import image from "../Assets/logo.webp"
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../Context/UserContext';
import toast from 'react-hot-toast';
import { IoCartOutline } from "react-icons/io5";

function Navbar() {
const {user,setUser,totalItems,setOrder,token,setToken}=useContext(userContext);
const navigate=useNavigate();
 function  logoutFun(){
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setUser(null);
  setToken(null);
  setOrder([]);
  toast.success("Successfully Logout");
  navigate("/")
}
  return (
    <div className=' bg-green-800 h-[12vh] text-white  '>
    <div className=' flex w-[90%] md:w-[80%] h-full items-center    md:m-auto mx-3  justify-between'>
      <div>
        {/* <img src={image} className="w-20" alt="" /> */}
        <Link to="/"><h1 className="text-2xl md:text-3pxl text-center font-bold "><span className=" md:text-5pxl text-4xl">
         Z</span>wigato</h1></Link> 
      </div>
      
        <ul className='flex justify-center items-center w-[50%]'>
        <li className="cursor-pointer md:mx-3 mx-2 hover:scale-105" ><Link to="/cart" className='relative'> 
             <IoCartOutline size={"2rem"}/>
            {totalItems>0 &&  <button className='absolute -top-3 right-2 bg-red-700 px-1 rounded-lg font-bold'>{totalItems}</button>}
            </Link></li>
          {!token ? <><li className="cursor-pointer hover:bg-green-700 md:mx-3 mx-2 border-2 rounded-2xl py-1 px-3">
          <Link to="/login"> Login</Link>
            </li>
          <li  className="cursor-pointer hover:bg-green-700 md:mx-3 mx-2 border-2 rounded-2xl py-1 px-3">
            <Link to="/signup">  Signup </Link></li></> :<>
            {/* <li className='mx-6'>Myorders</li> */}
           
            <Link to="/order"><li className="cursor-pointer hover:scale-[102%] md:mx-3  py-1 md:px-3 mx-2" >
             { user?.role=="admin" ?("orders"):(" Myorders")}
              </li></Link>
            <li className="cursor-pointer hover:bg-green-700 md:mx-3 mx-2 border-2 rounded-2xl py-1 text-red-400 md:px-3 px-1" onClick={logoutFun} >Logout</li>
            </>}
        </ul>
      
    </div>
    </div>
  )
}

export default Navbar
