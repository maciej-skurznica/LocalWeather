import { Icon } from "@iconify/react";
import { useState } from "react";
import styles from "./SearchBar.module.scss";

const SearchBar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.container} onClick={() => setExpanded(!expanded)}>
      <input type="text" placeholder="Location..." />
      <div className="icon-wrapper">
        <Icon icon="simple-line-icons:magnifier" />
      </div>
      <div className={`dropdown ${!expanded && "hidden"}`}>
        <div>fasd</div>
        <div>fasd</div>
        <div>fasd</div>
        <div>fasd</div>
        <div>fasd</div>
      </div>
    </div>
  );
};

export default SearchBar;
