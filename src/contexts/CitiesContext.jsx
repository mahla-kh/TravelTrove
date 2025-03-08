import { createContext, useContext, useEffect, useReducer } from "react";
import React from "react";

const CitiesContext = createContext();

const initialState = {
  currentCity: {},
  cities: [],
  isLoading: false,
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "rejected":
      return { ...state, error: action.payload };

    case "cities/current":
      return { ...state, currentCity: action.payload };

    case "cities/created":
      return { ...state, cities: [...state.cities, action.payload] };

    case "cities/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id != action.payload),
      };

    default:
      throw new Error("action unknown!");
  }
}
function CitiesProvider({ children }) {
  const [{ currentCity, cities, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [currentCity, setCurrentCity] = useState({});
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    try {
      dispatch({ type: "loading" });
      async function fetchData() {
        const res = await fetch(`http://localhost:3000/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      }
      fetchData();
    } catch (e) {
      dispatch({ type: "rejected", payload: e.message });
      console.error(error);
    }
    // finally {
    //   setIsLoading(false);
    // }
  }, []);

  async function useCurrentCity(id) {
    if (id == currentCity.id) return;
    async function fetchData() {
      const res = await fetch(`http://localhost:3000/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "cities/current", payload: data });
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
      dispatch({ type: "cities/created", payload: data });
    }
    fetchData();
  }

  function deleteCity(id) {
    async function fetchData() {
      await fetch(`http://localhost:3000/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "cities/deleted", payload: id });
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
