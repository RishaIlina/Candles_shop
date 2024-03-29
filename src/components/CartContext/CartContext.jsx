import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  // Добавление товаров в корзину
  const [cartItems, setCartItems] = useState([]);

  // Получение товаров из базы данных.
  const getProductsFromServer = async (setProducts) => {
    try {
      const response = await axios.get(
        "https://65d386d8522627d501091517.mockapi.io/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Отправка данных из корзины на сервер
  const addItemToCart = (product) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(product.id)
      );

      // Проверяем, есть ли товар с таким id уже в корзине
      if (findItem) {
        // Удаляем товар с сервера
        axios
          .delete(
            `https://65d386d8522627d501091517.mockapi.io/cart/${findItem.id}`
          )

          .then(() => {
            // Если удаление успешно, удаляем товар из состояния корзины
            setCartItems((prev) =>
              prev.filter(
                (item) => Number(item.parentId) !== Number(product.id)
              )
            );
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // Если товар с таким id не найден в корзине, то отправляем данные на сервер и добавляем товар в корзину.
        axios
          .post("https://65d386d8522627d501091517.mockapi.io/cart", product)
          .then(({ data }) => {
            setCartItems((prev) => [...prev, data]);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  // Получение товаров из базы данных, добавленных в корзину
  const getProductsForCartFromServer = () => {
    axios
      .get("https://65d386d8522627d501091517.mockapi.io/cart")
      .then((response) => {
        setCartItems(response.data);
      });
  };

  useEffect(() => {
    getProductsForCartFromServer();
  }, []);

  // Удаление товара из корзины
  const removeItemFromCart = async (id) => {
    try {
      await axios.delete(
        `https://65d386d8522627d501091517.mockapi.io/cart/${id}`
      );
      setCartItems((prevItems) =>
        prevItems.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addItemToCart,
        getProductsFromServer,
        getProductsForCartFromServer,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
