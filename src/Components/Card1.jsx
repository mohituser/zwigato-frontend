import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../Context/UserContext';

function Card1({product2,setRecipe2}) {

  const {user}=useContext(userContext)
  const navigate = useNavigate();
  

  // console.log("product",product)
  async function fun(id){
    if(!user){
      navigate("/login")
    }
    else{
    

  let res=await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  console.log(res?.data?.meals[0]);
//   res=res?.data?.strInstructions;
  setRecipe2(res?.data?.meals[0]);
  }
  }
  return (
    <div className='flex flex-col w-[70%] md:w-[45%] lg:w-[28%] min-w-[250px] my-2 mx-3  p-3 shadow-lg'>
      <img src={product2.strMealThumb} alt="" className='w-[70%] m-auto content-center h-[70%]' />
      <div className= " text-center my-1" > {product2.strMeal}</div>
      {/* <div className='flex justify-center my-1 w-[50%] m-auto'>
        <select className=' h-8 bg-green-800 mx-5 rounded-md'>
            {Array.from(Array(6),(e,i)=>{return(
                <option key={i+1} value={i+1}>{i+1}</option>
            )})
           }
        </select>
        <select className='h-8 bg-green-800 mx-5 rounded-md'>
            <option value="half" key={1}>half</option>
            <option value="full" key={2}>full</option>
        </select>
         </div> */}
         {/* <div className='text-center my-2'>total price : {" "}<span>{}</span></div> */}
         {/* <button className='bg-green-800 w-[50%] rounded-md mx-auto my-2 p-1'>add to cart </button> */}
         <button onClick={()=>fun(product2.idMeal)} className='bg-green-800 w-[50%] rounded-md mx-auto my-2  p-1'>Recipe </button>
    </div>
  )
}

export default Card1;