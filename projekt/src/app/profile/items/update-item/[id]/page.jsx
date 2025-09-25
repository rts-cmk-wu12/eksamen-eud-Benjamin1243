"use server"
import FormComponent from "@/components/formComponent/FormComponent"
import UpdateItemForm from "@/components/updateItemForm/UpdateItemForm"
import fetcher from "@/utils/fetcher"
import { cookies } from "next/headers"

export default async function UpdateItem({params}){
    const {id} = await params
    const cookieStore = await cookies()
   const item = await  fetcher("http://localhost:4000/api/v1/listings/" + id)
  
   //hvis denne item ikke tilhører brugeren
   if(cookieStore.get("user_id").value != item.userId){
    return(
        <>
        <h1>Din item</h1>
        <p>Du tilhører ikke denn item og kan derfor ikke redigere den</p>
        </>
    )
   }

   return(
<UpdateItemForm data={item}></UpdateItemForm>
   
   )


}