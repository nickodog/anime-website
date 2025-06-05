/* eslint-disable @next/next/no-img-element */
'use server'
import React from "react"
import { formattingNumbers } from "../../page";
import { ShowMore } from "@/components/ShowMore";
import Link from "next/link";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { getData } from "@/components/getData";
import BoxDisplay from "@/components/BoxDisplay";


export default async function AnimeInfo({ params }: {
    params: { id: number; charId: number;}
}) {
    const char = await getData(`https://api.jikan.moe/v4/characters/${params.charId}/full`);

    function ArrayPrint(){
        let formattedNicknames = ""
        if (char.data.nicknames.length === 0) {
            return ("No AKAs")
        }else{
            for (let i=0; i < char.data.nicknames.length; i++) {
                if (i === char.data.nicknames.length - 1) {
                    formattedNicknames += char.data.nicknames[i]
                }else{
                    formattedNicknames += `${char.data.nicknames[i]}, `
                }
            }
            return(formattedNicknames)
        }
    }

    function aboutCheck(){
        if (char.data.about === null){
            return false
        }else return true   
    }
    
    return(
        <div className="text-[#A7ADBB] flex flex-col md:flex-row ml-6">
            <div className="w-full md:w-auto h-auto mx-auto md:mx-0 mt-2">
                <img className="w-full h-auto rounded border-[3px] border-black" src={char.data.images.jpg.image_url} alt="anime_image"></img>
            </div>
            <div className="w-fit md:w-2/3 ml-6 mt-2">
                <div className="sm:flex">
                    <div>
                        <h1 className="text-6xl">
                            {char.data.name}
                        </h1>
                        <h1 className="text-2xl">
                            {char.data.name_kanji}
                        </h1>
                        <h1 className="text-4x1">
                            Aka: {ArrayPrint()}
                        </h1>
                    </div>
                    <div className="ml-4">
                    <BoxDisplay label={`FAVORITES`} value={formattingNumbers(char.data.favorites)}/>
                    </div>
                </div>
                <br />
                <div>
                    {aboutCheck() ? (
                        <ShowMore text={char.data.about.split('\n')}/>
                    ) : (
                        <p>No About.</p>
                    )}
                        
                </div>
                
                <br />
                <div>
                    <h1>Animeography</h1>
                    <div className="w-auto flex flex-wrap">
                        {char.data.anime.length > 10 ? (
                            <>
                                {char.data.anime.slice(0,4).map((anime: {anime: {mal_id: number, title: string, images: {jpg: {image_url: string}}}}) => (
                                    <Link key={anime.anime.mal_id} href={`/anime/${anime.anime.mal_id}`} className="w-fit mr-5">
                                        <div className="mx-6 mb-4 inline-block max-w-max">
                                            <div className="max-w-[100px] md:max-w-[150px]">
                                                <img className="rounded border-black border w-[100px] md:w-[150px] lg:w-[200px] mx-auto" alt="charImage" src={anime.anime.images.jpg.image_url} />
                                            </div>
                                            <div className="max-w-[100px] md:max-w-[150px] text-center">
                                                <h1>{anime.anime.title}</h1>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                                <Link href={`/anime/${params.id}/characters/${params.charId}/allAnime`} className="rounded-full mt-14 h-fit text-6xl transition duration-150 ease-in-out active:translate-y-1 active:shadow-md shadow-black" title="Show More"><FaRegArrowAltCircleRight/></Link>
                            </>
                        ) : (
                            char.data.anime.map((anime: {anime: {mal_id: number, title: string, images: {jpg: {image_url: string}}}}) => (
                                <Link key={anime.anime.mal_id} href={`/anime/${anime.anime.mal_id}`} className="w-fit mr-5">
                                    <div className="mx-6 mb-4 inline-block max-w-max">
                                        <div className="max-w-[100px] md:max-w-[150px]">
                                            <img className="rounded border-black border w-[100px] md:w-[150px] lg:w-[200px] mx-auto" alt="charImage" src={anime.anime.images.jpg.image_url} />
                                        </div>
                                        <div className="max-w-[100px] md:max-w-[150px] text-center">
                                            <h1>{anime.anime.title}</h1>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
                <br />
                <div>
                </div>
            </div>
        </div>
    )}