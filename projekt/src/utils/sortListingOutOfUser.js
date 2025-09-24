export default function sortListingOutOfUser(userId, data, currentId){
console.log("Hehrher")
let has = true
let sorted = data?.filter((listing)=>{
    
    if(listing.userId == userId){
        if(listing.id != currentId)
        return listing
    }
})
//hvis arrayet er tomt viser den istedet bare 3 random listings
console.log(sorted?.length)

const min = Math.floor(Math.random() * data?.length -1);
const max = min + 3
if(sorted?.length == 0){
    has = false
    sorted = data?.filter((listing,index)=>{
        if( index >= min && index < max){
            return listing
        }
    })
}
return {has: has, data: sorted}
}