"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { success } from "zod"

export default async function logoutAction(){
   const cookieStore = await cookies()

   cookieStore.delete("sh_token")
    cookieStore.delete("user_id")


    revalidatePath("/")
    return({
        success:true
    })

    
}