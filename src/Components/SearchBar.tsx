import type { FormEvent } from "react";
import "../Styles/SearchBar.css";

type SearchBarProps = {
  city: string;
  onCityChange: (value: string) => void;
  onSearch: () => void;
};

export const SearchBar = ({ city, onCityChange, onSearch }: SearchBarProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a city"
        value={city}
        onChange={(event) => onCityChange(event.target.value)}
        aria-label="City name"
      />
      <button type="submit">Search</button>
    </form>
  );
};