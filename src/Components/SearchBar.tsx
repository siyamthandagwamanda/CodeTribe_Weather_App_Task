import "../Styles/SearchBar.css";

type SearchBarProps = {
  city: string;
  onCityChange: (city: string) => void;
  onSearch: () => void;
};

export function SearchBar({
  city,
  onCityChange,
  onSearch,
}: SearchBarProps) {
  return (
    <form
      className="search-bar"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
    >
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
}