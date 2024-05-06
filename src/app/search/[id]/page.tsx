/* eslint-disable @next/next/no-img-element */
import React from "react"
import Link from "next/link";
import { unknown, ranking } from "@/components/TopAnime"; // Importing ranking function directly

export default async function AnimeSearch({ params }: {
    params: { id: number }
}) {
    const getData = async () =>  {
        const data = await fetch(`https://api.jikan.moe/v4/anime?q=${params.id}`)
        return data.json()
    }
    const data = await getData();
    let dataType = true

    function members(){
        const str = `${data.data.members}`
        const array = str.split("")
        const newArray = []
        let newString = ""

        for (let i = array.length - 1; i >= 0; i--) {
            newArray.unshift(array[i]);
            if ((array.length - i) % 3 === 0) {
                newArray.unshift(".");
            }
        }

        newArray.forEach(char => (
            newString += char
        ))
        return(newString)
    }

    function dataCheck(){
        if (data.data.length === 0){
            return(dataType = false)
        }else{
            return(dataType = true)
        }
    }

    dataCheck()

    return (
        <div className="my-10">
            {dataType ? (
                data.data.map((anime: { mal_id: number | null | undefined; images: { jpg: { large_image_url: string | undefined; }; }; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; episodes: string | number | null | undefined; status: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; score: string | number | null | undefined; popularity: any; }) => (
                    <Link key={anime.mal_id} href={`/anime/${anime.mal_id}`} className="border-2 mb-10 min-h-[400px] rounded border-black flex">
                        <div className="flex flex-col sm:flex-row">
                            <img className="rounded border-0 min-w-[300px] h-auto sm:w-48 sm:h-auto" src={anime.images.jpg.large_image_url} alt="anime poster" />
                            <div className="ml-2 mt-1 mr-2">
                                <p className="text-5xl">
                                    {anime.title}
                                </p>
                                <p className="text-4xl">{unknown(anime.episodes, " episodes")}</p>
                                <p className="text-4xl">{anime.status}</p>
                                <p className="text-4xl">{unknown(anime.score, " /10")}</p>
                                <p className="text-4xl">{ranking(anime.popularity)}</p>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <div className="text-center">
                    <h1>There was no results for this search. See if you typed everything correctly.</h1>
                </div>
            )
        }
            
        </div>
    );
}
