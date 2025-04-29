"use client";

import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(to bottom, #fff7e6, #fad59a);
    min-height: 100vh;
    padding: 2rem;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 2rem;
    color: #e9a319;
    font-family: "Lora", serif;
`;

const Section = styled.div`
    max-width: 700px;
    font-size: 1.2rem;
    color: #555;
    margin-bottom: 4rem;
    line-height: 1.6;
    font-family: "Lora", serif;
`;

const Highlight = styled.span`
    font-weight: bold;
    color: #e9a319;
`;

const SubTitle = styled.h2`
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: #e9a319;
    font-family: "Lora", serif;
`;

const DrinksGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
`;

const DrinkCard = styled.div`
    background-color: #fad59a;
    border-radius: 16px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    transition: transform 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
    }
`;

const DrinkImage = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 12px;
    object-fit: cover;
    margin-bottom: 1rem;
`;

const DrinkName = styled.p`
    font-size: 1.2rem;
    font-family: "Lora", serif;
    color: #333;
`;

const Instructions = styled.p`
    margin-top: 1rem;
    font-size: 1rem;
    color: #444;
    font-family: "Lora", serif;
`;

const StyledButton = styled.button`
  margin-top: 3rem;
  font: calc(5px + 1vw) "Lora", serif;
  padding: 10px 20px;
  background-color: #e9a319;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cc8c14;
  }
`;

type Drink = {
    id: string;
    name: string;
    image: string;
};

const favoriteDrinks: Drink[] = [
    { id: "17196", name: "Cosmopolitan", image: "https://www.thecocktaildb.com/images/media/drink/kpsajh1504368362.jpg" },
    { id: "17212", name: "Espresso Martini", image: "https://www.thecocktaildb.com/images/media/drink/n0sx531504372951.jpg" },
    { id: "12156", name: "Screwdriver", image: "https://www.thecocktaildb.com/images/media/drink/8xnyke1504352207.jpg" },
    { id: "17193", name: "French 75", image: "https://www.thecocktaildb.com/images/media/drink/rptuxy1472669372.jpg" },
    { id: "11690", name: "Mai Tai", image: "https://www.thecocktaildb.com/images/media/drink/twyrrp1439907470.jpg" },
];

export default function AboutPage() {
    const router = useRouter();
    const [instructions, setInstructions] = useState<{ [key: string]: string }>({});

    const handleDrinkClick = async (id: string) => {
        if (instructions[id]) {
            // If already fetched, toggle it
            setInstructions((prev) => {
                const updated = { ...prev };
                delete updated[id];
                return updated;
            });
            return;
        }

        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
            const data = await response.json();
            const drinkInstructions = data.drinks?.[0]?.strInstructions || "No instructions available.";
            setInstructions((prev) => ({
                ...prev,
                [id]: drinkInstructions,
            }));
        } catch (error) {
            console.error("Failed to fetch drink instructions:", error);
        }
    };

    return (
        <PageWrapper>
            <Title>🍹 About Our Project</Title>

            <Section>
                <p>Welcome to our CS391 Final Project! We created a fun and interactive Cocktail Generator and Search app that lets you discover new drinks or find your favorite ones.</p>
                <p>Every cocktail includes instructions in English, Spanish, and French (when available), making it accessible for a global audience.</p>
                <p>Our project is powered by the free and publicly available <Highlight>Cocktail DB API</Highlight>, which provides all the recipes and images you see throughout the site.</p>
            </Section>

            <SubTitle>🍸 Our Favorite Drinks</SubTitle>

            <DrinksGrid>
                {favoriteDrinks.map((drink) => (
                    <DrinkCard key={drink.id} onClick={() => handleDrinkClick(drink.id)}>
                        <DrinkImage src={drink.image} alt={drink.name} />
                        <DrinkName><strong>{drink.name}</strong></DrinkName>
                        {instructions[drink.id] && <Instructions>{instructions[drink.id]}</Instructions>}
                    </DrinkCard>
                ))}
            </DrinksGrid>

            <StyledButton onClick={() => router.push("/")}>
                Back to Home
            </StyledButton>
        </PageWrapper>
    );
}

