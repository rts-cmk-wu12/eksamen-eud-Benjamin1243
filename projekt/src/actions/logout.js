"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export default async function logout(){
    const cookieStore = await cookies()
    cookieStore.delete("sh_token")
     cookieStore.delete("user_id")
    

     return true

    
}