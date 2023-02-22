import Card from "@components/Card";

import styles from "./CardList.module.scss";

const products = [
  {
    id: 0,
    image: "https://placeimg.com/640/480/any?r=0.9300320592588625",
    category: "Others",
    title: "Handmade fresh table",
    description: "Andy shoes are designed to keeping in...",
    price: 687,
  },
  {
    id: 1,
    image: "https://placeimg.com/640/480/any?r=0.9178516507833767",
    category: "Others",
    title: "Handmade fresh table",
    description: "Andy shoes are designed to keeping in...",
    price: 687,
  },
  {
    id: 2,
    image: "https://placeimg.com/640/480/any?r=0.9178516507833767",
    category: "Others",
    title: "Handmade fresh table",
    description: "Andy shoes are designed to keeping in...",
    price: 687,
  },
];

const CardList = () => {
  return (
    <div className={styles.cardList}>
      {products.map(({ id, image, category, title, description, price }) => (
        <Card
          key={id}
          image={image}
          category={category}
          title={title}
          subtitle={description}
          price={`$${price}`}
        />
      ))}
    </div>
  );
};

export default CardList;
