"use client";
import Link from "next/link";
import ListingComponent from "../listingListComponent/ListingListComponent";
import ListingItem from "../listingItem/ListingItem";
import "./usersOtherItems.scss"

import { useEffect, useState } from "react"
import useFetch from "@/hooks/useFetch";
import sortListingOutOfUser from "@/utils/sortListingOutOfUser";

export default function UserOtherItems({user, logedIn, token, currentId}){

    const [userListings, setUserListings] = useState([])
    const data = useFetch("http://localhost:4000/api/v1/listings")
    console.log(data)
   
 
    
  
    useEffect(()=>{
       setUserListings( sortListingOutOfUser(user.id, data, currentId))
    }, [data])


    
    return(
       <section className="otherItems">
        <h2 className="otherItems__heading">Other items from { userListings.has ?user.firstname +" " +user.lastname: "Other swappers"}</h2>
        <div className={ !logedIn? "otherItems__flexDiv otherItems__flexDiv--overlay": "otherItems__flexDiv"}>
          {!logedIn? <Link href={"/login"} className="otherItems__link">Du skal være logget ind, for at kunne se {user.firstname +" " +user.lastname} andre swappers</Link>: ""}
            {userListings?.data?.map((listing, index)=>{
                console.log(listing, "jerjer")
                return <ListingItem key={index} item={listing}></ListingItem>
            })}
        </div>
       </section>
    )
}