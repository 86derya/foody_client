import React from 'react';
import Select from 'react-select';
import styles from './AddMenuItem.module.css';
import AddDishFormConfig from './$configs/AddDishFormConfig.json';
import DishPreview from '../menuGrid/MenuGridCardView';

const AddDishForm = ({
  props,
  onChange,
  onReset,
  onSubmit,
  addIngredient,
  onDeleteIngredient,
  onCategorySelect,
  selectedCategory,
  categoryOptions,
}) => {
  const input = AddDishFormConfig.map(el => (
    <li key={el.name} className={styles.inputs__item}>
      <label className={styles.label}>
        {el.name}
        {el.name === 'category' ? (
          <Select
            className={styles.select}
            options={categoryOptions}
            onChange={option => onCategorySelect(option.categoryId)}
            value={selectedCategory}
            placeholder="Select Category..."
            required
          />
        ) : (
          <el.tag
            onChange={onChange}
            name={el.name}
            type={el.type}
            value={props[el.name]}
            className={styles.input}
            autoComplete={el.autoComplete}
            placeholder={el.placeholder}
            required={el.required}
          />
        )}
        {el.button && (
          <div>
            <div className={styles.ingredients__container}>
              <el.button
                type="button"
                onClick={addIngredient}
                className={styles.addIngredient__btn}
              >
                +
              </el.button>
              <ul className={styles.ingredients__list}>
                Ingredients Summary:
                {props.ingredients &&
                  props.ingredients.map(ingr => (
                    <li key={ingr}>
                      {ingr}
                      <button
                        type="button"
                        onClick={() => onDeleteIngredient(ingr)}
                      >
                        X
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </label>
    </li>
  ));
  const { ingredients } = props;

  return (
    <>
      <h1 className={styles.addDish__page_title}>Add New Menu Item</h1>
      <div className={styles.addDish_container}>
        <div className={styles.form_container}>
          <form className={styles.addDish_form} onSubmit={onSubmit}>
            <ul className={styles.inputs__list}>{input}</ul>
            <div className={styles.controls__container}>
              <button
                type="button"
                className={styles.clearForm_button}
                onClick={onReset}
              >
                Clear All
              </button>
              <button type="submit" className={styles.submitNewItem_button}>
                Post
              </button>
            </div>
          </form>
        </div>
        <div className={styles.preview_container}>
          <DishPreview {...props} />
          <p className={styles.dish__ingredients}>Ингридиенты:</p>
          <ul className={styles.dish__ingredients_list}>
            {ingredients &&
              ingredients.map(item => (
                // eslint-disable-next-line no-underscore-dangle
                <li className={styles.dish__ingredients_item} key={item}>
                  {ingredients[ingredients.length - 1] === item
                    ? item
                    : `${item},`}
                </li>
              ))}
          </ul>
          {/* {image && (
            <img
              src={image}
              alt="dishImage"
              className={styles.addDish__image}
            />
          )} */}
        </div>
      </div>
    </>
  );
};

export default AddDishForm;
