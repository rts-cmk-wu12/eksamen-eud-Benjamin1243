"use server"

import fetcher from "@/utils/fetcher"
import { revalidatePath } from "next/cache"
import { cookies, headers } from "next/headers"
import z from "zod"

export default async function updateListingAction(prevstate, formData){
   const  {title, description, id, img, assetId} = Object.fromEntries(formData)
   

   const ListingScema = z.object({
       title: z.string("Det skal være tekst").min(1,"du skal skrive noget i titel"),
       description: z.string("det skal være tekst ").min(20,"Du skal skrive en detaljeret beskrivelse, på mindst 20 tegn")
     })

     const validatedListing = ListingScema.safeParse({
        title: title,
        description: description
     })

     if(!validatedListing.success){
          
             return{
                 success:validatedListing.success,
                 errors: z.treeifyError(validatedListing.error),
                 title: title,
                description: description
         
         
             }
         }


    const cookieStore = await cookies()


    //før vi fetcher data, skal vi tjekke om der er kommet et nyt billede ind , og oprette det som en asset
    let imgData;
    //da apiet, skal bruge formdata, laver jeg et nyt formdata objekt, hvo jeg kun har mit img i
    const formDataImg = new FormData()
    
    formDataImg.append("file", img)
   
    if(!img.size == 0){
        
         imgData = await fetcher("http://localhost:4000/api/v1/assets", {
            //da formdata automatsik tilføjer content type gennem browseren behøver jeg ikke at gøre det
            method: "POST", 
                headers: {
                   
                    "Authorization": "Bearer " +cookieStore.get("sh_token").value
                },
                body: formDataImg
        })
    }
   

        const jsonObject = JSON.stringify({
        title: validatedListing.data.title,
        description: validatedListing.data.description, 
        assetid: imgData ? imgData.id: assetId
    })

    const data = await fetcher("http://localhost:4000/api/v1/listings/" + id,{
        method: "PUT", 
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookieStore.get("sh_token").value
        },
        body: jsonObject
    })

  
   
    revalidatePath('/profile/items/update-item')
}