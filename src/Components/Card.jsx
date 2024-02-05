import React, { useContext } from 'react'
import { userContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom';
import { FaIndianRupeeSign } from "react-icons/fa6";
import toast from "react-hot-toast"

function Card({product,setRecipe}) {
  // console.log("product",product)
  const {user,setCartItem,cartItem,setTotalItems,totalItems}=useContext(userContext)
  const navigate = useNavigate();
  function fun(){
    if(!user){
      navigate("/login")
    }
    else{
    setRecipe(product)}
  }

 function addCartItem(){
  let item=[]
  let x={name:product.name,id:product.id,image:product.image,flag:1,quantity:1};
  let f=0;
   for(let i=0;i<cartItem.length;i++){
    if(cartItem[i].id==product.id){
      item.push({name:cartItem[i].name,id:cartItem[i].id,image:cartItem[i].image,flag:1,quantity:cartItem[i].quantity+1});
    f++;}
      else{
        item.push(cartItem[i]);
       }
   }
   if(f==0){item.push(x);}
   setCartItem(item);
   setTotalItems(totalItems+1);
   toast.success("added to cart")
 }
  return (
    <div className='flex flex-col w-[90%] md:w-[45%] lg:w-[28%] min-w-[250px] my-2 mx-3  p-3 shadow-lg'>
      <img src={product.image} alt="" className='w-[70%] m-auto content-center h-[70%]' />
      <div className= " text-center my-1" > {product.name}</div>
        <div className='flex justify-around mx-0'>
          <h1 className=' flex justify-center items-center font-bold'> <FaIndianRupeeSign className='text-green-600' /> 120</h1>
          <button onClick={()=>addCartItem()} className='border-2 border-green-600 py-1 px-5 rounded-2xl'>+ add</button>
        </div>
         {/* <div className='text-center my-2'>total price : {" "}<span>{}</span></div> */}
         {/* <button className='bg-green-800 w-[50%] rounded-md mx-auto my-2 p-1'>add to cart </button> */}
         <button onClick={()=>fun()} className='bg-green-800 w-[50%] rounded-md mx-auto my-2  p-1'>Recipe </button>
    </div>
  )
}

export default Card