import useFetch from "@/hooks/useFetch"
import fetcher from "@/utils/fetcher"
import "./productDetail.scss"
import { cookies } from "next/headers"
import UserOtherItems from "@/components/usersOtherItems/UsersOtherItems"
export default async function ProductDetail({params}){
    const {id} = await params
    const cookieStore = await cookies()
    
    const data = await fetcher("http://localhost:4000/api/v1/listings/" + id)
    console.log(data)
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
           <button className="productDetail__button">Propose a swap</button>
         </div>
       
       
   </article>
   <UserOtherItems  currentId={data.id} user={data.user} logedIn={true}></UserOtherItems>
     
     
     </>)
}