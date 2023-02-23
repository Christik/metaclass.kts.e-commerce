import { useEffect, useState } from "react";

import Badge from "@components/Badge";
import CardList from "@components/CardList";
import Loader from "@components/Loader";
import Pagination from "@components/Pagination";
import Title from "@components/Title";
import { ROUTS } from "@config/routs";
import { Product } from "@config/types";
import { getAllProducts } from "@services/products";
import { usePagination } from "@utils/usePagination";
import { generatePath, useNavigate } from "react-router-dom";

import styles from "./Catalog.module.scss";

const LIMIT = 9;

const Catalog = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [visibleProducts, setVisibleProducts] = useState<Product[] | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();
  const pagination = usePagination(LIMIT);
  const isLoading = products === null || visibleProducts === null;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const initProducts = async () => {
      const data = await getAllProducts();

      const updatedData = data.map((product: Product) => {
        product.onClick = () =>
          navigate(generatePath(ROUTS.PRODUCT, { id: product.id }));
        return product;
      });

      setProducts(updatedData);
    };

    initProducts();
  }, [navigate]);

  useEffect(() => {
    if (products) {
      pagination.setItems(products);
    }
  }, [products, pagination]);

  useEffect(() => {
    if (products) {
      const items = products.slice(
        LIMIT * currentPage - LIMIT,
        LIMIT * currentPage
      );

      setVisibleProducts(items);
    }
  }, [products, currentPage]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section>
      <header className={styles.header}>
        <Title>Total product</Title>
        <Badge>{products.length}</Badge>
      </header>

      <CardList cards={visibleProducts} />

      <Pagination
        className={styles.pagination}
        total={pagination.total}
        current={currentPage}
        onChange={onPageChange}
      />
    </section>
  );
};

export default Catalog;
