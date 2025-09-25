"use server"
import fetcher from "@/utils/fetcher"
import { cookies, headers } from "next/headers"
import z, { file, success } from "zod"
export default async function registerNewListingAction(prevstate, formData){
    const {title, description, img} = Object.fromEntries(formData)
    console.log(title)

    const RegisterListing = z.object({
        title: z.string("det skal være tekst").min(2,"titlen kan ikke være et tegn"),
        description: z.string("det skal være tekst").min(20, "du skal skrive en detajeret beskrivelse på mindst 20 tegn"),
        img: z.file().max(3_000_000, "din fil må ikke være størrer end 3mb").mime(["image/png", "image/jpeg","image/jpg","image/webp" ], "din fil skal være af typen, png, jpeg, eller jpg")
    })

    const validatedRegisterListing = RegisterListing.safeParse({
        title: title,
        description: description, 
        img: img
    })
    if(!validatedRegisterListing.success){
         
           return{
          success: validatedRegisterListing.success,
          errors: z.treeifyError(validatedRegisterListing.error),
          title: title,
          description: description,
          
           }
        }
        //Hvis validering går godt, skal image sendes ind
    const cookieStore = await cookies()
const imgFormData = new FormData()
imgFormData.append("file", validatedRegisterListing.data.img)
const asset = await fetcher("http://localhost:4000/api/v1/assets",{
    method: "POST",
    headers: {
        "Authorization": "Bearer " + cookieStore.get("sh_token").value
    },
    body: imgFormData
})
if(!asset.id){
return{
    success: false,
         errors: {properties:{ all: ["Der skete en fejl på serveren...prøv igen"]}},
          title: title,
          description: description,

}
}
const jsonData = JSON.stringify({
    title:  validatedRegisterListing.data.title,
    description: validatedRegisterListing.data.description,
    assetid: asset.id,
    userid: cookieStore.get("user_id").value,
    categoryid: 1,
})
const listing = await fetcher("http://localhost:4000/api/v1/listings", {
    method: "POST", headers:{
         "Authorization": "Bearer " + cookieStore.get("sh_token").value,
         "Content-Type": "application/json"
    },
    body: jsonData
})

console.log(listing)


return({
    success: true,
    id: listing.id
})





}