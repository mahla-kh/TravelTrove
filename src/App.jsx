import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import PageNotFount from "./pages/PageNotFount";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

function App() {
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
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="Product" element={<Product />} />
          <Route path="Pricing" element={<Pricing />} />
          <Route path="Login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route path="cities/:id" element={<City />} />
            <Route
              path="countries"
              element={<CountryList cities={cities} isLoading={isLoading} />}
            />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFount />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
