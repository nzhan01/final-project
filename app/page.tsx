"use client";

import { useState, useEffect, useTransition } from "react";

type Cocktail = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

export default function SearchPage() {
  const [allDrinks, setAllDrinks] = useState<Cocktail[]>([]);
  const [filteredDrinks, setFilteredDrinks] = useState<Cocktail[]>([]);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetchAllDrinks();
  }, []);

  async function fetchAllDrinks() {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
    );
    const data = await response.json();
  
    let drinks: Cocktail[] = Array.isArray(data.drinks) ? data.drinks : [];
  
    // Shuffle only if drinks is not empty
    const shuffledDrinks = drinks.length > 0
      ? [...drinks].sort(() => 0.5 - Math.random())
      : [];
  
    setAllDrinks(shuffledDrinks);
    setFilteredDrinks(shuffledDrinks);
  }  

  function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const nextQuery = ev.target.value;
    setQuery(nextQuery);

    const doFilter = async () => {
      if (nextQuery.trim() === "") {
        setFilteredDrinks(allDrinks);
        return;
      }

      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nextQuery}`
      );
      const data = await response.json();
      const drinks: Cocktail[] = data.drinks || [];

      setFilteredDrinks(drinks);
    };

    startTransition(doFilter);
  }

  const visibleDrinks = filteredDrinks.filter(Boolean);

  const listItems = visibleDrinks.slice(0, 20).map((drink, index) => (
    <li key={`${drink.idDrink}-${index}`} className="drink-card">
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
      <h1 className="page-title">Filter Cocktails</h1>

      <div className="search-section">
        <input
          className="search-input"
          placeholder="Search for a drink..."
          value={query}
          onChange={handleChange}
        />
        {isPending && <p className="loading-text">Loading...</p>}
        <ul className="drink-list">{listItems}</ul>
      </div>

      <style>{`
        .main {
          font-family: "EB Garamond";
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .page-title {
          text-align: center;
          font-size: 2.5rem;
          color: #5c3d00;
          margin-bottom: 30px;
        }

        .search-section {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .search-input {
          font-family: "EB Garamond";
          padding: 12px 20px;
          width: 100%;
          max-width: 400px;
          font-size: 1.2rem;
          border: 2px solid #f4c27b;
          border-radius: 8px;
          margin-bottom: 30px;
        }

        .loading-text {
          margin-bottom: 20px;
          color: #888;
          font-size: 1rem;
        }

        .drink-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
        }

        .drink-card {
          background-color: #f9d89c;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 20px;
          transition: transform 0.2s ease;
        }

        .drink-card:hover {
          transform: translateY(-3px);
        }

        .drink-img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 12px;
          flex-shrink: 0;
        }

        .drink-name {
          font-size: 1.5rem;
          font-weight: bold;
          color: #5c3d00;
        }

        @media (max-width: 600px) {
          .drink-card {
            flex-direction: column;
            text-align: center;
          }

          .drink-img {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>
    </main>
  );
}
