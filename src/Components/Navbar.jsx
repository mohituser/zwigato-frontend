import React, { useContext } from 'react';
import image from "../Assets/logo.webp"
import { Link } from 'react-router-dom';
import { userContext } from '../Context/UserContext';
import toast from 'react-hot-toast';

function Navbar() {
const {user,setUser}=useContext(userContext);
 function  logoutFun(){
  localStorage.removeItem("user");
  setUser(null);
  toast.success("Successfully Logout");
}
  return (
    <div className=' bg-green-800 h-[10vh] text-white '>
    <div className=' flex w-[80vw] items-center  m-auto justify-between'>
      <div>
        {/* <img src={image} className="w-20" alt="" /> */}
        <Link to="/"><h1 className="text-3xl "><span className="text-5xl">
         Z</span>wigato</h1></Link> 
      </div>
      
        <ul className='flex justify-center w-[50%]'>
          {!user ? <><li className="mx-6">
          <Link to="/login"> Login</Link>
            </li>
          <li  className="mx-6">
            <Link to="/signup">  Signup </Link></li></> :<>
            {/* <li className='mx-6'>Myorders</li> */}
            <li className="cursor-pointer mx-6" onClick={logoutFun} >logout</li>
            </>}
        </ul>
      
    </div>
    </div>
  )
}

export default Navbar