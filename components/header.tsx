"use client"
//import Link from "next/link";
import styled from "styled-components";


{/*
Author: Nicholas Zhang
Header.tsx: Component that serves as the header that displays at the top of every page.
Uses links to allowing users to navigate between pages of the application

*/}


//Styled Components

const StyledLink = styled.a`
    font: calc(3px + 1.3vw) "lora";
    margin: 0 2%; 
    &:hover {
        text-decoration: underline;
    }
`;

const StyledH1 = styled.h1`
    color: black;
    background-clip: text;
    padding: 2%;
    font-weight: bolder;
    font: calc(7px + 3vw) "lora";
    display: flex; 
    justify-content: center;
`;

const StyledNav = styled.nav`
    text-align: center;
    padding-bottom: 1%; 
`

const StyledHeader = styled.header`
    background-color: #FAD59A; 
`;


{/*
 Main function with header and different links to the different pages
 */}
export default function Header() {
    return(
        <StyledHeader>
            <StyledH1>
                Date Night Drink Generator
            </StyledH1>
            <StyledNav>
                <StyledLink href ="/">
                    Search
                </StyledLink>
                <StyledLink href="/random">
                    Random
                </StyledLink>
                <StyledLink href="/nonalcoholic">
                    Non-Alcoholic
                </StyledLink>

                <StyledLink href="/about">
                    About
                </StyledLink>
            </StyledNav>
        </StyledHeader>
    );
}