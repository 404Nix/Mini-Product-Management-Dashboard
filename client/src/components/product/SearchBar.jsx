const SearchBar = ({ search, setSearch }) => {
    return (
        <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-md p-2"
        />
    );
};

export default SearchBar;
