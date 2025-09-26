"use client"
import fetcher from "@/utils/fetcher"
import "./showRequestItems.scss"
import ListingItem from "../listingItem/ListingItem"
import RequestItem from "../requestItem/RequestItem"
import useFetch from "@/hooks/useFetch"
export default function ShowRequestItems({requestes,listingIds, userId,allRequestes}){


const requestetToUSer = allRequestes.filter((request)=>{
    
    
    if(listingIds.includes(request.requestItem)){
        return request
    }
})
console.log(requestes)




const listings = useFetch("http://localhost:4000/api/v1/listings")

    
    return(
        <>
        
    <section className="showRequestItems" >
            { requestes.length < 1?<h2 className="showRequestItems__heading">Du har ikke igang sat en forspørgsel om en bytning.... kom i gang!!</h2>:<h2 className="showRequestItems__heading">Dine Sendte  forespørgelser</h2>}
            <div className="showRequestItems__items">
            {requestes?.map((request, index)=>{
                return <RequestItem listings={listings} key={index} userId={userId} request={request}></RequestItem>
            })}
            </div>
        </section>

         <section className="showRequestItems" >
            { requestetToUSer.length < 1?<h2 className="showRequestItems__heading">Du har ingen ventede forspørgelser</h2>:<h2 className="showRequestItems__heading">Dine ventede forespørgelser</h2>}
            <div className="showRequestItems__items">
            {requestetToUSer?.map((request, index)=>{
                return <RequestItem listings={listings} toUser={true} key={index} userId={userId} request={request}></RequestItem>
            })}
            </div>
        </section>
        </>
        
    
    )
}