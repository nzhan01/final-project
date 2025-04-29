"use client"
import {useEffect, useState} from "react";
import styled from "styled-components";


const StyledContainer = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
`



type cocktail = {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
};



export default function NonAlcoholic() {
    const[data, setData] = useState<cocktail[]>([]);

    useEffect(()=> {

        async function fetchData(){

            const rawData = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic");
            const json = await rawData.json();
            setData(json.drinks);
            console.log("these are the drinks: " + data);

        }
        fetchData()
            .then(() => console.log("successfully fetched data"))
            .catch((e: Error)=> console.log("this was the error " +e));
    }, []);


    return (
        <StyledContainer>

            {data.slice(0,20).map((drink) => (
                <div key={drink.idDrink}>
                    <h3>{drink.strDrink}</h3>
                    <img src={drink.strDrinkThumb} alt={drink.strDrink} width="100" />
                </div>
            ))}
        </StyledContainer>

    )


}