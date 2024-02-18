import styles from "./Card.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Card() {
  // Стейт для отображения карточек
  const [products, setProducts] = useState([]);

  /// Создаем объект состояний для каждой карточки
  const [isAddedState, setIsAddedState] = useState({});

  // Функция для обновления состояния конкретной карточки
  const onClickAddToCart = (cardId) => {
  setIsAddedState((prevState) => ({
    ...prevState,
    [cardId]: !prevState[cardId]
  }));
};

  useEffect(() => {
    getProductsFromServer(); // Вызов для отрисовки данных
  });

  /**
   * Функция для получения товаров из базы данных.
   */
  const getProductsFromServer = () => {
    fetch(`http://localhost:3004/products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error(error);
      });
  };

  // Итерация по данным и отрисовка карточек
  const renderData =
    products.length > 0 &&
    products.map((product, index) => (
      <div
        key={index}
        className={` products__item ${styles.products__item_card} `}
      >
        <Image
          width={174}
          height={210}
          src={product?.imgSrc}
          alt={product?.name}
          className={styles.products__item_img}
        />
        <div className={styles.products__item_top}>
          <p>Свеча {product?.name}</p>
          <div className={styles.favorite}>
            <Image
              width={17}
              height={17}
              src="/image/heart.svg"
              alt="Сердце не лайкнутое"
            />
          </div>
        </div>
        <div className={styles.products__item_bottom}>
          <div className={styles.products__item_info}>
            <span>Цена:</span>
            <p className={styles.products__item_price}>{product?.price}</p>
          </div>
          <button
            className="btn_icon"
            onClick={() => onClickAddToCart(product.id)}
          >
            <Image
              width={32}
              height={32}
              src={
                isAddedState[product.id]
                  ? "/image/btn-checked.svg"
                  : "/image/btn-plus.svg"
              }
              alt="Добавить"
            />
          </button>
        </div>
      </div>
    ));

  return <div className={`container products_inner`}>{renderData}</div>;
}
