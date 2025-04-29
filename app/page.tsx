"use client";

import { useState, useEffect } from "react";

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
  
    if (useTrans) {
      startTransition(doFilter);
    } else {
      doFilter();
    }
  }
  
  const listItems = filteredDrinks.slice(0, 20).map((drink) => (
    <li key={drink.idDrink} className="flex items-center gap-4 p-2">
      <img
        src={drink.strDrinkThumb}
        alt={drink.strDrink}
        className="w-16 h-16 rounded-md object-cover"
      />
      <span>{drink.strDrink}</span>
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
          onChange={handleChange}
        />
        <p className="mb-2">
          {filteredDrinks.length} / {allDrinks.length}
        </p>
        <ul className="list">{listItems}</ul>
      </div>
    </main>
  );
}
