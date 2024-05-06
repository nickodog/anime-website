/* eslint-disable @next/next/no-img-element */
import React from "react"
import { unknown } from "@/components/TopAnime";
import CharacterList from "@/components/AnimeCharacters";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import Link from "next/link";

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
    params: { id: number, charId: number;}
}) {
    const getData = async (url: string) => {
        const data = await fetch(url)
        return data.json()
    }
    const char = await getData(`https://api.jikan.moe/v4/characters/${params.charId}/full`);

    return (
    <div className="h-screen text-[#A7ADBB] flex flex-col md:flex-row">
        <div className="flex flex-wrap items-center">
                {char.data.anime.map((anime: {anime: {mal_id: number, title: string, images: {jpg: {image_url: string}}}}) => (
                                <Link key={anime.anime.mal_id} href={`/anime/${anime.anime.mal_id}`} className="w-fit mr-5">
                                    <div className="items-center">
                                        <div>
                                            <img className="rounded border-black border w-[100px] md:w-[150px] lg:w-[200px] mx-auto" alt="charImage" src={anime.anime.images.jpg.image_url} />
                                        </div>
                                        <div className="text-center">
                                            <h1>{anime.anime.title}</h1>
                                        </div>
                                    </div>
                                </Link>))}
            </div>
    </div>
    )
}