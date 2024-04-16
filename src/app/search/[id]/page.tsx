/* eslint-disable @next/next/no-img-element */
import React from "react"
import Link from "next/link";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";
import { unknown } from "@/components/TopAnime";
import { ranking } from "@/components/TopAnime";

export default async function AnimeSearch({ params }: {
    params: { id: number }
}) {
    const getData = async () =>  {
        const data = await fetch(`https://api.jikan.moe/v4/anime?q=${params.id}`)
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
            if ((array.length - i) % 3 === 0) {
                newArray.unshift(".");
            }
        }

        newArray.map(char => (
            newString += char
        ))
        return(newString)
    }

    return (
        <div className="my-10">
            {data.data.map((anime: { mal_id: React.Key | null | undefined; images: { jpg: { large_image_url: string | undefined; }; }; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; episodes: string | number | null | undefined; status: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; score: string | number | null | undefined; popularity: any; }) => (
                <Link key={anime.mal_id} href={`/anime/${anime.mal_id}`} className="w-full min-h-[600px] border-2 mb-10 rounded border-black flex">
                        <div className="w-max">
                            <img className="rounded border-0 h-fit" src={anime.images.jpg.large_image_url} alt="anime poster" />
                        </div>
                        <div className="ml-2 mt-1 mr-2">
                            <p className="text-5xl">
                                {anime.title}
                            </p>
                            <p className="text-4xl">{unknown(anime.episodes, " episodes")}</p>
                            <p className="text-4xl">{anime.status}</p>
                            <p className="text-4xl">{unknown(anime.score, " /10")}</p>
                            <p className="text-4xl">{ranking(anime.popularity)}</p>
                        </div>
                </Link>
            ))}
        </div>
    );
}