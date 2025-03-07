import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const [currentCity, setCurrentCity] = useState({});
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    try {
      async function fetchData() {
        setIsLoading(true);
        const res = await fetch(`http://localhost:3000/cities`);
        const data = await res.json();
        setCities(data);
      }
      fetchData();
    } catch (e) {
      console.warn(`an error accured ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function useCurrentCity(id) {
    async function fetchData() {
      const res = await fetch(`http://localhost:3000/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    }
    fetchData();
  }

  function createCity(newCity) {
    async function fetchData() {
      const res = await fetch(`http://localhost:3000/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    }
    fetchData();
  }

  function deleteCity(id) {
    async function fetchData() {
      await fetch(`http://localhost:3000/cities/${id}`, {
        method: "DELETE",
      });
      setCities((cities) => cities.filter((city) => city.id != id));
    }
    fetchData();
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        useCurrentCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// const id = 73930385;

function useProvider() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw Error("used not ok!");
  return context;
}

export { CitiesProvider, useProvider };
