"use client"
import fetcher from "@/utils/fetcher";
import { useEffect, useState } from "react";

export default function useFetch(url, options){
    const [data, setData] = useState(null)
    
    useEffect(()=>{
       async function asyncfetcher(){
        setData( await fetcher(url, options))
       }
       asyncfetcher()
        
    }, []

)
return data
   

}