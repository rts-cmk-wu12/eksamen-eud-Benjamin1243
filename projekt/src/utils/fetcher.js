export default async function fetcher(url, options = {},notJson = false ){



    try{
       
    const response = await fetch(url, options)

    
    if(!response.ok){
        
        throw new Error("Reponset gik ikke godt. statuskoden er: " + response.status, {cause: {"reponseStatus": response.status}})
    }
    //hvis man ikke vil have json men bare response ud, kører denne if statement
    if(notJson){
        return response
    }
    //tjekker om det er json før at vi kører .json metoden 
     if(!response.headers.get("Content-Type", "application/json")){
        throw new Error("Den pågælende data er ikke json, den er istedet " + response.headers.get("Content-Type"), {cause: {"reponseStatus": 415}})
     }
    const data = await response.json()
    return data
    
}
catch(e){
    console.error(e)
  
    return {responseCode: e?.cause?.reponseStatus,
        message:e?.message
        
    }
   
   
   

}
   
    
}