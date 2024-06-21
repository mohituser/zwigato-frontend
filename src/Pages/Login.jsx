import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaArrowLeft } from "react-icons/fa";
// import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
// import HomeLayout from '../layouts/HomeLayout';
// import { login } from '../Redux/Slices/AuthSlice';
// import { login } from '../Redux/Slices/AuthSlice';
import Navbar from "../Components/Navbar"
import { userContext } from '../Context/UserContext';
import { apiConnector } from '../Helpers/axiosInstance';

function Login() {

    const navigate = useNavigate();
    const {user,setUser,setToken}=useContext(userContext);

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    useEffect(()=>{
        document.title="Login";
        if(user){navigate("/")}
        },[])
    function handleUserInput(e) {
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    async function onLogin(obj) {
        // event.preventDefault();
        console.log(loginData);

        // dispatch create account action
        // const response = await dispatch(login(loginData));
        // if(response?.payload?.success)
            // navigate("/");
        setLoginData(obj);
            try {
                if(!obj.email || !obj.password) {
                    throw "Please fill all the details"
                    // return;
                }
                // const response=await  axios.post("https://zwigato-backend-dm7f.onrender.com/login",{...loginData},{withCredentials:true});
                // console.log(response);
                const BASE_URL="https://zwigato-backend-dm7f.onrender.com/login";
                // const BASE_URL="http://localhost:5002/login";

                // console.log("login is happening before")


                toast.loading("Please wait...")
                let response = await apiConnector("POST",BASE_URL,{...obj});
                toast.dismiss();


                // toast.promise(response ,{
                //         pending:"pending",
                //     //     // success:"success",
                //     //     // error:"rejected"
                //       } )
                    // response= await response;


                    console.log("login is happening after")
                  if(response?.data?.error){
                    throw response.data.message
                  }
                if(response?.data?.success){
                    console.log(response);
                navigate(-1);
                localStorage.setItem("user",JSON.stringify(response.data.user));
                localStorage.setItem("token",response.data.token);
                setUser(response.data.user);
                setToken(response.data.token);
                setLoginData({
                    email: "",
                    password: "",
                    // fullname:"",
                    
                });
                toast.success(response?.data?.message)     
        }
        // {throw response?.data?.message }
            } catch (error) {
                toast.dismiss();
                // setLoginData({
                //     email: "",
                //     password: "",
                //     // fullname:"",
                    
                // });
                console.log("error",error);
                toast.error("error at login side",error);
            }
            // console.log("hieairei0e")
            // finally{
        
    }
    // if(user){ return navigate("/")}

function fun1(e,obj){
    e.preventDefault();
    // setLoginData(obj);
     onLogin(obj);
    
}


    return (
        <>
             <Navbar/>
            <div className='flex overflow-x-hidden items-center justify-center h-[90vh] bg-gray-500'>
                <form noValidate onSubmit={onLogin} className='flex relative flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
                    <h1 className="text-center text-2xl font-bold">Login Page</h1>
        <div onClick={()=>navigate(-1)} className=' cursor-pointer absolute top-2 left-0 m-4 text-2xl'><FaArrowLeft /></div>
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

                    <button onClick={(e)=>fun1(e,loginData)} className='mt-2 bg-green-700  hover:bg-green-600  transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                       Login
                    </button>
                    <button  onClick={(e)=>fun1(e,{email:"user1@gmail.com",password:"1234567"})} className='mt-2 bg-green-700  hover:bg-green-600  transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                       Login as a customer
                    </button>
                    <button onClick={(e)=>fun1(e,{email:"user@gmail.com",password:"1234567"})} className='mt-2 bg-green-700  hover:bg-green-600  transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                       Login as a admin
                    </button>

                    <p className="text-center">
                        Don't have an account ? <Link to="/signup" className=' text-blue-200 underline cursor-pointer'> Signup</Link>
                    </p>

                </form>
            </div>
        </>
    );

}
export default Login;
