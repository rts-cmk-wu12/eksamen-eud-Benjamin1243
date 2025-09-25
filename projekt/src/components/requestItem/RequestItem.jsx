"use client"

import { useEffect, useState } from "react"
import ListingItem from "../listingItem/ListingItem"
import fetcher from "@/utils/fetcher"
import deleteRequest from "@/actions/deleteRequestAction"
import deleteRequestAction from "@/actions/deleteRequestAction"
import doTheSwapAction from "@/actions/doTheSwapAction"
import "./requestItem.scss"

export default function RequestItem({request, userId, toUser, listings}) {
    const [requestItem, setRequestItem] = useState(null)
    const [offerItem, setOfferItem] = useState(null)
    useEffect(()=>{
        setRequestItem()
       //useEffet der filtere de ting listings er i forhold til request og offer
       //før var det en fetch for hver, men det var meget perfomance kritisk....selv på den her mac m2 
       const requestItemFilter = listings?.filter((listing)=>{
       
        if(listing.id == request.requestItem){
            return listing
        }
       })
       const offerItemFilter = listings?.filter((listing)=>{
        
        if(listing.id == request.offerItem){
            return listing
        }
       })

       setRequestItem(requestItemFilter?.[0])
       setOfferItem(offerItemFilter?.[0])

            //den her skal ændrer til en array filter istedet for at fetche 2 gange
           
 
  
        
       
    },[listings] )
   
    
    



    if (!toUser) {
        return (<div className="requestItem"> <button onClick={() => {deleteRequestAction(request.id) }} className="requestItem__swapDelete">X</button><p className="requestItem__text">Du vil have </p><ListingItem item={requestItem}></ListingItem> <p className="requestItem__text">for </p><ListingItem item={offerItem}></ListingItem></div>)
    }else{
                return (<div className="requestItem"> <button onClick={() => {doTheSwapAction(offerItem, requestItem, request.id) }} className="requestItems__swapAcept">✔️</button><p className="requestItem__text">Du skal give </p><ListingItem item={requestItem}></ListingItem> <p className="requestItem__text">for </p><ListingItem item={offerItem}></ListingItem></div>)

    }

}