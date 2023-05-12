import { useEffect, useState } from "react";
import axios from "axios";
import cheerio from "cheerio";
import Card from "./Card";

function SnapdealScraper({ productName }) {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const encodedProductName = encodeURIComponent(productName);
        const response = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://www.snapdeal.com/search?keyword=${encodedProductName}`
        );

        // Extract information from the response
        const $ = cheerio.load(response.data);
        const items = $(".product-tuple-listing");
        const results = items
          .map((index, element) => {
            const title = $(element).find(".product-title").text().trim();
            const price = $(element).find(".product-price").text().trim();
            const thumbnail = $(element).find("source").attr("srcset");

            return { title, price, thumbnail };
          })
          .get();

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
    <div className="snapdeal-results flex flex-wrap justify-center items-center w-full">
      {productData ? (
        getSortedProducts().map(
          (item, index) =>
            item.title &&
            item.price && (
              <Card
                key={index}
                title={item.title}
                price={item.price}
                image={item.thumbnail}
                rating={""}
              />
            )
        )
      ) : (
        <p>SnapDeal Products Loading...</p>
      )}
    </div>
  );
}

export default SnapdealScraper;
