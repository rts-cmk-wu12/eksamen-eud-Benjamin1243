"use server"

import fetcher from "@/utils/fetcher"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"


export default async function doTheSwapAction(requestListing, userListing, requestId ){
    console.log("request listing ", requestListing,"  Den anden listinger erer", userListing)
    const cookieStore = await cookies()

    //starter jeg med at give de 2 listings til hver bruger, før jeg sletter de gamle 

    //start med at give useren køberens item
    const userget = await fetcher("http://localhost:4000/api/v1/listings", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookieStore.get("sh_token").value

        },
        body: JSON.stringify({
            title: requestListing.title,
            description: requestListing.description,
            assetid: requestListing.assetId,
            userid: userListing.userId,
            categoryid: requestListing?.categoryId ? requestListing?.categoryId : 1


        })
    })
    if(!userget.id){
        return{
            success: false,
            message: "Noget gik galt på serveren prøv igen"
        }
    }
    //start med at give useren køberens item
    const requestget = await fetcher("http://localhost:4000/api/v1/listings", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookieStore.get("sh_token").value

        },
        body: JSON.stringify({
            title: userListing.title,
            description: userListing.description,
            assetid: userListing.assetId,
            userid: requestListing.userId,
            categoryid: userListing?.categoryId ? userListing?.categoryId : 1


        })
    })
       if(!requestget.id){
        return{
            success: false,
            message: "Noget gik galt på serveren prøv igen"
        }
    }

    //nu skal vi delete de originale listings
    const deleteUserListing = await fetcher("http://localhost:4000/api/v1/listings/" + userListing.id, {
        method: "DELETE",
        headers: {
              "Authorization": "Bearer " + cookieStore.get("sh_token").value
        }
    }, true)

    if(!deleteUserListing.ok){
      return{
            success: false,
            message: "Listingen kunne ikke slettes"
        }
    }
     const deleteRequestListing = await fetcher("http://localhost:4000/api/v1/listings/" + requestListing.id, {
        method: "DELETE",
        headers: {
              "Authorization": "Bearer " + cookieStore.get("sh_token").value
        }
    }, true)

    if(!deleteRequestListing.ok){
      return{
            success: false,
            message: "Listingen kunne ikke slettes"
        }
    }
//her til sidst skal jeg også slette requesten

const deleteRequest = await fetcher("http://localhost:4000/api/v1/requests/" + requestId, {
    method: "DELETE", headers: {
        "Authorization": "Bearer "  + cookieStore.get("sh_token").value
    }
}, true)


    if(!deleteRequestListing.ok){
      return{
            success: false,
            message: "requesten kunne ikke slettes"
        }
    }
//her ti



revalidatePath('/profile/items/')
    return{
        success: true,
        message: "listingen er nu bytetet"
    }





}