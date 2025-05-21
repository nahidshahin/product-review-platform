interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }: SearchBarProps) => {
  return (
    <form onSubmit={handleSearch} className="w-full md:w-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button type="submit" className="btn btn-primary me-2 bi bi-search">Search</button>
      </div>
    </form>
  );
};

export default SearchBar;