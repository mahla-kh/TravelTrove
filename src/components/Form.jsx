// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import React, { useEffect } from "react";
import { useState } from "react";
import Button from "./Button";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import BackBtn from "./BackBtn";
import usePosition from "../hooks/usePosition";
import DatePicker from "react-datepicker";
import { useProvider } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const { createCity } = useProvider();
  const navigate = useNavigate();
  const [lat, lng] = usePosition();
  const [cityName, setCityName] = useState("");
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  useEffect(
    function () {
      async function fetchData() {
        try {
          setIsLoadingFetch(true);
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          setCityName(data.city || data.locality);
          setCountry(data.countryName);
        } catch (err) {
          console.warn(err.massage);
        } finally {
          setIsLoadingFetch(false);
        }
      }
      fetchData();
    },
    [lat, lng]
  );

  async function submitHandler(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      date,
      notes,
      country,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="yyyy/MM/dd"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackBtn />
      </div>
    </form>
  );
}

export default Form;
