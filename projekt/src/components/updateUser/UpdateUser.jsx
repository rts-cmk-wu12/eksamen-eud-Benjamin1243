"use client"

import { useActionState, useEffect } from "react"
import FormComponent from "../formComponent/FormComponent"
import updateUser from "@/actions/updateUserFunction"
import updateUserFunction from "@/actions/updateUserFunction"

export default function UpdateUser({data}){
    
   const [updateUserState, updateUserAction, isPending] = useActionState(updateUserFunction, {})
   console.log("heh")
   useEffect(()=>{
   console.log(updateUserState)
    
   }, [updateUserState])
   const inputs = [
    {name: "email", label: "Email", defualtVal: updateUserState?.email ?  updateUserState?.email : data?.email}, 
    {name: "firstname", label: "Firstname", defualtVal: updateUserState?.firstname ? updateUserState.firstname: data?.firstname}, 
    {name: "lastname", label: "Lastname", defualtVal: updateUserState?.lastname ? updateUserState?.lastname :data?.lastname}, 
    {name: "password", label: "Password", type: "password", defualtVal: updateUserState?.password && updateUserState?.password }]
    return(
        <FormComponent isPending={isPending} action={updateUserAction} actionstate={updateUserState} inputs={inputs}></FormComponent>

    )
}