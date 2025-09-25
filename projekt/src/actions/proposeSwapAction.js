"use server"

import fetcher from "@/utils/fetcher"
import { revalidatePath } from "next/cache"
import { cookies, headers } from "next/headers"

export default async function propeseSwapAction(id,productId){
    console.log(productId)
    const cookieStore = await cookies()
    console.log(id)
    const jsonBody = JSON.stringify({
        "userid": cookieStore.get("user_id").value,
        "requestItem": productId,
        "offerItem": id

    })
    const response = await fetcher("http://localhost:4000/api/v1/requests", {
        method: "POST", 
        headers: {"Authorization": "Bearer " + cookieStore.get("sh_token").value,
            "Content-Type": " application/json"
        },
        body: jsonBody
        
    }, true)
    console.log(response)

   if(!response.status == 204){
       return{
           success: false,
           message: "der skete en fejl på serveren prøv igen"
   
       }
      }
    
      return{
           success: true,
           message: "alt gik godt"
   
       }
}