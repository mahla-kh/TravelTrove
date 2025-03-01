import React from "react";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import { useProvider } from "../contexts/CitiesContext";
function CountryList() {
  const { cities, isLoading } = useProvider();
  if (!cities.length) return <p>add your first city by clicking on the map</p>;
  const countries = cities.reduce((array, city) => {
    if (!array.includes(city.country)) {
      return [...array, city.country];
    } else return array;
  }, []);
  return (
    <div className={styles.countryList}>
      {isLoading ? (
        <Spinner />
      ) : (
        countries.map((country) => (
          <CountryItem country={country} key={country} />
        ))
      )}
    </div>
  );
}

export default CountryList;
