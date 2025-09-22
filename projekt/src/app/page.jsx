import SearchComponent from "@/components/searchComponent/SearchComponent";
import SimpleFilterList from "@/components/simpleFilterList/SimpleFilterList";
import Image from "next/image";
import "./main.scss"
import ListingComponent from "@/components/listingComponent/ListingComponent";


export default function Home() {
  return (
 <div className="listing">
  <div className="listing__topbar">
    <SearchComponent></SearchComponent>
    <SimpleFilterList elements={["Ascend by date", "Descend by date"]}></SimpleFilterList>

  </div>
  <ListingComponent></ListingComponent>
 </div>
     )
}
