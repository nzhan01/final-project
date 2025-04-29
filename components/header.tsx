"use client"
import Link from "next/link";
import styled from "styled-components";

const StyledTitle = styled.h1`
    color: black;
    background-clip: text;
    padding: 2%; 
    text-align: center;
    font-weight: bolder;
    font: calc(7px + 3vw) "lora";
`
const StyledLink = styled.a`
    font: calc(3px + 1.3vw) "lora";
    margin: 0 2%; 
    &:hover {
        text-decoration: underline;
    }
`;

const StyledNav = styled.nav`
    text-align: center;
    padding-bottom: 1%; 
`

const StyledHeader = styled.header`
    background-color: #FAD59A; 
`;

export default function Header() {
    return(
        <StyledHeader>
            <Link href ="/">
                <StyledTitle>Date Night Drink Generator</StyledTitle>
            </Link>
            <StyledNav>
                <StyledLink href ="/">
                    Search
                </StyledLink>
                <StyledLink href="/random">
                    Random
                </StyledLink>
                <StyledLink href="/about">
                    About
                </StyledLink>
            </StyledNav>
        </StyledHeader>
    );
}