"use client"
import { useActionState } from "react";
import FormComponent from "../formComponent/FormComponent";
import "./updateItemForm.scss"
import updateListingAction from "@/actions/updateListingAction";

export default function UpdateItemForm({data}){
    const inputs = [{name: "title", label: "Title", defualtVal: data.title}, {name: "description", label: "description", type: "textarea", defualtVal: data.description}, {name: "img", type:"file", label:"opdater billede",  defualtVal: ""}, {name: "id", defualtVal: data.id,type: "hidden"}, {name: "assetId", defualtVal: data.asset.id,type: "hidden"}]
    const [updateState, updatAction, isPending] = useActionState(updateListingAction,{})
    return(
        <article className="updateItem">
        <h1 className="updateItem__heading">update {data.title}</h1>
        <img className="updateItem__image" src={data.asset.url} alt="" />
       <FormComponent isPending={isPending} actionstate={updateState} action={updatAction} submitText="update item" inputs={inputs}>

       </FormComponent>
    </article>
        
    )
}