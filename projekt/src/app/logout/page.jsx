"use client"
import logoutAction from "@/actions/logoutAction"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Logout(){
    const router = useRouter()

useEffect(()=>{
    async function logOut(){
    const logout =  await logoutAction()
    console.log(logout)
    if(logout.success){
        router.refresh("/")
         router.push("/")
        
    }}
    logOut()

}, [])

    return(
        <h1>Loggger ud</h1>
    )
}