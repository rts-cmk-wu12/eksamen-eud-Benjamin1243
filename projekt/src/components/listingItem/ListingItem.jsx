import Link from "next/link"
import "./listingItem.scss"
export default function ListingItem({item, specielLink, placeholder, children, noLink = false}){
    

if(!noLink){

    return(

     <Link href={ !specielLink ? "/product-detail/" + item?.id: specielLink} className="listingItem ">
    <article className="listingItem__article">
      
       <img className="listingItem__img" src={ !placeholder ?item?.asset?.url: "/placeholderImage.png"} alt="" />
       <h2 className="listingItem__heading">{ !placeholder ? item?.title: "Ny listing"}</h2>
       {children}
       
    </article>
    </Link>
    
    )
}else{
    return(
    <div   className="listingItem ">
    <article className="listingItem__article">
      
       <img className="listingItem__img" src={ !placeholder ?item?.asset?.url: "/placeholderImage.png"} alt="" />
       <h2 className="listingItem__heading">{ !placeholder ? item?.title: "Ny listing"}</h2>
       {children}
       
    </article>
    </div>)

}
    
}