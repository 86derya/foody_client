import React, { Fragment } from 'react';
import styles from '../Menu.module.css';

const MenuGridCard = ({
  name,
  image,
  imageUrl,
  imagePreviewfromFile,
  price,
  description,
  currency,
}) => {
  const dishImg = (
    <img
      className={styles.menu_card_image}
      src={image || imageUrl || imagePreviewfromFile}
      alt="dish_photo"
    />
  );
  const dishName = <p className={styles.menu_card_title}> {name} </p>;
  const dishPrice = (
    <p className={styles.menu_card_price}>
      Price: {price} {currency || 'UAH'}
    </p>
  );
  const dishDescr = (
    <p className={styles.menu_card_description}> {description} </p>
  );

  return (
    <Fragment>
      {image || imageUrl || imagePreviewfromFile ? dishImg : null}
      {dishName}
      {dishDescr}
      {dishPrice}
    </Fragment>
  );
};

export default MenuGridCard;
