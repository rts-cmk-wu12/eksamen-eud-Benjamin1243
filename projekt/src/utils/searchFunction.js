export default function searchFunction(items, serachConent){
    let sortedData = items?.filter((activity)=>{
       
        const titles = activity?.title?.split(" ")
        
        const splittetTitles =titles?.filter((title)=>{
          if(title.substring(0,serachConent.length).toLowerCase() ==serachConent.toLowerCase()){
            return title
          }
        })
        if(splittetTitles?.length > 0){
          return activity
        }
        
        
       
        
        
      
      })

      return sortedData
}