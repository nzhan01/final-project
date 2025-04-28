"use client";

import { useState, useEffect, useTransition } from "react";

type Cocktail = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

export default function Search() {
  const [allDrinks, setAllDrinks] = useState<Cocktail[]>([]);
  const [filteredDrinks, setFilteredDrinks] = useState<Cocktail[]>([]);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    (async () => {
      const cocktail = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
      ).then((r) => r.json());
      const big = Array.from({ length: 500 }).flatMap(() => cocktail);
      setAll(cocktail);
      setFiltered(cocktail);
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
          drink.strDrink.toLowerCase().includes(nextQuery.toLowerCase())
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
    <>
    <main className="main">
      <h1>Filter Cocktails</h1>

      <div className="section">
        <h2>Conventional</h2>
        <input
          className="input"
          placeholder "Search for a drink…"
          value={query}
          onChange={(e) => handleChange(e, false)}
        />
        <p>
          {filteredDrinks.length} / {allDrinks.length}
        </p>
        <ul className="list">
          {listItems}
          {filteredDrinks.length > 20 && <li>…</li>}
        </ul>
      </div>

      <div className="section">
        <h2>useTransition</h2>
        <input
          className="input"
          placeholdder="Search for a drink…"
          value={query}
          onChange={(e) => handleChange(e, true)}
        />
        {isPending && <p className="spinner">Loading…</p>}
        <p>
          {filteredDrinks.length} / {allDrinks.length}
        </p>
        <ul className="list">
          {listItems}
          {filteredDrinks.length > 20 && <li>…</li>}
        </ul>
      </div>
    </main>
    </>
  );
}
