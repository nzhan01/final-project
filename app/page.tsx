"use client";

import { useState, useEffect} from "react";  

type Cocktail = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

export default function HomePage() {
  const [allDrinks, setAllDrinks] = useState<Cocktail[]>([]);
  const [filteredDrinks, setFilteredDrinks] = useState<Cocktail[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"
      );
      const data = await response.json();
      const drinks: Cocktail[] = data.drinks || [];

      const bigDrinks = Array.from({ length: 500 }).flatMap(() => drinks);
      setAllDrinks(bigDrinks);
      setFilteredDrinks(bigDrinks);
    })();
  }, []);

  function handleChange(
    ev: React.ChangeEvent<HTMLInputElement>,
    useTrans: boolean
  ) {
    const nextQuery = ev.target.value;
    setQuery(nextQuery);
  
    const doFilter = () => {
      setFilteredDrinks(
        allDrinks.filter((drink) =>
          drink && drink.strDrink && drink.strDrink.toLowerCase().includes(nextQuery.toLowerCase())
        )
      );
    };

    const listItems = (query ? filteredDrinks.slice(0, 1) : filteredDrinks.slice(0, 9)).map((drink) => (
      <li key={drink.idDrink} className="drink-card">
        <img
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          className="drink-img"
        />
        <h3 className="drink-name">{drink.strDrink}</h3>
      </li>
    ));
    
  
  return (
    <main className="main">
      <h1 className="text-3xl font-bold mb-6">Filter Cocktails</h1>
  
      <div className="section">
        <input
          className="input mb-4"
          placeholder="Search for a drink."
          value={query}
          onChange={(e) => handleChange(e, false)} 
        />
        <p className="mb-2">
          {filteredDrinks.length} / {allDrinks.length}
        </p>
        <ul className="drink-list">
          {listItems}
        </ul>
      </div>
    </main>
  );
}
}
