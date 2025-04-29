"use client";

// useTransition as hook to make 
import { useState, useEffect, useTransition } from "react";
import styled from "styled-components";
// definition for cocktail drink
type Cocktail = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

//styled-components for page layout and elements
const Main = styled.main`
  font-family: "EB Garamond", serif;
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: #5c3d00;
  margin-bottom: 30px;
`;

const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInput = styled.input`
  font-family: "EB Garamond", serif;
  padding: 12px 20px;
  width: 100%;
  max-width: 400px;
  font-size: 1.2rem;
  border: 2px solid #f4c27b;
  border-radius: 8px;
  margin-bottom: 30px;
`;

const LoadingText = styled.p`
  margin-bottom: 20px;
  color: #888;
  font-size: 1rem;
`;

const DrinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const DrinkCard = styled.li`
  background-color: #f9d89c;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

const DrinkImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;

  @media (max-width: 600px) {
    width: 120px;
    height: 120px;
  }
`;

const DrinkName = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: #5c3d00;
`;

const LoadMoreButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #f4c27b;
  border: none;
  border-radius: 8px;
  font-family: "EB Garamond", serif;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e0a84c;
  }
`;

export default function SearchPage() {
  const [allDrinks, setAllDrinks] = useState<Cocktail[]>([]);
  const [filteredDrinks, setFilteredDrinks] = useState<Cocktail[]>([]);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetchAllDrinks();
  }, []);
  // fetch drinks 
  async function fetchAllDrinks() {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=");
    const data = await response.json();
    const drinks: Cocktail[] = Array.isArray(data.drinks) ? data.drinks : [];
    // shuffle drinks for variety
    const shuffledDrinks = drinks.length > 0 ? [...drinks].sort(() => 0.5 - Math.random()) : [];
    setAllDrinks(shuffledDrinks);
    setFilteredDrinks(shuffledDrinks);
  }

  function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const nextQuery = ev.target.value;
    setQuery(nextQuery);
    setVisibleCount(5);

    const doFilter = async () => {
      if (nextQuery.trim() === "") {
        // if input is empty, show all drinsks again
        setFilteredDrinks(allDrinks);
        return;
      }
      // else fetch search results 
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nextQuery}`);
      const data = await response.json();
      const drinks: Cocktail[] = data.drinks || [];
      setFilteredDrinks(drinks);
    };

    startTransition(doFilter); // hook component for smooth transition
  }

    // load more button (displayed only if more is available)
  function handleLoadMore() {
    setVisibleCount((prev) => prev + 5); // load 5 more options if available (type 'go' on search bar to test)
  }

  // filtering out any null/undefined drinks
  const visibleDrinks = filteredDrinks.filter(Boolean);

  return (
    <Main>
      <PageTitle>Filter Cocktails</PageTitle>
      <SearchSection>
        <SearchInput
          placeholder="Search for a drink..."
          value={query}
          onChange={handleChange}
        />
        {isPending && <LoadingText>Loading...</LoadingText>}
        <DrinkList>
          {visibleDrinks.slice(0, visibleCount).map((drink, index) => (
            <DrinkCard key={`${drink.idDrink}-${index}`}>
              <DrinkImage src={drink.strDrinkThumb} alt={drink.strDrink} />
              <DrinkName>{drink.strDrink}</DrinkName>
            </DrinkCard>
          ))}
        </DrinkList>
        {visibleCount < visibleDrinks.length && (
          <LoadMoreButton onClick={handleLoadMore}>
            Load 5 More
          </LoadMoreButton>
        )}
      </SearchSection>
    </Main>
  );
}

