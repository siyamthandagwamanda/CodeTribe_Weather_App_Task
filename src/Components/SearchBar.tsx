import React from "react";
import '../Styles/SearchBar.css';

type SearchBarProps = {
    city: string;
    onCityChange: (value: string) => void;
    onSearch: () => void;
}
