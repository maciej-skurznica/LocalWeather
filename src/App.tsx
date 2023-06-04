import axios from "axios";
import { useEffect, useState } from "react";
import { WeatherData } from "./App.interfaces";
import SearchBar from "./components/SearchBar/SearchBar";
import { Location } from "./components/SearchBar/SearchBar.interfaces";

function App() {
  const [selectedLocation, setSelectedLocation] = useState({} as Location);
  const [weatherData, setWeatherData] = useState<null | WeatherData>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const {
          data: { daily }
        } = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${selectedLocation.latitude}&longitude=${selectedLocation.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max&timeformat=unixtime&forecast_days=6&timezone=Europe%2FLondon`
        );
        setWeatherData(daily);
      } catch (err) {
        console.log(err);
      }
    };

    selectedLocation.id && fetchWeather();
  }, [selectedLocation]);

  return (
    <>
      <header>
        <img src="./src/assets/images/apple-touch-icon.png" alt="logo" />
        <h1>Local Weather</h1>
      </header>
      <main>
        <SearchBar
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
        {/* weather section */}
        {void console.log(weatherData)}
      </main>
      <footer>© Maciej Skurznica, 2023</footer>
    </>
  );
}

export default App;
