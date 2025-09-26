"use server"

import fetcher from "@/utils/fetcher"
import { cookies } from "next/headers"

export default async function deleteListing(id){
const cookieStore = await cookies()
    const response = fetcher("http://localhost:4000/api/v1/listings/" + id,{
        method: "DELETE", 
        headers: {
            "Authorization": "Bearer "+ cookieStore.get("sh_token").value
        }
    } )

}