"use server"

import fetcher from "@/utils/fetcher"
import { revalidatePath } from "next/cache"
import { cookies, headers } from "next/headers"


export default async function deleteRequestAction(id){
    console.log(id)
    const cookieStore = await cookies()
    console.log("ehrhh")
   const repsonse = await fetcher("http://localhost:4000/api/v1/requests/" + id, {
    method : "DELETE",
    headers: {
        "Authorization": "Bearer " + cookieStore.get("sh_token").value
    }
   }, true)

   if(!repsonse.status == 204){
    return{
        success: false,
        message: "der skete en fejl på serveren prøv igen"

    }
   }
 revalidatePath('/profile/items/')
   return{
        success: true,
        message: "alt gik godt"

    }
  


}