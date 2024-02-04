
import './App.css';
import NavBar from './Components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { Routes,Route } from 'react-router-dom'
import { userContext } from './Context/UserContext';
import useProduct from './Hooks/useProduct';


function App() {
  const [tags,setTags,data,setData,user,setUser]=useProduct();
  console.log("data at app ",tags);
  return (
    
    <userContext.Provider  value={{tags:tags,data:data,user:user,setUser:setUser} }>
      {/* <NavBar/> */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
   

    </userContext.Provider>
  );
}

export default App;
