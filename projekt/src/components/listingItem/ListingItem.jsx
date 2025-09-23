import Link from "next/link"
import "./listingItem.scss"
export default function ListingItem({item}){
    console.log(item)
    return(
    <Link href={"product-detail/" + item?.id} className="listingItem ">
    <article className="listingItem__article">
      
       <img className="listingItem__img" src={item?.asset?.url} alt="" />
       <h2 className="listingItem__heading">{item?.title}</h2>
       
    </article>
    </Link>
    )
    
}