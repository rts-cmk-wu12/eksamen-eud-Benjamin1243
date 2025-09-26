"use client"

import useFetch from "@/hooks/useFetch"
import { useEffect, useState } from "react"
import "./proposeSwapButton.scss"
import propeseSwapAction from "@/actions/proposeSwapAction"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ProposeSwapButton({userId, token, produtId}){
    const [clickAction, setClickAction] = useState(false)
    const [swapStatus, setSwapstatus] = useState(null)
    const [alreadySwapped, setAlreadySwapped] = useState(null)
    const router = useRouter()
    const data = useFetch("http://localhost:4000/api/v1/listings")
    //jeg skal også tjekke om useren allerede er igang med at byrtte den ting, for så kan han ikke bytte den igen
    const usersRequestes = useFetch("http://localhost:4000/api/v1/requests/" + userId, {headers:{
        "Authorization": "Bearer " + token 
    }})

    
    //kan også bruges til at tjekke om man allerede har prøvet at bytte med denne enhed
    const offerItems = usersRequestes?.map((request)=>{
        return request.offerItem
    })
    console.log("userrequestes :" ,usersRequestes)
    const newData  = data?.filter((listing)=>{
        
        if(listing.userId == userId){
            console.log(listing.id)
            if(!offerItems?.includes(listing.id)){
            return listing}
           
           
            


            
        }
    })


    useEffect(()=>{
        console.log("jerer")
        async function asyncCheck(){
            console.log("kør")
            const result  = await swapStatus
             console.log(result)
        if(await result?.success){
            router.push("/profile/items")

        }
       

        }
         asyncCheck()

         usersRequestes?.forEach(request => {
        if(request.requestItem == produtId){
            setAlreadySwapped(true)
        }
        
    });
       
    }, [swapStatus, usersRequestes])

   
   


    return (
    <>
    {alreadySwapped ?<Link href="/profile/items">You Already asked for a swap on this listing: click here to see your swaps </Link>:
    <button className="proposeSwapButton" onClick={()=>{
      setClickAction(true)
    }}>Propose swap</button>}

    {clickAction && <div className="proposeSwapOverLay">
         <h2 className="proposeSwapOverLay__heading">Hvilken af dine ting vil du bytte med</h2>
         <button className="proposeSwapOverLay__button" onClick={()=>{
            setClickAction(false)
         }}>Annuler</button>
        <div className="proposeSwapOverLay__flexDiv">
           
            {newData.map((lisitng)=>{
               
                return (<button onClick={(e)=>{setSwapstatus(propeseSwapAction(lisitng.id, produtId))}} key={lisitng.title} className="proposeSwapOverLay__lisitng">
                    <img className="proposeSwapOverLay__listingImg" src={lisitng.asset.url} alt="" />
                    <h3 className="proposeSwapOverLay__listingHeading">{lisitng.title}</h3>

                </button>)
            })}
            
            </div></div>}
    </>
)
}