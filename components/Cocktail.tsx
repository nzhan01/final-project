import styled from "styled-components";
import {CocktailType} from "@/types";

const AllDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const IndividualDiv = styled.div`
    border: 5px solid floralwhite;
    padding: 3%;
    margin: 1%;
    width: 85%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: whitesmoke;
`;

const StyledP = styled.p`
    justify-content: center;
    align-content: center;
    text-align: center;
    color: black;
`;

export default function Cocktail(props:{data: CocktailType[]}){
    return(
        <>
            {
                props.data.map((cocktail)=>(
                    <AllDiv key={cocktail.idDrink}>
                        <h1>Drink Generator</h1>
                        <IndividualDiv key={cocktail.idDrink}>
                            <h3>{cocktail.strDrink}</h3>
                            <StyledP> <strong> Category:</strong> {cocktail.strCategory}</StyledP>
                            <StyledP> <strong> Alcoholic:</strong>  {cocktail.strAlcoholic}</StyledP>
                            <StyledP> <strong> Glass:</strong>  {cocktail.strGlass}</StyledP>
                            <StyledP> <strong> Instructions: </strong> {cocktail.strInstructions}</StyledP>
                            <StyledP> <strong> Instructions: </strong> {cocktail.strInstructionsES}</StyledP>
                            <StyledP> <strong> Instructions: </strong> {cocktail.strInstructionsFR}</StyledP>
                            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} width="200" height="200" />
                        </IndividualDiv>
                    </AllDiv>
                ))
            }
        </>
    );
}
