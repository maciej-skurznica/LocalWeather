import { weatherData } from "../../assets/data/weatherData";
import { WeatherCardProps } from "./WeatherCard.interfaces";
import styles from "./WeatherCard.module.scss";

const WeatherCard: React.FC<WeatherCardProps> = ({
  time,
  temperature_2m_max,
  temperature_2m_min,
  weathercode,
  windspeed_10m_max
}) => {
  const weatherCode = weathercode.toString();

  return (
    <div className={styles["weather-card"]}>
      <h3>{time}</h3>
      <img src={weatherData[weatherCode].day.image} alt="weather condition icon" />
      <h3>{weatherData[weatherCode].day.description}</h3>
      <h3>
        Temp:{" "}
        <span>
          {temperature_2m_min}&#176;C - {temperature_2m_max}&#176;C
        </span>
      </h3>
      <h3>
        Wind: <span>{windspeed_10m_max}mph</span>
      </h3>
    </div>
  );
};

export default WeatherCard;
