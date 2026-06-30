export default function SearchInput({ value, onChange }) {
  return (
    <label className="search-field">
      <span>Search</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Product, category, owner"
      />
    </label>
  )
}
