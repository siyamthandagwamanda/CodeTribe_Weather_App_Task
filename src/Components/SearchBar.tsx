import "../Styles/SearchBar.css";

type SearchBarProps = {
  city: string;
  onCityChange: (city: string) => void;
  onSearch: () => void;
  onUseLocation: () => void;
  isLocating?: boolean;
};

export function SearchBar({
  city,
  onCityChange,
  onSearch,
  onUseLocation,
  isLocating = false,
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
        placeholder="Search your city now..."
        value={city}
        onChange={(event) => onCityChange(event.target.value)}
        aria-label="City name"
      />

      <button type="submit">Search</button>

      <button
        type="button"
        className="use-location-button"
        onClick={onUseLocation}
        disabled={isLocating}
      >
        {isLocating ? "Locating..." : "📍 Use My Location"}
      </button>
    </form>
  );
}