"use client"
import { useActionState } from "react";
import FormComponent from "../formComponent/FormComponent";
import "./updateItemForm.scss"
import updateListingAction from "@/actions/updateListingAction";
import deleteListing from "@/actions/deleteListing";
import { useRouter } from "next/navigation";

export default function UpdateItemForm({data}){
    const router = useRouter()
    const inputs = [{name: "title", label: "Title", defualtVal: data.title}, {name: "description", label: "description", type: "textarea", defualtVal: data.description}, {name: "img", type:"file", label:"opdater billede",  defualtVal: ""}, {name: "id", defualtVal: data.id,type: "hidden"}, {name: "assetId", defualtVal: data.asset.id,type: "hidden"}]
    const [updateState, updatAction, isPending] = useActionState(updateListingAction,{})
    return(
        <article className="updateItem">
        <h1 className="updateItem__heading">update {data.title}</h1>
         <button className="updateItem__deleteButton" onClick={()=>{
            deleteListing(data.id)
            router.push("/profile/items")

         }}>Delete this item</button>
       
       <FormComponent isPending={isPending} actionstate={updateState} action={updatAction} submitText="update item" inputs={inputs}>

       </FormComponent>
        <img className="updateItem__image" src={data.asset.url} alt="" />
    </article>
        
    )
}