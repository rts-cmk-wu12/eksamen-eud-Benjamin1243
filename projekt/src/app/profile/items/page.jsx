

import ListingItem from "@/components/listingItem/ListingItem"
import fetcher from "@/utils/fetcher"
import { cookies, headers } from "next/headers"
import "./profileItems.scss"
import ShowRequestItems from "@/components/showRequestItems/ShowRequestItems"
import Link from "next/link"


export const metadata = {
  title: 'Dine listings',
}
export default async function  ProfileItems(){
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_id").value 
    const token = cookieStore.get("sh_token").value

    const user = await fetcher("http://localhost:4000/api/v1/users/" + userId, {
        headers: { 
            "Authorization": "Bearer " + token
        }
    })
console.log("userBaduser ",user)
const listingIds = user?.listings?.map((listing)=>{
   
    return listing.id})
    

    const requestes = await fetcher("http://localhost:4000/api/v1/requests/" + userId, {
        headers: { 
            "Authorization": "Bearer " + token
        }
    })
    const allRequestes = await fetcher("http://localhost:4000/api/v1/requests");
    
   

    const data = user.listings.map(mapper)
/* Promise.all me*/ 
    async function mapper(listing, index){
       
         return await fetcher("http://localhost:4000/api/v1/listings/" + listing.id) 
    }
    //grudnet mit array returne en masse promises, fordi min funktionen er async
    //bruger jeg promise.all metoden til at vente på dem alle og få det som et promise som jeg så kan awaite
    const listingsData = await Promise.all(data)
 

  
    return(
        
        <article className="profileItems">
        <h1 className="profileItems__heading">Your listings</h1>
        <section className="profileItems__items">
            {listingsData?.map((listing,index)=>{
                return <ListingItem key={index} noLink={true}   item={listing}><Link className="editLink" href={"/product-detail/" + listing.id}>see the post</Link><Link className="editLink" href={"/profile/items/update-item/" + listing.id}>Edit this or delete this</Link></ListingItem>
            })}
            <ListingItem specielLink={"/profile/items/register-new-item"}  placeholder  ></ListingItem>
        </section>
       
        <ShowRequestItems listingIds={listingIds} allRequestes={allRequestes} requestes={requestes} userId={userId}></ShowRequestItems>
        
        </article>
    )
    
}
