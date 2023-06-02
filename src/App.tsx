import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  return (
    <>
      <header>
        <img src="./src/assets/images/apple-touch-icon.png" alt="logo" />
        <h1>Local Weather</h1>
      </header>
      <main>
        <SearchBar />
        {/* weather section */}
      </main>
      <footer>© Maciej Skurznica, 2023</footer>
    </>
  );
}

export default App;
