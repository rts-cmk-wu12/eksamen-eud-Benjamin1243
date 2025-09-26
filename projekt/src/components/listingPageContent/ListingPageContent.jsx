"use client"
import { useEffect, useState } from "react";
import ListingListComponent from "../listingListComponent/ListingListComponent";
import SearchComponent from "../searchComponent/SearchComponent";
import SimpleFilterList from "../simpleFilterList/SimpleFilterList";
import useFetch from "@/hooks/useFetch";
import searchFunction from "@/utils/searchFunction";
import ascendOrDescend from "@/utils/acendOrDescend";

export default function ListingPageContent(){
const [serachConent, setSearchContent] = useState(null)
const [order, setOrder] = useState(null);
const items = useFetch("http://localhost:4000/api/v1/listings")
const [filteredItems, setFilteredItems] = useState(items)



    useEffect(()=>{
      //guardClause på search og order
      
       let localfilteredItems = items;
     

      if(order){
       
        
             localfilteredItems = ascendOrDescend(items, order)
             
          
          }

        if(serachConent){
         

          localfilteredItems =searchFunction(localfilteredItems, serachConent)

        }
         setFilteredItems(localfilteredItems)
     

    },[serachConent,items, order  ])
    
        

    return(
         <div className="listing">
  <div className="listing__topbar">
    <SearchComponent setState={setSearchContent}></SearchComponent>
    <SimpleFilterList setState={setOrder} elements={[{name: "decend search by date", descend : true, byData: items, dataSort: "createdAt" }, {name: "ascend search by date", descend : false, byData: items, dataSort: "createdAt" }]}></SimpleFilterList>

  </div>
  <ListingListComponent items={filteredItems}></ListingListComponent>
 </div>
    )
}