import { useEffect, useState } from "react";
import SearchBox from "./components/SearchBox";
import useAmazon from "./Hooks/useAmazonScrapper";
import useSnapdeal from "./Hooks/useSnapdealScraper";
import Card from "./components/Card";
import Filters from "./components/Filters";
import "./App.css";

function App() {
  const [productName, setProductName] = useState("car");
  const [data, setData] = useState([]);
  const amazonData = useAmazon(productName);
  const snapdealData = useSnapdeal(productName);
  useEffect(() => {
    setData([...amazonData, ...snapdealData]);
  }, [amazonData, snapdealData]);

  return (
    <>
      <SearchBox setProductName={setProductName}></SearchBox>
      <Filters setData={setData}></Filters>
      <div className="container flex flex-row flex-wrap min-w-full justify-center">
        {data.length ? (
          data.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              price={item.price}
              rating={item.rating}
              image={item.thumbnail}
              link={item.link}
              source={item.source}
            ></Card>
          ))
        ) : (
          <h1 className="text-2xl text-white">
            Result for {productName.toUpperCase()} Loading...
          </h1>
        )}
        {/* {console.log(data);} */}
      </div>
    </>
  );
}

export default App;
