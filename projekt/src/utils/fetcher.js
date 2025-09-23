export default async function fetcher(url, options = {}){



    try{
       
    const response = await fetch(url, options)

    
    if(!response.ok){
        //giv et objekt tilbage med info
        throw { error: new Error("status koden fejlede. status koden er: "+ response.status), status: response.ok,responseCode: response.status, reponseObject: response}
    }
    const data = await response.json()
    return data
    console.log(data)
}
catch(e){
   
   
    return e

}
   
    
}