import useFetch from "@/hooks/useFetch"
import fetcher from "@/utils/fetcher"
import "./productDetail.scss"
import { cookies } from "next/headers"
import UserOtherItems from "@/components/usersOtherItems/UsersOtherItems"
import Link from "next/link"
import ProposeSwapButton from "@/components/proposeSwapButton/ProposeSwapButton"

export async function generateMetadata({ params}) {
  // read route params
  const { id } = await params
 
  // fetch data
 const data = await fetcher("http://localhost:4000/api/v1/listings/" + id) 
  // optionally access and extend (rather than replace) parent metadata
 
  return {
    title: data.title,
    
  }
}





export default async function ProductDetail({params}){
    const {id} = await params
    const cookieStore = await cookies()
    const data = await fetcher("http://localhost:4000/api/v1/listings/" + id)
   

    
    return(
        <>
   <article className="productDetail">
    <img src={data?.asset?.url} className="productDetail__img" image="" alt="" />
    <div className="productDetail__textDiv">
         <h1 className="productDetail__heading">{data?.title}</h1> 
         <p className="productDetail__text">
            {data?.description}
         </p>
         <p className="productDetail__text">
            {data?.description}
         </p>
         <p className="productDetail__date">on SwapHub since: {data.createdAt}</p>
          {cookieStore.has("user_id") && cookieStore.has("sh_token")?  data.userId == cookieStore.get("user_id").value? <Link href={"/profile/items/update-item/" + data.id}>Edit this lisitng</Link>: <ProposeSwapButton produtId={data?.id} token={cookieStore.get("sh_token").value} userId={cookieStore.get("user_id").value}></ProposeSwapButton>: <Link  className="productDetail__loginLink" href={"/login"}>Log in to get this item</Link>}
         </div>
       
       
   </article>
   <UserOtherItems  currentId={data.id} user={data.user} logedIn={true}></UserOtherItems>
     
     
     </>)
}