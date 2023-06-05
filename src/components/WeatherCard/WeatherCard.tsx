import { WeatherCardProps } from "./WeatherCard.interfaces";

const WeatherCard: React.FC<WeatherCardProps> = ({
  time,
  temperature_2m_max,
  temperature_2m_min,
  weathercode,
  windspeed_10m_max
}) => {
  return (
    <div className="weather-card">
      {
        void console.log(
          time,
          temperature_2m_max,
          temperature_2m_min,
          weathercode,
          windspeed_10m_max
        )
      }
    </div>
  );
};

export default WeatherCard;
