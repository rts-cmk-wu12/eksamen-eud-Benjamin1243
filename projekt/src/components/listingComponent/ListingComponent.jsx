"use client"
import useFetch from "@/hooks/useFetch"
import { useState } from "react"
import "./listingComponent.scss"
import ListingItem from "../listingItem/ListingItem"
import ProductPageScroller from "../productPageScroller/ProductPageScroller"


export default function ListingComponent({items}){
    console.log("items", items)

const [actualProducts, setActualProducts] = useState(null) 
console.log("actual",actualProducts)
   
    
    return(
     <div className="listingItems"> 
     {actualProducts?.map(item=>{
     return <ListingItem key={item.title + 1} item={item}></ListingItem>
        
     })}

     <ProductPageScroller max={6} setState={setActualProducts} values={items&& items}></ProductPageScroller>
     
     
     </div>
    )
}