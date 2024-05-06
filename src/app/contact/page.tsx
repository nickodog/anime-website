/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { FaSquareGithub } from "react-icons/fa6";

const Contact = () => {
    return(
        <div className="text-center h-screen justify-center text-[#A7ADBB]">
            <h1>Thank you for visiting!</h1>
            <h2>Here you'll find all the ways to contact me about bugs or suggestions that you feel would make the website better!</h2>
            <div className="flex justify-center mr-80">
                <a className="flex" href="https:/github.com/nickodog">
                    Github<FaSquareGithub className="self-center"></FaSquareGithub>
                </a>
            </div>
            
        </div>
    );
};

export default Contact;