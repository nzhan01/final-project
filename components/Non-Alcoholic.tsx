"use client"
import {useEffect, useState} from "react";
import styled from "styled-components";


{/* Author: Nicholas Zhang
    Non-Alcoholic.tsx: Component used to fetch and display non-alcoholic beverages from the
    CocktailDB.
    This component is then imported into the page.tsx for the nonalcoholic route

    */}

//Styled Components!

const StyledContainer = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "EB Garamond";
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 20px;
`
const StyledImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 12px;
    flex-shrink: 0;
`

const StyledDrinkCard = styled.div`
    background-color: #f9d89c;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 20px;
    transition: transform 0.2s ease;
    width: 40%;
`

const StyledTitle = styled.h1`
    text-align: center;
    font-size: 2.5rem;
    color: #5c3d00;
    margin-bottom: 30px;`

const StyledDrinkTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: bold;
    color: #5c3d00;`

const StyledDrinkList = styled.div`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    align-items: center;

`

//data type of the info returned by API call
type cocktail = {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
};



export default function NonAlcoholic() {

    //keep track of drink data
    const[data, setData] = useState<cocktail[]>([]);

    //fetch data from API
    useEffect(()=> {

        async function fetchData(){

            //API url
            const rawData = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic");
            const json = await rawData.json();
            setData(json.drinks);
            console.log("these are the drinks: " + data);

        }
        //process data
        fetchData()
            .then(() => console.log("successfully fetched data"))
            .catch((e: Error)=> console.log("this was the error " +e));
    }, []);


    // use data.map and slice to display the first 20 drinks returned
    // displays the name and the corresponding image in a styled box
    return (
        <StyledContainer>
            <StyledTitle>Non-Alcoholic Drinks</StyledTitle>
            <StyledDrinkList>
                {data.slice(0,20).map((drink) => (
                    <StyledDrinkCard key={drink.idDrink}>
                        <StyledImage src={drink.strDrinkThumb} alt={drink.strDrink} width="100" />

                        <StyledDrinkTitle>{drink.strDrink}</StyledDrinkTitle>

                    </StyledDrinkCard>

                ))}
            </StyledDrinkList>

        </StyledContainer>

    )


}