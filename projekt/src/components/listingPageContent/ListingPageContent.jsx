"use client"
import { useEffect, useState } from "react";
import ListingComponent from "../listingListComponent/ListingListComponent";
import SearchComponent from "../searchComponent/SearchComponent";
import SimpleFilterList from "../simpleFilterList/SimpleFilterList";
import useFetch from "@/hooks/useFetch";

export default function ListingPageContent(){
const [serachConent, setSearchContent] = useState(null)
const items = useFetch("http://localhost:4000/api/v1/listings")
const [filteredItems, setFilteredItems] = useState(items)



    useEffect(()=>{
      //guardClause på search
        if(!serachConent){
            setFilteredItems(items)
            return
        }
     //søgefunktion
       let sortedData = items?.filter((activity)=>{
        console.log(activity.title)
        const titles = activity.title.split(" ")
        console.log("titles ", titles)
        const test =titles.filter((title)=>{
          if(title.substring(0,serachConent.length).toLowerCase() ==serachConent.toLowerCase()){
            return title
          }
        })
        if(test.length > 0){
          return activity
        }
        console.log("test er :", test)
        
       
        
        
      
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