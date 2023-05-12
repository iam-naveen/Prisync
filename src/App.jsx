import { useState } from "react";
import "./App.css";
import AmazonScrapper from "./components/AmazonScrapper";
import SearchBox from "./components/SearchBox";
import SnapdealScraper from "./components/SnapdealScraper";

function App() {
  const [productName, setProductName] = useState("car");

  return (
    <>
      <h1>{productName.toUpperCase()}</h1>
      <SearchBox setProductName={setProductName}></SearchBox>
      <AmazonScrapper productName={productName} />
      <hr />
      <SnapdealScraper productName={productName} />
    </>
  );
}

export default App;
