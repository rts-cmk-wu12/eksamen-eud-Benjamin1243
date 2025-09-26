export default function ascendOrDescend(searhState, order){
    return searhState.sort((itemA, itemB)=>{
            console.log("Den er kørt sorten altså")
            //nu har vi fat i item så skal vi bare sorte
            const itemADate = itemA.createdAt?.split("T")[0].split("-")[2]
             const itemBDate =itemB.createdAt.split("T")[0].split("-")[2]
             if( order.descend == true){
            
            if(itemADate > itemBDate){
                return -1
            }else if(itemADate < itemBDate)
             return 1
            }else{
                return itemADate - itemBDate
            }
         })
       
}