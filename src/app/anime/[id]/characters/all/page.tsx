/* eslint-disable @next/next/no-img-element */
import React from "react"
import { unknown } from "@/components/TopAnime";
import CharacterList from "@/components/AnimeCharacters";
import { FaRegArrowAltCircleRight } from "react-icons/fa";


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
    const getData = async (url: string) => {
        const data = await fetch(url)
        return data.json()
    }
    const data = await getData(`https://api.jikan.moe/v4/anime/${params.id}/full`);

    return (
        <div className="h-screen text-[#A7ADBB] flex flex-col md:flex-row">
            <div>
                <h1 className="text-3xl pl-4">Characters</h1>
                <CharacterList animeId={data.data.mal_id} limit={0}/>
            </div>
        </div>
    )
}