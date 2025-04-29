import styled from "styled-components";
import {CocktailType} from "@/types";

const StyledHeader = styled.h1`
    color: #E9A319; 
    font: calc(5px + 3vw) "lora";
    font-weight: bold; 
    padding-bottom: 3%; 
`;

const StyledHeader1 = styled.h1`
    font: calc(5px + 2.5vw) "lora";
    padding-bottom: 2%; 
`;

const IndividualDiv = styled.div`
    border: 5px solid floralwhite;
    border-radius: 10px;
    padding: 5%; 
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    
`;

const StyledP = styled.p`
    justify-content: center;
    align-content: center;
    text-align: center;
    color: black;
    padding-bottom: 2.5%;
    font: calc(3px + 1vw) "lora";
`;

const StyledImage = styled.img`
    border-radius: 10px;
    border: 3px solid #FAD59A;
    width: 50%; 
    margin-top: 3%; 
`

export default function Cocktail(props:{data: CocktailType[]}){
    return(
        <>
            {
                props.data.map((cocktail)=>(
                        <IndividualDiv key={cocktail.idDrink}>
                            <StyledHeader>Generate a Drink!</StyledHeader>
                            <StyledHeader1>{cocktail.strDrink}</StyledHeader1>
                            <StyledP> <strong> Category:</strong> {cocktail.strCategory}</StyledP>
                            <StyledP> <strong> Alcoholic:</strong>  {cocktail.strAlcoholic}</StyledP>
                            <StyledP> <strong> Glass:</strong>  {cocktail.strGlass}</StyledP>

                            <StyledP><strong> Ingredients: </strong> </StyledP>
                            {cocktail.strIngredient1 && (
                                <div>
                                    <StyledP>1. {cocktail.strIngredient1}</StyledP>
                                </div> )}
                            {cocktail.strIngredient2 && (
                                <div>
                                    <StyledP>2. {cocktail.strIngredient2}</StyledP>
                                </div> )}
                            {cocktail.strIngredient3 && (
                                <div>
                                    <StyledP>3. {cocktail.strIngredient3}</StyledP>
                                </div> )}
                            {cocktail.strIngredient4 && (
                                <div>
                                    <StyledP>4. {cocktail.strIngredient4}</StyledP>
                                </div> )}
                            {cocktail.strIngredient5 && (
                                <div>
                                    <StyledP>5. {cocktail.strIngredient5}</StyledP>
                                </div> )}
                            {cocktail.strIngredient6 && (
                                <div>
                                    <StyledP>6. {cocktail.strIngredient6}</StyledP>
                                </div> )}
                            {cocktail.strIngredient7 && (
                                <div>
                                    <StyledP>7. {cocktail.strIngredient7}</StyledP>
                                </div> )}
                            {cocktail.strIngredient8 && (
                                <div>
                                    <StyledP>8. {cocktail.strIngredient8}</StyledP>
                                </div> )}
                            {cocktail.strIngredient9 && (
                                <div>
                                    <StyledP>9. {cocktail.strIngredient9}</StyledP>
                                </div> )}
                            {cocktail.strIngredient10 && (
                                <div>
                                    <StyledP>10. {cocktail.strIngredient10}</StyledP>
                                </div> )}
                            {cocktail.strIngredient11 && (
                                <div>
                                    <StyledP>11. {cocktail.strIngredient11}</StyledP>
                                </div> )}
                            {cocktail.strIngredient12 && (
                                <div>
                                    <StyledP>12. {cocktail.strIngredient12}</StyledP>
                                </div> )}
                            {cocktail.strIngredient13 && (
                                <div>
                                    <StyledP>13. {cocktail.strIngredient13}</StyledP>
                                </div> )}
                            {cocktail.strIngredient14 && (
                                <div>
                                    <StyledP>14. {cocktail.strIngredient14}</StyledP>
                                </div> )}
                            {cocktail.strIngredient15 && (
                                <div>
                                    <StyledP>15. {cocktail.strIngredient15}</StyledP>
                                </div> )}
                            <p>-------------------</p>
                            <StyledP><strong> Instructions: </strong> </StyledP>
                            <StyledP> {cocktail.strInstructions}</StyledP>
                            {cocktail.strInstructionsES && (
                                <div>
                                <StyledP><strong> Instrucciones: </strong> </StyledP>
                                <StyledP>{cocktail.strInstructionsES}</StyledP>
                            </div> )}
                            {cocktail.strInstructionsFR && (
                                <div>
                                <StyledP><strong> Les Instructions: </strong> </StyledP>
                                <StyledP> {cocktail.strInstructionsFR}</StyledP>
                            </div> )}
                            <StyledImage src={cocktail.strDrinkThumb} alt={cocktail.strDrink} width="200" height="200" />
                        </IndividualDiv>
                ))
            }
        </>
    );
}
