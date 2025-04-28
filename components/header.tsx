"use client"
import Link from "next/link";
//background-image: linear-gradient(to top,  #D62828, #F77F00,#FCBF49,#EAE2B7



import styled from "styled-components";

//https://stackoverflow.com/questions/8384751/css-text-gradient
const StyledTitle = styled.h2`
    
    background-image: linear-gradient(to top,  #D62828, #F77F00,#FCBF49);
    color: transparent;
    background-clip: text;
    padding: 0.5vh;
    font-size: calc(15px + 2vh);
    font-weight: bold;
    
`
export default function Header() {
    const linkStyling = " p-2 m-5 text-2xl hover:underline"
    return(
        <header className="flex justify-between items-center h-20 p-2">
            <Link href ="/">
                <StyledTitle>CS391 Final Project Cocktail App</StyledTitle>
            </Link>

            <nav>
                <Link href ="/" className ={linkStyling}>
                    Search
                </Link>
                <Link href="/random" className = {linkStyling}>
                    Random
                </Link>
                <Link href="/about" className = {linkStyling}>
                    About
                </Link>
            </nav>
        </header>
    );
}