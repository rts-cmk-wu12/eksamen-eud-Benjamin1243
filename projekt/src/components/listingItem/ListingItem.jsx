import "./listingItem.scss"
export default function ListingItem({item}){
    return(
    <article className="listingItem">
       <img className="listingItem__img" src={item.asset.url} alt="" />
       <h2 className="listingItem__heading">{item.title}</h2>
    </article>
    )
    
}