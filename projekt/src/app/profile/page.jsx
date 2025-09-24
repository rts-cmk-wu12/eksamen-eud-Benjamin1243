"use server"

import FormComponent from "@/components/formComponent/FormComponent"
import UpdateUser from "@/components/updateUser/UpdateUser"
import fetcher from "@/utils/fetcher"
import { cookies } from "next/headers"

export  default async function Profile(){
    const cookieStore = await cookies()
    
    const userId = cookieStore.get("user_id").value
    const token = cookieStore.get("sh_token").value
  
    
   const user = await fetcher("http://localhost:4000/api/v1/users/"+ userId, {headers: {
    "Authorization": "Bearer " + token
  },})
 


    return(
        <>
        <h1 className="profile heading">Velkommen {user?.firstname + " " + user?.lastname}</h1>
        <p>Opdater dine oplysninger</p>
        <UpdateUser data={user}></UpdateUser>
        
        </>
    )
}