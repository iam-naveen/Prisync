import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

function AmazonScraper({ productName }) {
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    setProductData(null);
    async function fetchData() {
      try {
        const encodedProductName = encodeURIComponent(productName);
        const response = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://www.amazon.in/s?k=${encodedProductName}`
        );

        // Extract information from the response
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(response.data, "text/html");
        const items = htmlDoc.querySelectorAll(".s-result-item");

        const results = Array.from(items).map((item) => {
          const titleElement = item.querySelector(".a-size-base-plus");
          const priceElement = item.querySelector(".a-price-whole");
          const ratingElement = item.querySelector(".a-icon-star-small");
          const linkElement = item.querySelector(".a-link-normal");
          const thumbnailElement = item.querySelector(".s-image");

          const title = titleElement ? titleElement.textContent.trim() : "";
          const price = priceElement ? priceElement.textContent.trim() : "";
          const rating = ratingElement ? ratingElement.textContent.trim() : "";
          const link = linkElement
            ? `https://www.amazon.in${linkElement.getAttribute("href")}`
            : "";
          const thumbnail = thumbnailElement
            ? thumbnailElement.getAttribute("src")
            : "";

          return { title, price, rating, link, thumbnail };
        });

        setProductData(results);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [productName]);

  const getSortedProducts = () =>
    productData && productData.sort((a, b) => +a.price - +b.price);
  return (
    productName && (
      <div className="amazon-results flex flex-wrap justify-center items-center w-full ">
        {productData ? (
          getSortedProducts().map(
            (item, index) =>
              item.title &&
              item.price &&
              item.rating && (
                <Card
                  key={index}
                  title={item.title}
                  price={item.price}
                  rating={item.rating}
                  image={item.thumbnail}
                  link={item.link}
                />
              )
          )
        ) : (
          <p>Amazon Products Loading...</p>
        )}
      </div>
    )
  );
}

export default AmazonScraper;
