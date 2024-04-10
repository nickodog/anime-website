import React from "react"
import Link from "next/link";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";

export default async function AnimeInfo({ params }: {
    params: { id: number }
}) {
    const getData = async () =>  {
        const data = await fetch(`https://api.jikan.moe/v4/anime/${params.id}/full`)
        return data.json()
    }
    const data = await getData();
    return(
        <div className="h-screen text-[#A7ADBB] flex space-x-4 space-y-2">
            <div className="w-fit h-fit ml-5 mt-2">
                <img className="w-max h-max" src={data.data.images.jpg.large_image_url} alt="penis"></img>
            </div>
            <div className="w-2/3">
                <h1 className="text-7xl">
                    {data.data.title}
                </h1>
            </div>
        </div>
    ) 
}