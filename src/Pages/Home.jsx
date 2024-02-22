import React, { useEffect, useMemo, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import Card from '../Components/Card';
import Navbar from '../Components/Navbar';
import { userContext } from '../Context/UserContext';
import { useContext } from 'react';
import { FaRegTimesCircle } from "react-icons/fa";
import axios from 'axios';
import Card1 from '../Components/Card1';
import { searchData } from '../Assets/searchData';
import {io} from "socket.io-client"

function Home() {
  const {tags,data}=useContext(userContext);
  console.log("data at home",data);
  const [recipe,setRecipe]=useState(null);
  const [recipe2,setRecipe2]=useState(null);
  const [limit,setLimit]=useState(4);
  const [searchItem,setSearchItem]=useState("");
  const [searchResult,setSearchResult]=useState([]);
  const [showSearchData,SetShowSearchData]=useState(false)
  const [item,setItem]=useState([])
  let keyId=0;
  let keyId1=0;
  const [randomNumber,setRandomNumuber]=useState(1);
  useEffect(()=>{

    let randomNumber= Math.floor((Math.random() * 10) + 1);
    setRandomNumuber(randomNumber);
    let x=searchData.map((data,i)=>{
    return data;
    })
    setItem(x);
  },[])


// const socket=useMemo(()=>io("http://localhost:5002"),[]);
// socket.on("message",(s)=>console.log(s));
// const socket=io("http://localhost:5002");
// useEffect(()=>{
//   console.log("hi............socket......")
// socket.on("welcome",(s)=>{console.log(s)})
// },[])
  const [notFound,setNotFound]=useState(false);



  function fun(e,name=""){
    let val="";
    if(name!=""){val=name;}
    else{val=e?.target?.value}
      // console.log("x...........",e?.code)
      setSearchItem(val);
    setNotFound(false);
    let x=searchData.filter((data)=>data.show.includes((val).toLowerCase()));
    setItem(x);
    // if(e.target.value.length==0){SetShowSearchData(false);}
  }



  async function onsubmitFun(e){
    if(e?.code?.length>0 && e?.code!="Enter"){return;}

    console.log("saeiai",searchItem.length);
    let val=searchData.filter((dat)=>dat.show==(searchItem.toLowerCase()));
    console.log("val",val);
    val=val[0]?.name;
    if(searchItem.length>0){
      try {
      
      const res=await axios.get( `https://www.themealdb.com/api/json/v1/1/filter.php?i=${val}`);
      setSearchResult(res?.data?.meals);
      console.log(res?.data?.meals);
        
    } catch (error) {
      setSearchResult([]);
  console.log(error);
    }
    finally{
      setNotFound(true);
      SetShowSearchData(false);
    }
    }  
    else{
      setSearchResult([]);
    }
  }



  function onClickFun(e){
    if(e.target.tagName!="INPUT" && showSearchData){
      SetShowSearchData(false); 
    }
    console.log("onclicked",e);
  // if(e.target.tagName!="")
// setRecipe2(null);
// setRecipe(null);


  }
  return (
    <>
    <Navbar/>
    < div onClick={(e)=>onClickFun(e)} className="relative  w-full bg-slate-700 text-white overflow-hidden">
        <img src={`https://cdn.dummyjson.com/recipe-images/${randomNumber}.webp`}  alt="" className=" content-stretch  w-[100vw] h-[80vh] opacity-[0.75] brightness-[25%]" />
        <div className="absolute top-[25vh] md:top-[50vh] left-0 right-0 bg-transparent text-white meal-search w-[100vw]">
          <h2 className=" text-4xl text-center mb-5">Find Meals For Your Ingredeints</h2>
          <div className="  w-[60%] flex  mx-auto my-3 items-center  ">
            <div className='relative flex w-[100%] '>
            <input
              type="text"
              className="w-[85%]  p-2 px-6 text-black border-none rounded-l-full"
              placeholder="Enter an ingredeints"
              value={searchItem}
              onChange={fun}
              onClick={()=>SetShowSearchData(true)}
              onKeyPress={(e)=>{onsubmitFun(e)}}
            />
            <button onClick={(e)=>onsubmitFun(e)} type="submit" className="w-[15%] group p-2 flex justify-center rounded-r-full hover:bg-green-700 bg-green-800" >
             <FaSearch  className=" text-2xl group-hover:scale-105 "/> 
            </button>
           { showSearchData &&  <div className='absolute top-10 left-5 rounded-lg px-4 w-auto text-black  bg-slate-200'>
            <ul>
            {
            item.map((dat,i)=>{
            if(i>=5)return <></>
           return <li className=' cursor-pointer' onClick={()=>fun(2,dat.show)} key={dat.id}>{dat.show} </li>}
            )}
            </ul>
          </div>}
            </div>
          </div>
         
        </div>
        <div className=' w-[90%] my-4 mx-auto  '>  
        {notFound && searchResult==null && <>
          <h1 className='text-3xl text-center my-5  underline  py-5'> Search Results</h1>
          <div className='text-green-700 text-3xl text-center'>Sorry, this dish is not available</div>
        </>}
                  {searchResult?.length>0 && 
                  <>
                  <h1 className='text-3xl text-center my-5  underline  py-5'> Search Results</h1>
                  <div className='display flex flex-wrap'>
                 {searchResult?.map((dat,i)=>{
                      // return <Card key={keyId} product={dat}  setRecipe={setRecipe}/>
                      return <Card1 key={dat.idMeal} product2={dat} setRecipe2={setRecipe2} />
                      // return <div>hie</div>
                    })}
                    </div>
                </>  }
                    <h1 className='text-3xl text-center my-5  underline  py-5'> Recommended</h1>
                  {  data?.map((dat,i)=>{
                      keyId1++;        
                      if(i>=limit || i==0)return <></>
                      return<>
                      <h1 key={keyId1} className='text-2xl border-b-2 border-gray-400'> {tags[i]}</h1>
                      <div key={keyId1} className='flex flex-wrap'>
                      {dat?.recipes.map((d,j)=>{
                         keyId++;
                     return <Card key={keyId} product={d}  setRecipe={setRecipe}/>
                    })
                      }
                      </div>
                      </>
})
                      
                  }

       
        </div>
     <div className='text-center my-7'><button disabled={limit<tags.length ?(false):(true)} onClick={()=>{setLimit(limit+4)}} className={`border-2 p-2  hover:bg-green-700 rounded-lg bg-green-800`}>load more</button></div> 
    {recipe &&
        <div className='bg-green-800  rounded-lg p-5 min-h-[80vh] w-[80vw] fixed top-20 left-20 z-20'>
          <div className='text-2xl flex justify-end'>
            < FaRegTimesCircle  onClick={()=>setRecipe(null)}/></div>
          <div className="text-2xl font-bold text-center underline mb-5 ">{recipe?.name}</div>
          <div>
            <h1 className='text-2xl my-5 '>Ingredients Required :-
            {
              recipe?.ingredients.map((dat,i)=>(
               <span key={i} className='text-xl mx-2'>{ i+1!=recipe?.ingredients.length ? (`${dat}, `):(`${dat}.`)}</span>
              ))
            }
            </h1>

          </div>
          <div>
            <h1 className='text-2xl'>Instructions :-</h1>
            <ul>
              {
                recipe?.instructions.map((dat,i)=>(
                  <li className='my-3'>
                <span className='text-1xl'>{`${(i+1)} ) `}</span>{dat}
                  </li>
                ))
              }
            </ul>
          </div>
          
        </div>
        }
        {recipe2 &&
        <div   className='bg-green-800  rounded-lg p-5 min-h-[80vh] w-[80vw] fixed top-20 left-20 z-20'>
          <div className='text-2xl flex justify-end'>
            < FaRegTimesCircle  onClick={()=>setRecipe2(null)}/></div>
          <div className="text-2xl font-bold text-center underline mb-5 ">{recipe2?.strMeal}</div>
    
          <div>
            <h1 className='text-2xl'>Instructions :-</h1>
            {/* <ul>
              {
                recipe2?.instructions.map((dat,i)=>(
                  <li className='my-3'>
                <span className='text-1xl'>{`${(i+1)} ) `}</span>{dat}
                  </li>
                ))
              }
            </ul> */}
            <div>{recipe2.strInstructions}</div>
          </div>
          
        </div>
        }
    </div>
    </>
  )
}

export default Home