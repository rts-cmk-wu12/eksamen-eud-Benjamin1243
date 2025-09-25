"use client"
import { useActionState, useEffect } from "react"
import FormComponent from "../formComponent/FormComponent"
import registerNewListingAction from "@/actions/registerNewListingAction"


export default function RegisterNewItem(){
    const [registerState, registerAction, isPending] =  useActionState(registerNewListingAction, {})

    useEffect(()=>{
console.log(registerState)
    }, [registerState])


    const inputs = [{name :"title", label: "Title"}, {name: "description", label: "description", type:"textarea"}, {name: "img", label: "Image", type: "file"}]
        return(
            <>
            <h1>Register new Item</h1>
            <FormComponent isPending={isPending} action={registerAction} actionstate={registerState} inputs={inputs}></FormComponent>
            </>
    
        )
       
    
}