
import './App.css';
import NavBar from './Components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { Routes,Route } from 'react-router-dom'
import { userContext } from './Context/UserContext';
import useProduct from './Hooks/useProduct';
import Cart from './Pages/Cart';
import { useMemo, useState } from 'react';
import MyOrders from './Pages/MyOrders';
import OrdersDetail from './Pages/OrdersDetail';
import {io} from "socket.io-client"
import Footer from './Components/Footer';


function App() {
  const [tags,setTags,data,setData,user,setUser,order,setOrder,getOrderItems,token,setToken]=useProduct();
  const [cartItem,setCartItem]=useState([]);
  const [totalItems,setTotalItems]=useState(0);
  // const socket = useMemo(()=>io("http://localhost:5002"),[]);
  // const socket=io("http://localhost:5002");
  console.log("data at app ",tags);
  return (
    
    <userContext.Provider  value={{tags:tags,data:data,user:user,setUser:setUser,cartItem,setCartItem,totalItems,setTotalItems,order,setOrder,getOrderItems,token,setToken} }>
      {/* <NavBar/> */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<MyOrders/>}/>
        {/* <Route path='/admin/order' element={<MyOrders/>}/> */}
        <Route path='/order/detail/:orderId' element={<OrdersDetail/>}/>
      </Routes>
   
      <Footer/>
    </userContext.Provider>
  );
}

export default App;
