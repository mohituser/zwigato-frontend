import axios from "axios";
import { useEffect, useState } from "react";

async function fun(setTags,setData,setUser){
    let data=[];
    let user=localStorage.getItem("user") ? (JSON.parse(localStorage.getItem("user"))) : null;
    setUser(user);
    let tags=await axios.get("https://dummyjson.com/recipes/tags")
    tags= tags.data
    setTags(tags);
    console.log("tags",tags)
    data=  tags?.map( async(tag)=>{
        
        let res=await axios.get(`https://dummyjson.com/recipes/tag/${tag}`);
        // res=await res.json();
        // data.push({tag:res});
        return res.data;
    })
    data=await axios.all(data);

    console.log("data.......",data);

setData(data);
 
}

 async function getOrderItems(setOrder,user){

try {
    if(user?.role=="admin"){
        const  response=await axios.get("https://zwigato-backend-dm7f.onrender.com/getAllOrders");
        console.log(response.data);
        setOrder(response?.data?.order)
    }
    else{
    const  response=await axios.get("https://zwigato-backend-dm7f.onrender.com/getOrders",{withCredentials:true});
    console.log("use......",response.data);
    setOrder(response?.data?.order)
}
    
} catch (error) {
    console.log("error at getorder...",error);
    
}
 }

export default function useProduct(){
    const [data,setData]=useState([]);
    const [tags,setTags]=useState([]);
    const [user,setUser]=useState(null);
    const [order,setOrder]=useState(null);
    useEffect(()=>{
        fun(setTags,setData,setUser);

    },[])
    return [tags,setTags,data,setData,user,setUser,order,setOrder,getOrderItems];
}
