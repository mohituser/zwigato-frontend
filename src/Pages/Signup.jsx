import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaArrowLeft } from "react-icons/fa";
// import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


import Navbar from "../Components/Navbar"
import axios from "axios"
import { userContext } from '../Context/UserContext';
import { apiConnector } from '../Helpers/axiosInstance';

function Signup() {

    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user,setUser,token,setToken}=useContext(userContext);
    const [loginData, setLoginData] = useState({
        fullname:"",
        email: "",
        password: "",
    });
    useEffect(()=>{
        document.title="Signup";
        if(token){navigate("/")}
        },[])
    function handleUserInput(e) {
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    async function submitForm(event) {
        event.preventDefault();
       
        try {
            if(!loginData.email || !loginData.password || !loginData.fullname) {
                throw ("Please fill all the details");
            
            }
            const BASE_URL="https://zwigato-backend-dm7f.onrender.com/register";
            // const BASE_URL="http://localhost:5002/register";
            let response=  apiConnector("POST",BASE_URL,{...loginData});
            // toast.promise(response ,{
            //     pending:"pending",
            //     // success:"success",
            //     // error:"rejected"
            //   } )
            toast.loading("Please wait...")
              response= await response;
              toast.dismiss();
              if(response?.data?.error){
                // toast.error(response?.data?.message);
                // return;
                throw response?.data?.message;
              }
            if(response?.data?.success){
                console.log(response);
                toast.success(response?.data?.message);
            navigate(-1);
            localStorage.setItem("user",JSON.stringify(response.data.user));
            localStorage.setItem("token",response.data.token);
            setUser(response.data.user);
            setToken(response.data.token);
            toast.success("Successfully Registered")
        setLoginData({
            email: "",
            password: "",
            fullname:"",
            
        });
    }
        } catch (error) {
            // console.log("error",error);
            toast.dismiss();

              toast.error( error);
        }

        // dispatch create account action
        // const response = await dispatch(login(loginData));
       
    }

    // if(user){navigate("/")}
    return (
        <>
        
               <Navbar/>
            <div className='flex overflow-x-auto items-center justify-center h-[90vh] bg-gray-500'>
                <form noValidate onSubmit={submitForm} className=' relative flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
                    <h1 className="text-center text-2xl font-bold">Signup Page</h1>
                    <div onClick={()=>navigate(-1)} className=' cursor-pointer absolute top-2 left-0 m-4 text-2xl'><FaArrowLeft /></div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="fullname" className='font-semibold'> Name </label>
                        <input 
                            type="text" 
                            required
                            name="fullname"
                            id="fullname"
                            placeholder="Enter your fullname.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={loginData.fullname}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='font-semibold'> Email </label>
                        <input 
                            type="email" 
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={loginData.email}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password" className='font-semibold'> Password </label>
                        <input 
                            type="password" 
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={loginData.password}
                        />
                    </div>

                    <button type="submit" className='mt-2 bg-green-700  hover:bg-green-600  transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                       Register
                    </button>

                    <p className="text-center">
                        Already have an account  ? <Link to="/login" className=' text-blue-200 underline cursor-pointer'> Login</Link>
                    </p>
                    <p className="text-center">
                        Are you guest ? <Link to="/login" className=' text-blue-200 underline cursor-pointer'> Login</Link>
                    </p>
                </form>
            </div>
        </>
    );
}

export default Signup
