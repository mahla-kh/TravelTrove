import React from "react";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import { useProvider } from "../contexts/CitiesContext";
function CityList() {
  const { cities, isLoading } = useProvider();
  if (!cities.length) return <p>add your first city by clicking on the map</p>;
  return (
    <div className={styles.cityList}>
      {isLoading ? (
        <Spinner />
      ) : (
        cities.map((city) => <CityItem city={city} key={city.id} />)
      )}
    </div>
  );
}

export default CityList;
