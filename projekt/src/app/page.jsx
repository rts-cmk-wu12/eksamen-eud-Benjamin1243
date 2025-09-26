import SearchComponent from "@/components/searchComponent/SearchComponent";
import SimpleFilterList from "@/components/simpleFilterList/SimpleFilterList";
import Image from "next/image";
import "./main.scss"
import ListingComponent from "@/components/listingListComponent/ListingListComponent";
import ListingPageContent from "@/components/listingPageContent/ListingPageContent";


export default function Home() {
  return (
    <>
    <h1 style={{display:"none"}}>SwapHub</h1>
        <ListingPageContent></ListingPageContent>
        </>
     )
}


 