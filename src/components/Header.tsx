'use client'

import React from "react";
import Link from "next/link";
import "./styles.css";
import { useState } from "react";

export const Header:React.FC = () => {
    const [ searchInput, setSearchInput ] = useState<boolean>(false);

    const handleVisibility = () => {
        setSearchInput(prev => !prev);
    };


    return(
        <div className="navbar bg-[#16191F] mb-3">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Home</a></li>
        <li><a>About</a></li>
        <li><a>Something</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">AnimeList</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link href="/">Home</Link></li>
      <li><Link href="/about">About</Link></li>
      <li><Link href="/">Contact</Link></li>
    </ul>
  </div>
  <div className="navbar-end">
    <button onClick={handleVisibility} className="btn btn-ghost btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
  </div>
  <aside className={`right-16 absolute ${searchInput ? "open" : "close"}`}>
    <input className="rounded" placeholder="Search..." type="text"></input>
  </aside>
</div>
    )
}