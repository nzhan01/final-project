// Author: Chih-Hsuan (Cindy) Lin
// SearchRandom.tsx: Fetches and displays a random cocktail from the CocktailDB API with an option to get a new drink.

// Enable client-side rendering
"use client";

// Import the Cocktail display component and the CocktailType definition
import Cocktail from "../../components/Cocktail";
import {CocktailType} from "@/types";

import { useEffect, useState } from "react";
import styled from "styled-components";

// Styled components
const Card = styled.div`
  background-color: #FAD59A;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 50%;
  padding: 20px;
  margin: 50px auto;
  text-align: center;
`;

const StyledButton = styled.button`
  margin-top: 20px;
  font: calc(5px + 1vw) "lora";  
  padding: 10px 20px;
  background-color: #E9A319;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #A86523;
  }
`;

export default function DrinkGenerator() {
    // State to store the randomly fetched cocktail
    const [cocktail, setCocktail] = useState<CocktailType | null>(null);

    // Fetch a random cocktail from CocktailDB API
    async function fetchRandomCocktail() {
        try {
            const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
            const { drinks } = await response.json();
            setCocktail(drinks[0]);
        } catch (error) {
            console.error("Failed to fetch cocktail:", error);
        }
    }

    // Fetch a drink
    useEffect(() => {
        fetchRandomCocktail();
    }, []);

    return (
        <Card>
            {cocktail ? (
                <div>
                    <Cocktail data={[cocktail]}/>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <StyledButton onClick={fetchRandomCocktail}>
                Get Another Drink
            </StyledButton>
        </Card>
    );
}
