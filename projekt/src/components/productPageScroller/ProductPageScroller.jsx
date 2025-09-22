"use client"
import { useEffect, useState } from "react"
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import "./productPageScroller.scss"

export default function ProductPageScroller({ max, setState, values }) {

    const [counter, setCounter] = useState(1)
    const [actualProducts, setActualProducts] = useState()
    //pages arary bruges til at mappe talene ud senere
    const pagesArray = []
    //genere en int type variabel med antal pages som value
    const pages = Math.ceil(Number(values?.length) / Number(max))
    //laves til array så det kan mappes ud nede i min jsx
    for (let i = 1; i <= pages; i++) {
        pagesArray[i] = i
    }


    function pageScrollHander(caseword, page) {
        //da jeg havde problemmer med state opdatering gemte jeg det i en funktion scoped variabel isetdet
        let count = counter
        switch (caseword) {

            case "next": {

                count++
                if (count > pages) {
                    count = pages
                }

                break;
            }
            case "back": {
                count--

                if (count - 1 <= 0) {
                    count = 1
                }




                break;

            }
            case "custom": {
                count = page
            }

        }
        setState(values?.filter((value) => value.id > (count - 1) * 6 && value.id <= (count) * 6))
        setCounter(count)



    }



    //sæt første 6 values ind i state
    useEffect(() => {
        setState(values?.filter((value) => value.id <= 6))


    }, [values])



    return (
        <div className="productPageScroller">
            <button onClick={() => { pageScrollHander("back") }} className="productPageScroller__textButton">
                <FaArrowLeft className="productPageScroller__icon" />
                Previous
            </button>
            {pagesArray.map((page) => {
                return (
                    <button onClick={() => { pageScrollHander("custom", page) }} className={counter == page ? "productPageScroller__button productPageScroller__button--active" : "productPageScroller__button"}>
                        {page}


                    </button>
                )
            })}

            <button onClick={() => { pageScrollHander("next") }} className="productPageScroller__textButton">

                Next
                <FaArrowRight />

            </button>



        </div>


    )
}