"use client";
// logic is fully client side

import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

// STYLED - COMPONENTS

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
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
// TYPE DEFINITIONS
type Drink = {
    id: string;
    name: string;
    image: string;
};
// this is where we define favoriteDrinks with the name, ID, and images that are soon to be rendered
const favoriteDrinks: Drink[] = [
    { id: "17196", name: "Cosmopolitan", image: "https://www.thecocktaildb.com/images/media/drink/kpsajh1504368362.jpg" },
    { id: "17212", name: "Espresso Martini", image: "https://www.thecocktaildb.com/images/media/drink/n0sx531504372951.jpg" },
    { id: "12156", name: "Screwdriver", image: "https://www.thecocktaildb.com/images/media/drink/8xnyke1504352207.jpg" },
    { id: "17193", name: "French 75", image: "https://www.thecocktaildb.com/images/media/drink/rptuxy1472669372.jpg" },
    { id: "11690", name: "Mai Tai", image: "https://www.thecocktaildb.com/images/media/drink/twyrrp1439907470.jpg" },
];
// ABOUT PAGE COMPONENTS

/* React Router was used for navigation; it maintains a state object called instructions which stores cocktail instructions
 indexed by ID number
 use router allows you to send the user back to the desired page for our back to home button*/
export default function AboutPage() {
    const router = useRouter();
    /* the useState hook we learned in class
    * we are using it to store instructions for each drink, starts off initially as empty */
    const [instructions, setInstructions] = useState<{ [key: string]: string }>({});
    /* function is triggered whenever someone clicks on a drink and the id is the unique ID used in the API */
    const handleDrinkClick = async (id: string) => {
        /* whe the instructions have already been fetched, this removes them from the state to toggle it off
        * and the instructions are hidden now after another click*/
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
            /* this is the GET request to the cocktailDB API and fetches cocktail w specific id*/
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
            const data = await response.json();
            /* this line access the english instructions after we get the full JSON result from the line above of an array of drink objects from the API
            * it accesses the first and only drink in the array and if there isn't any instructions then ... */
            const drinkInstructions = data.drinks?.[0]?.strInstructions || "No instructions available.";
            /* function from useState that updates my instruction state
            * copy all the previous instructions with ...prev and then add new drinks instructions under its ID key
            * when someone clicks multiple drinks all the fetched instructions stay saved and dont dissapear*/
            setInstructions((prev) => ({
                ...prev,
                [id]: drinkInstructions,
            }));
        } catch (error) {
            console.error("Failed to fetch drink instructions:", error);
        }
    };
// PAGE LAYOUT
    return (
        <PageWrapper>
            <Title> About Our Project</Title>

            <Section>
                <p>Welcome to our CS391 Final Project! We created a Cocktail Generator and Search app that lets you discover new drinks.</p>
                <p>Every cocktail includes instructions in English, Spanish, and French (when available).</p>
                <p>Our project is powered by the free  <Highlight>Cocktail DB API</Highlight></p>
            </Section>

            <SubTitle> Our Favorite Drinks</SubTitle>

            <DrinksGrid>
                {/*this loops through favoriteDrinks and for each drink displays the image, name, and adds a click handler so that instructions are fetched and shown */}
                {favoriteDrinks.map((drink) => (
                    <DrinkCard key={drink.id} onClick={() => handleDrinkClick(drink.id)}>
                        <DrinkImage src={drink.image} alt={drink.name} />
                        <DrinkName><strong>{drink.name}</strong></DrinkName>
                        {instructions[drink.id] && <Instructions>{instructions[drink.id]}</Instructions>}
                    </DrinkCard>
                ))}
            </DrinksGrid>
            {/* this button uses the router hook from the beginning to send the user to the homepage "/" when click*/}
            <StyledButton onClick={() => router.push("/")}>
                Back to Home
            </StyledButton>
        </PageWrapper>
    );
}

