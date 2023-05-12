function SearchBox({ setProductName }) {
  return (
    <div className="search-container fixed top-5 left-5 flex gap-3">
      <input
        type="text"
        placeholder="Enter product name"
        name="productName"
        className="search-box bg-black border outline-none px-5 py-2 text-md rounded-md"
      />
      <input
        type="button"
        value="Search"
        className="search-btn bg-black outline-none border bold hover:bg-zinc-600 px-5 py-2 text-md rounded-md"
        onClick={() => {
          setProductName(document.getElementsByName("productName")[0].value);
        }}
      />
    </div>
  );
}
export default SearchBox;
