import { useState, useEffect } from "react";
import styles from "./CartForm.module.css";
import Image from "next/image";
// import axios from "axios";

/**
 * Компонент формы корзины с выбранными товарами.
 * @param {Array} selectedProducts - Список выбранных товаров для отображения в форме.
 * @param {Function} closeCartHandler - Функция для закрытия формы корзины.
 */
export default function CartForm({ selectedProducts, closeCartHandler }) {
  // Стейт для хранения имени
  const [name, setName] = useState("");

  // Стейт для хранения номера телефона
  const [phone, setPhone] = useState("");

  // Стейт для отслеживания состояния размещения заказа
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // Функция для обновления состояния имени при изменении в инпуте
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Функция для обновления состояния номера телефона при изменении в инпуте
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  // Функция для отправки информации о заказе в чат Telegram и обновления состояния заказа
  const handleOrderSubmit = async () => {
    // Отправка информации о заказе в чат Telegram через API
    const orderInfo = {
      Имя: name,
      Телефон: phone,
      Заказ: selectedProducts,
    };
    console.log("Информация о заказе:", orderInfo);

    // Обновляем состояние для отслеживания размещения заказа
    setIsOrderPlaced(true);
  };

  useEffect(() => {
    if (isOrderPlaced) {
       // Добавляем задержку для имитации отправки данных и получения ответа
    setTimeout(() => {
      closeCartHandler();
    }, 2800);
  }
  }, [isOrderPlaced, closeCartHandler]);

  return (
    <div className={styles.container}>
      {isOrderPlaced ? (
        <>
          <div className={styles.cart__empty}>
            <Image
              width={100}
              height={130}
              src="/image/complete-order.jpg"
              alt="Заказ оформлен"
            />
            <h2 className={styles.cart__empty_text}>Заказ оформлен!</h2>
            <p className={styles.cart__empty_description}>
              В ближайшее время с вами свяжется наш менеджер для уточнения
              информации по заказу
            </p>
          </div>
        </>
      ) : (
        <>
          <div className={styles.cart__form}>
            <h2 className={styles.cart__empty_text}>
              Для оформления заказа введите информацию о себе:
            </h2>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <Image className={styles.person}
                  src="/image/user_icon.svg"
                  alt="пользователь"
                  width={18}
                  height={18}
                  priority={true}
                  loading="eager"
                />
                <input
                  type="text"
                  placeholder="Имя"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className={styles.input}>
                <Image
                  src="/image/phone_icon.svg"
                  alt="телефон"
                  width={16}
                  height={16}
                  priority={true}
                  loading="eager"
                />
                <input
                  type="tel"
                  placeholder="Номер телефона"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.cart__total_block}>
            <button
              className={` button ${styles.cart__total_btn}`}
              onClick={handleOrderSubmit}
              disabled={!name || !phone}
            >
              Отправить
              <Image
                className={`${styles.cart__total_arrow} ${
                  !name || !phone ? styles.cart__empty_arrow_disabled : ""
                }`}
                src="/image/arrow.svg"
                alt="Стрелка"
                width={16}
                height={14}
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
