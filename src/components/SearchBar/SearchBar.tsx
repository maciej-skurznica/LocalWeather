import { Icon } from "@iconify/react";
import axios from "axios";
import { useEffect, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { Location, SearchBarProps } from "./SearchBar.interfaces";
import styles from "./SearchBar.module.scss";

const SearchBar = ({ selectedLocation, setSelectedLocation }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [locations, setLocations] = useState([]);

  const searchBarRef = useClickOutside(() => setQuery(""));

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const { data } = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`
        );
        if (data.results) {
          setHasResults(true);
          setLocations(data.results);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    setIsLoading(true);
    setHasResults(false);
    const timeout = query.length && setTimeout(fetchCities, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  const { loading, noResults, results } = {
    loading: <div>Loading...</div>,
    noResults: <div>No locations found</div>,
    results: locations.map(
      ({ id, name, latitude, longitude, country, admin1, admin2 }: Location) => (
        <div
          className="disable-scrollbar"
          key={id}
          onClick={() => {
            selectedLocation.id !== id &&
              setSelectedLocation({ id, name, latitude, longitude, country });
            setQuery("");
          }}
        >
          <strong>{name}</strong>
          {`| ${country ?? ""} ${admin1 ? " | " + admin1 : ""} ${
            admin2 ? " | " + admin2 : ""
          }`}
        </div>
      )
    )
  };

  return (
    <div className={styles.container} ref={searchBarRef}>
      <input
        type="text"
        placeholder="Location..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <div className="icon-wrapper">
        <Icon icon="simple-line-icons:magnifier" />
      </div>
      <div className={`dropdown ${!query.length && "hidden"}`}>
        {isLoading && query.length > 0 && loading}
        {!isLoading && !hasResults && query.length > 0 && noResults}
        {!isLoading && hasResults && results}
      </div>
    </div>
  );
};

export default SearchBar;
