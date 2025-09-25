import useFetch from "@/hooks/useFetch"
import fetcher from "@/utils/fetcher"
import "./productDetail.scss"
import { cookies } from "next/headers"
import UserOtherItems from "@/components/usersOtherItems/UsersOtherItems"
import Link from "next/link"
import ProposeSwapButton from "@/components/proposeSwapButton/ProposeSwapButton"
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
          {cookieStore.has("user_id") && cookieStore.has("sh_token")?  data.userId == cookieStore.get("user_id").value? <Link href={"/profile/items/update-item/" + data.id}>Edit this lisitng</Link>: <ProposeSwapButton produtId={data?.id} token={cookieStore.get("sh_token").value} userId={cookieStore.get("user_id").value}></ProposeSwapButton>: ""}
         </div>
       
       
   </article>
   <UserOtherItems  currentId={data.id} user={data.user} logedIn={true}></UserOtherItems>
     
     
     </>)
}