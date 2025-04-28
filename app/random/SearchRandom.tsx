"use client";
import Cocktail from "../../components/Cocktail";
import {CocktailType} from "@/types";

import { useEffect, useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 50%;
  padding: 20px;
  margin: 50px auto;
  text-align: center;
`;

const StyledButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #45a049;
  }
`;

export default function DrinkGenerator() {
    const [cocktail, setCocktail] = useState<CocktailType | null>(null);

    async function fetchRandomCocktail() {
        try {
            const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
            const { drinks } = await response.json();
            setCocktail(drinks[0]);
        } catch (error) {
            console.error("Failed to fetch cocktail:", error);
        }
    }

    useEffect(() => {
        fetchRandomCocktail();
    }, []);

    return (
        <Card>
            <h1>Random Drink Generator</h1>
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
