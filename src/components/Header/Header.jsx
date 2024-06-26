import { useState, useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import styles from "./Header.module.css";
import CartProduct from "../CartProduct/CartProduct";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../Navigation/Navigation";
import RegistrationForm from "../RegistrationForm/RegistrationForm";

/**
 * Шапка профиля.
 */
const Header = () => {
  // Счетчик товаров в корзине
  const { totalItemsInCart } = useContext(CartContext);

  // Стейт для открытия корзины
  const [cartOpened, setCartOpened] = useState(false);

  // Стейт для открытия формы регистрации
  const [registrationFormOpened, setRegistrationFormOpened] = useState(false);

  // Стейт для открытия бургер меню
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleCart = () => {
    setCartOpened(!cartOpened);
  };

  const toggleRegistrationForm = () => {
    setRegistrationFormOpened(!registrationFormOpened);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {cartOpened && <CartProduct isOpen={toggleCart} />}
      {registrationFormOpened && (
        <RegistrationForm isOpen={toggleRegistrationForm} />
      )}
      <header className={styles.header}>
        <div className={`container ${styles.header__inner}`}>
          <Link legacyBehavior href="/">
            <a className={styles.logo}>
              <Image
                width={70}
                height={70}
                alt="logo"
                className={styles.logo__img}
                src="image/logo-header.svg"
                priority={true}
                loading="eager"
              />
            </a>
          </Link>
          <nav
            className={`${styles.menu} ${styles.header__menu} ${
              menuOpen ? styles.menu_open : ""
            }`}
          >
            <button
              className={`${styles.menu__btn} ${
                menuOpen ? styles.menu__btn_open : ""
              }`}
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>

            <Navigation />
          </nav>

          <div className={styles.header__right}>
            <button id="open_basket" className="btn_icon" onClick={toggleCart}>
              <Image
                width={23}
                height={23}
                alt="logo"
                src="image/basket.svg"
                loading="eager"
                priority={true}
              />
              {totalItemsInCart > 0 && (
                <span className={styles.cart_count}>{totalItemsInCart}</span>
              )}
            </button>
            <Link legacyBehavior href="/Favourites">
              <a className="btn_icon">
                <Image
                  width={23}
                  height={23}
                  alt="heart"
                  src="image/heart.svg"
                  loading="eager"
                  priority={true}
                />
              </a>
            </Link>

            <button className="btn_icon" onClick={toggleRegistrationForm}>
              <Image
                width={23}
                height={23}
                alt="user"
                src="image/user.svg"
                loading="eager"
                priority={true}
              />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
