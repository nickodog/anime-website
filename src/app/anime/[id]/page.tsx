import React from "react"
import Link from "next/link";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";
import { unknown } from "@/components/TopAnime";

export default async function AnimeInfo({ params }: {
    params: { id: number }
}) {
    const getData = async () =>  {
        const data = await fetch(`https://api.jikan.moe/v4/anime/${params.id}/full`)
        return data.json()
    }
    const data = await getData();


    function members(){
        const str = `${data.data.members}`
        const array = str.split("")
        const newArray = []
        let newString = ""

        for (let i = array.length - 1; i >= 0; i--) {
            newArray.unshift(array[i]); // Push the current element from the original array to the beginning of the new array
        
            // If the current index plus one is divisible by 3 (i.e., every third element)
            if (((array.length - i) % 3 === 0) && ((array.length - i) < array.length)) {
                    newArray.unshift(".");
                }
            }

        newArray.map(char => (
            newString += char
        ))
        return(newString)
    }

    return(
        <div className="h-screen text-[#A7ADBB] flex">
            <div className="w-fit h-fit ml-5 mt-2 rounded border-[3px] border-black">
                <img className="w-max h-max" src={data.data.images.jpg.large_image_url} alt="penis"></img>
            </div>
            <div className="w-2/3 ml-6 mt-2">
                <h1 className="text-6xl">
                    {data.data.title}
                </h1>
                <h1 className="text-4x1">
                    {data.data.title_japanese}
                </h1>
                <br></br>
                <div className="flex">
                    <div className="w-fit">
                        <div className="border-x-2 border-t-2 text-2xl sticky text-center w-full rounded-t border-[#A7ADBB] text-[#A7ADBB]">
                            <p className="px-3">SCORE</p>
                        </div>
                        <div className="text-3xl border-x-2 border-b-2 border-[#A7ADBB] text-center bg-[#A7ADBB] text-black rounded-b">
                            <p>{unknown(data.data.score, "")}</p>
                        </div>
                    </div>
                    <div className="w-fit mx-8">
                        <div className="border-x-2 border-t-2 text-2xl sticky text-center w-full rounded-t border-[#A7ADBB] text-[#A7ADBB]">
                            <p className="px-3">MEMBERS</p>
                        </div>
                        <div className="text-3xl border-x-2 border-b-2 border-[#A7ADBB] text-center bg-[#A7ADBB] text-black rounded-b">
                            <p>{members()}</p>
                        </div>
                    </div>
                    <div className="w-fit">
                        <div className="border-x-2 border-t-2 text-2xl sticky text-center w-full rounded-t border-[#A7ADBB] text-[#A7ADBB]">
                            <p className="px-3">EPISODES</p>
                        </div>
                        <div className="text-3xl border-x-2 border-b-2 border-[#A7ADBB] text-center bg-[#A7ADBB] text-black rounded-b">
                            <p>{unknown(data.data.episodes, "")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}