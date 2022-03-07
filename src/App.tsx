import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import DoubleValueCard from "./components/DoubleValueCard";
import SingleValueCard from "./components/SingleValueCard";
import Country from "./models/Country";
import Temperature from "./models/Temperature";
import Wind from "./models/Wind";
import axios from "axios";
import WeatherData from "./models/WeatherData";

function App() {
  const [loadingData, setLoadingData] = useState<boolean>();
  const [loadingMessage, setLoadingMessage] = useState("Loading data...");
  const [countries, setCountries] = useState<Array<Country>>([]);
  const [country, setCountry] = useState<Country>();
  const [temperature, setTemperature] = useState<Temperature>({
    min: "",
    max: "",
  });
  const [wind, setWind] = useState<Wind>({ speed: "", direction: "" });
  const [humidity, setHumidity] = useState("");
  const [pressure, setPressure] = useState("");

  // Get list of countries
  useEffect(() => {
    setLoadingData(true);
    setLoadingMessage("Getting countries list...");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setLoadingData(false);
      let resultList = response.data.map((c: any) => c as Country);
      setCountries(resultList);
      setCountry(resultList[0]);
    });
  }, []);

  // Get weather info for current country
  useEffect(() => {
    if (country) {
      setLoadingData(true);
      setLoadingMessage("Getting weather data...");

      let apiToken = process.env.REACT_APP_API_KEY;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${apiToken}`
        )
        .then((response) => {
          setLoadingData(false);
          let weatherData = response.data as WeatherData;
          setTemperature({
            min: `${weatherData.main.temp_min} K`,
            max: `${weatherData.main.temp_max} K`,
          });
          setWind({
            speed: `${weatherData.wind.speed} m/s`,
            direction: `${weatherData.wind.deg} deg`,
          });
          setHumidity(`${weatherData.main.humidity}%`);
          setPressure(`${weatherData.main.pressure} hPa`);
        })
        .catch((error) => {
          setLoadingMessage(
            `Could not get weather data for ${country.name.official}`
          );
        });
    }
  }, [country]);

  return (
    <React.Fragment>
      <h2 className="title">CURRENT WEATHER</h2>
      {loadingData && <p className="sub-title">{loadingMessage}</p>}
      <div className="top-row">
        <p>Select Country:</p>
        <select
          name="country"
          onChange={(event) => {
            let selectedCountry = countries.find(
              (c) => c.name.official === event.target.value
            );
            if (selectedCountry) {
              setCountry(selectedCountry);
            }
          }}
        >
          {countries.map((c) => (
            <option key={c.name.official} value={c.name.official}>
              {c.name.official}
            </option>
          ))}
        </select>
      </div>

      <div className="content-1">
        <DoubleValueCard
          title="TEMPERATURE"
          key1="Min"
          value1={temperature.min}
          key2="Max"
          value2={temperature.max}
        />
        <DoubleValueCard
          title="WIND"
          key1="Speed"
          value1={wind.speed}
          key2="Direction"
          value2={wind.direction}
        />
      </div>

      <div className="content-2">
        <SingleValueCard title="HUMIDITY" value={humidity} />
        <SingleValueCard title="PRESSURE" value={pressure} />
      </div>
    </React.Fragment>
  );
}

export default App;
