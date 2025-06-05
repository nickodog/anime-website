/* eslint-disable @next/next/no-img-element */
import React from "react"
import { unknown } from "@/components/TopAnime";
import CharacterList from "@/components/AnimeCharacters";
import { getData } from "@/components/getData";
import NumberDisplay from "@/components/BoxDisplay";
import BoxDisplay from "@/components/BoxDisplay";

export function formattingNumbers(num: number) {
    const str = `${num}`
    const array = str.split("")
    const newArray = []
    let newString = ""

    for (let i = array.length - 1; i >= 0; i--) {
        newArray.unshift(array[i]);
        if (((array.length - i) % 3 === 0) && ((array.length - i) < array.length)) {
            newArray.unshift(".");
        }
    }

    newArray.forEach(char => (
        newString += char
    ))
    return (newString)
}

export default async function AnimeInfo({ params }: {
    params: { id: number;}
}) {
    const data = await getData(`https://api.jikan.moe/v4/anime/${params.id}/full`);

    return (
        <div className="h-screen text-[#A7ADBB] flex flex-col md:flex-row">
            <div className="w-full md:w-fit h-fit ml-5 mt-2">
                <img className="w-full md:w-max h-max rounded border-[3px] border-black" src={data.data.images.jpg.large_image_url} alt="anime_image"></img>
            </div>
            <div className="w-full h-fit md:w-2/3 ml-6 mt-2">
                <h1 className="text-6xl">
                    {data.data.title}
                </h1>
                <h1 className="text-4x1">
                    {data.data.title_japanese}
                </h1>
                <br></br>
                <div className="flex w-full md:w-fit items-center">
                    <BoxDisplay label={`SCORE`} value={data.data.score}/>
                    <BoxDisplay label={`MEMBERS`} value={formattingNumbers(data.data.members)}/>
                    <BoxDisplay label={`EPISODES`} value={unknown(data.data.episodes, ``)}/>
                </div>
                <br />
                <div>
                    <h1 className="text-3xl">Characters</h1>
                    <CharacterList animeId={data.data.mal_id} limit={4}/>
                </div>
                <br />
                <div>
                    <h1 className="text-2xl">PV/Trailer</h1>
                    {data.data.trailer.embed_url === null ? (
                        <p className="mb-10">No trailer.</p>
                    ): (
                        <iframe src={data.data.trailer.embed_url} className="rounded mb-10" title="Trailer"/>
                    )}
                </div>
            </div>
        </div>
    )
}