/* eslint-disable @next/next/no-img-element */
import React from "react"
import CharacterList from "@/components/AnimeCharacters";

export default async function AnimeInfo({ params }: {
    params: { id: number;}
}) {
    const getData = async (url: string) => {
        const data = await fetch(url)
        return data.json()
    }
    const data = await getData(`https://api.jikan.moe/v4/anime/${params.id}/full`);

    return (
        <div className="h-fit text-[#A7ADBB] flex flex-col md:flex-row">
            <div>
                <h1 className="text-3xl pl-4 text-center mb-4">Characters</h1>
                <CharacterList animeId={data.data.mal_id} limit={0}/>
            </div>
        </div>
    )
}