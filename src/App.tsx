import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { OneDayData } from "./App.interfaces";
import SearchBar from "./components/SearchBar/SearchBar";
import { Location } from "./components/SearchBar/SearchBar.interfaces";
import WeatherCard from "./components/WeatherCard/WeatherCard";

function App() {
  const [selectedLocation, setSelectedLocation] = useState({} as Location);
  const [weatherData, setWeatherData] = useState([] as OneDayData[]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const {
          data: { daily }
        } = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${selectedLocation.latitude}&longitude=${selectedLocation.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max&timeformat=unixtime&forecast_days=6&timezone=Europe%2FLondon`
        );

        const newData = daily.time.map((time: number, i: number) => ({
          id: uuidv4(),
          time: new Date(time * 1000).toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short"
          }),
          temperature_2m_max: daily.temperature_2m_max[i],
          temperature_2m_min: daily.temperature_2m_min[i],
          weathercode: daily.weathercode[i],
          windspeed_10m_max: daily.windspeed_10m_max[i]
        }));

        setWeatherData(newData);
      } catch (err) {
        console.log(err);
      }
    };

    selectedLocation.id && fetchWeather();
  }, [selectedLocation]);

  return (
    <>
      <header>
        <img src="./src/assets/images/favicon.ico" alt="logo" />
        <h1>Local Weather</h1>
      </header>
      <main>
        <SearchBar
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
        <div className="location">
          {selectedLocation?.name}
          {selectedLocation.country && ", " + selectedLocation.country}
        </div>
        <section className="weather">
          {weatherData.length > 0 &&
            weatherData.map((el, i) => i > 0 && <WeatherCard key={el.id} {...el} />)}
        </section>
      </main>
      <footer>© Maciej Skurznica, 2023</footer>
    </>
  );
}

export default App;
