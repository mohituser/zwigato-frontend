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
//     let newdata=data?.map((dat,i)=>{
// return {tags[i]:dat}
//     })
    console.log("data.......",data);

setData(data);
    // const data=await res.json();
    // console.log(data);
    // setData(data);
}
export default function useProduct(){
    const [data,setData]=useState([]);
    const [tags,setTags]=useState([]);
    const [user,setUser]=useState(null)
    useEffect(()=>{
        fun(setTags,setData,setUser);

    },[])
    return [tags,setTags,data,setData,user,setUser];
}