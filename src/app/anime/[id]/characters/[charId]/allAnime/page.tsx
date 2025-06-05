/* eslint-disable @next/next/no-img-element */
import React from "react"
import Link from "next/link";
import { getData } from "@/components/getData";

export default async function AnimeInfo({ params }: {
    params: { id: number, charId: number;}
}) {
    const char = await getData(`https://api.jikan.moe/v4/characters/${params.charId}/full`);

    return (
        <div className="h-fit text-[#A7ADBB] flex flex-col md:flex-row text-center">
            <div>
            <h1>Animeography</h1>
            <br/>
            <div className="flex flex-wrap justify-center">
                    {char.data.anime.map((anime: {anime: {mal_id: number, title: string, images: {jpg: {image_url: string}}}}) => (
                                    <Link key={anime.anime.mal_id} href={`/anime/${anime.anime.mal_id}`} className="w-fit mr-5">
                                        <div className="mx-6 mb-4 inline-block max-w-max">
                                        <div className="max-w-[100px] md:max-w-[150px]">
                                            <img className="rounded border-black border w-full h-auto" alt="charImage" src={anime.anime.images.jpg.image_url} />
                                        </div>
                                        <div className="max-w-[100px] md:max-w-[150px] text-center">
                                            <h1>{anime.anime.title}</h1>
                                        </div>
                                    </div>
                                    </Link>))}
                </div>
        </div>
        </div>
    )
}