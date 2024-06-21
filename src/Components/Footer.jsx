import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoMdClose } from "react-icons/io";
import { apiConnector } from '../Helpers/axiosInstance';

const Footer = () => {
const [showForm,setShowForm]=useState(false);
const [data,setData] = useState({
  Name:"",
  Email:"",
  Description : "",

})



const handleOnChange = (e)=>{
  const { name, value} = e.target

  setData((preve)=>{
    return{
      ...preve,
      [name]  : value
    }
  })
}
async function handleSubmit() {

      try {
          if(!data.Email || !data.Name || !data.Description ) {
              throw "Please fill all the details"
              // return;
          }
          const BASE_URL="https://zwigato-backend-dm7f.onrender.com/sendMail";
          // const BASE_URL="http://localhost:5002/sendMail";
          toast.loading("Please wait...")
          let response = await apiConnector("POST",BASE_URL,{...data});
          toast.dismiss();

              console.log("login is happening after")
            if(response?.data?.error){
              throw response.data.message
            }
          if(response?.data?.success){
          toast.success(response?.data?.message)  
          setData({
            Name:"",
            Email:"",
            Description : "",
          })

  }
      } catch (error) {
          toast.dismiss();
         
          console.log("error",error);
          // toast.error(error);
      }
  
}


  return (
    <>
    <footer className='bg-green-800 h-[8vh] '>
      <div className='container mx-auto '>
       <p onClick={()=>{setShowForm(true)}} className='text-center font-bold pt-2  text-2xl transition-all text-white hover:underline cursor-pointer hover:text-green-200'  >Contact Me</p>
      </div>
    </footer>
    {showForm && 
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
       <div className='mx-auto  bg-white shadow-md p-4 w-[80%] md:w-[60%] lg:w-[40%] min-h-[60vh]'>

            <button className='block ml-auto text-3xl   border-2 rounded-full' onClick={()=>setShowForm(false)}>
                <IoMdClose/>
            </button>
        <div className='w-full h-full flex flex-col justify-between items-center '>

            <h1 className='pb-4 text-lg text-center font-bold w-full'>Contact Form</h1>
             <div className='md:w-[80%] w-full  mx-auto '>
             <label>
              <div >Name :</div> 
              <input type="text" onChange={handleOnChange}    placeholder='your name' className=' bg-slate-300 w-full md:w-[90%] mb-4 mt-2 p-2' name="Name" value={data.Name}/>
              </label>  
              </div> 
              <div className='md:w-[80%] w-full mx-auto'>
              <label>
              <div>Email :</div> 
              <input type="text" onChange={handleOnChange}    placeholder='your email'  name="Email" className='p-2 mt-2 bg-slate-300 mb-4 w-full md:w-[90%]' value={data.Email}/>
              </label>   
              </div>
              <div className='md:w-[80%] w-full mx-auto'>
             <label htmlFor='description' className='mt-3 '>
              <div> Description :</div>
    
              <textarea 
                className='h-28 md:w-[90%] w-full mt-2 mb-4 p-2 bg-slate-300 border resize-none ' 
                placeholder='enter your query or feedback' 
                rows={3} 
                onChange={handleOnChange} 
                name='Description'
                value={data.Description}
              >
              </textarea>
              </label>
              </div>
              
              <div onClick={handleSubmit} className='p-2 hover:scale-105 hover:bg-green-700 transition-all text-center cursor-pointer rounded-md text-white font-bold w-40 mx-auto bg-green-800'>submit</div>
       </div>
       </div>
    </div>
}
    </>
  )
}
export default Footer;