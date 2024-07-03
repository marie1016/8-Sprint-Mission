import { getProducts } from "../api.js";
import { useEffect, useState, useMemo } from "react";
import ItemList from "./ItemList.js";
import "./AllItems.css";
import "./global.css";

const getPageSize = () => {
  const width = window.innerWidth;

  switch (true) {
    case width < 768:
      return 1;

    case width < 1280:
      return 2;

    default:
      return 4;
  }
};

function BestItems() {
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(getPageSize());

  const bestProducts = useMemo(() => {
    const sortedItems = [...products].sort(
      (a, b) => b.favoriteCount - a.favoriteCount
    );

    return sortedItems.slice(0, getPageSize());
  }, [products]);

  const handleLoadProducts = async (pageSize) => {
    try {
      const products = await getProducts(pageSize);
      setProducts(products.list);
    } catch (error) {
      console.error("상품 목록을 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };
    window.addEventListener("resize", handleResize);
    handleLoadProducts(pageSize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize]);

  return (
    <>
      <div className="title">베스트 상품</div>
      <div className="bestItemsMenu">
        {bestProducts.map((product) => (
          <ItemList product={product} key={product.id} />
        ))}
      </div>
    </>
  );
}

export default BestItems;
