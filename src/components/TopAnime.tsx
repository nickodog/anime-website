/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

interface Anime {
    popularity: number | undefined;
    mal_id: number | undefined; // Changed Key to numhttps://github.com/nickodogber since mal_id is a number
    images: { jpg: { large_image_url: string } };
    title: string | undefined;
    episodes: number | undefined;
    status: string | undefined;
    score: number | undefined;
    rank: number | undefined;
}

const getData = async (): Promise<{ data: Anime[] }> => {
    const data = await fetch(`https://api.jikan.moe/v4/top/anime?filter=airing`);
    return data.json();
};

export function unknown(param: undefined | string | number | null, rest: string): string {
    if (param === null) {
        return "Unknown" + rest;
    } else {
        return param + rest;
    }
}

export function ranking(popularity: number | null | undefined){
    if (popularity !== null) {
    switch (popularity) {
        case 1: return popularity + "st Most Popular"
        case 2: return popularity + "nd Most Popular"
        case 3: return popularity + "rd Most Popular"
        default: return popularity + "th Most Popular"
    }}else return "Unknown"
}

export default async function TopAnime(): Promise<React.JSX.Element> {
    const { data } = await getData();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10 pb-10 ml-14">
            {data.map((anime) => (
                <Link key={anime.mal_id} href={`/anime/${anime.mal_id}`} className="max-w-96 border-2 rounded border-black flex mb-10">
                        <div className="w-max">
                            <img className="rounded border-0 h-full max-w-32" src={anime.images.jpg.large_image_url} alt="anime poster" />
                        </div>
                        <div className="ml-2 mt-1 mr-2">
                            <p className="text-6x1">{anime.title}</p>
                            <p>{unknown(anime.episodes, " episodes")}</p>
                            <p>{anime.status}</p>
                            <p>{anime.score}/10</p>
                            <p>{ranking(anime.popularity)}</p>
                        </div>
                </Link>
            ))}
        </div>
    );
};