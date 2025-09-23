"use client";
import Link from "next/link";
import ListingComponent from "../listingComponent/ListingComponent";
import ListingItem from "../listingItem/ListingItem";
import "./usersOtherItems.scss"

import { useEffect, useState } from "react"

export default function UserOtherItems({user, logedIn}){
    console.log(user)
    const [userListings, setUserListings] = useState([])
    
    console.log(logedIn)
    useEffect(()=>{
        if(!logedIn){
        setUserListings([{id: 1, title: "other swaps from this user", asset: {url: "/placeholderImage.png"}},{id: 1, title: "other swaps from this user", asset: {url: "/placeholderImage.png"}},{id: 1, title: "other swaps from this user", asset: {url: "/placeholderImage.png"}}])
    }
    }, [])
    console.log(userListings)
    return(
       <section className="otherItems">
        <h2 className="otherItems__heading">Other items from {user.firstname +" " +user.lastname}</h2>
        <div className={ !logedIn? "otherItems__flexDiv otherItems__flexDiv--overlay": "otherItems__flexDiv"}>
          {!logedIn? <Link href={"/login"} className="otherItems__link">Du skal være logget ind, for at kunne se {user.firstname +" " +user.lastname} andre swappers</Link>: ""}
            {userListings.map((listing, index)=>{
                console.log(listing, "jerjer")
                return <ListingItem key={index} item={listing}></ListingItem>
            })}
        </div>
       </section>
    )
}