"use client";

import { useEffect, useState } from "react";

type CocktailType = {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
    strInstructions: string;
};

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
        <div>
            <h1>Random Drink Generator</h1>
            {cocktail ? (
                <div>
                    <h2>{cocktail.strDrink}</h2>
                    <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} width={200} />
                    <p>{cocktail.strInstructions}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <button onClick={fetchRandomCocktail}>Get Another Drink</button>
        </div>
    );
}
