import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../AppHeader.module.css';
import routes from '../../../../configs/routes';

const CartLinkView = ({ qty }) => (
  <div className={styles.cart_link__container}>
    <Link to={routes.CART}>
      {qty > 0 && <span className={styles.cart_link__amount}>{qty}</span>}
      <img
        className={styles.cart_link__image}
        src="http://icons.iconarchive.com/icons/rafiqul-hassan/blogger/256/Shopping-Cart-icon.png"
        width="60"
        alt="cart"
      />
    </Link>
  </div>
);

export default CartLinkView;
