"use client"
import { useEffect, useState } from "react";
import ListingComponent from "../listingComponent/ListingComponent";
import SearchComponent from "../searchComponent/SearchComponent";
import SimpleFilterList from "../simpleFilterList/SimpleFilterList";
import useFetch from "@/hooks/useFetch";

export default function ListingPageContent(){
const [serachConent, setSearchContent] = useState(null)
const items = useFetch("http://localhost:4000/api/v1/listings")
const [filteredItems, setFilteredItems] = useState(items)



    useEffect(()=>{
        if(!serachConent){
            setFilteredItems(items)
            return
        }
     
       let sortedData = items?.flatMap((activity)=>{
        
       
        if(activity.title.substring(0,serachConent.length).toLowerCase() == serachConent.toLowerCase()){
        return activity


        }
        return []
      
      })
     

      setFilteredItems(sortedData)
        

    },[serachConent ])
    
    
    return(
         <div className="listing">
  <div className="listing__topbar">
    <SearchComponent setState={setSearchContent}></SearchComponent>
    <SimpleFilterList elements={["Ascend by date", "Descend by date"]}></SimpleFilterList>

  </div>
  <ListingComponent items={filteredItems ? filteredItems: items}></ListingComponent>
 </div>
    )
}