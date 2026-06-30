import { useState, useEffect } from "react";

const SearchBar = ({ search, setSearch }) => {
    const [inputValue, setInputValue] = useState(search);

    const handleSearch = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setSearch(inputValue);
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [inputValue, setSearch]);

    return (
        <input
            type="text"
            placeholder="Search products..."
            value={inputValue}
            onChange={handleSearch}
            className="w-full border rounded-md p-2"
        />
    );
};

export default SearchBar;
