import React from 'react';
import Select, { Creatable } from 'react-select';
// import Creatable from 'react-select';
// import CreatableSelect from 'react-select/creatable';
import styles from './AddMenuItem.module.css';
import AddDishFormConfig from './$configs/AddDishFormConfig.json';
import DishPreview from '../menuGrid/MenuGridCardView';

const AddDishForm = ({
  props,
  onChange,
  onReset,
  onSubmit,
  onCategorySelect,
  selectedCategory,
  categoryOptions,
  handleIngredientsChange,
}) => {
  const { availableingredients, selectedIngredients } = props;
  const input = AddDishFormConfig.map(el => (
    <li key={el.name} className={styles.inputs__item}>
      <label className={styles.label}>
        {el.name}
        {(() => {
          switch (el.name) {
            case 'category':
              return (
                <Select
                  className={styles.select}
                  options={categoryOptions}
                  onChange={option => onCategorySelect(option.categoryId)}
                  value={selectedCategory}
                  placeholder="Select Category..."
                  required
                />
              );
            case 'ingredients':
              return (
                <Creatable
                  isMulti
                  onChange={handleIngredientsChange}
                  options={availableingredients}
                />
              );
            default:
              return (
                <el.tag
                  onChange={onChange}
                  name={el.name}
                  type={el.type}
                  // eslint-disable-next-line react/destructuring-assignment
                  value={props[el.name]}
                  className={styles.input}
                  autoComplete={el.autoComplete}
                  placeholder={el.placeholder}
                  required={el.required}
                />
              );
          }
        })()}
      </label>
    </li>
  ));

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

          {selectedIngredients.length > 0 && (
            <>
              {/* <p className={styles.dish__ingredients}>:</p> */}
              <ul className={styles.dish__ingredients_list}>
                Ингридиенты
                {selectedIngredients.map(item => (
                  <li className={styles.dish__ingredients_item} key={item}>
                    {selectedIngredients[selectedIngredients.length - 1] ===
                    item
                      ? `${item}`
                      : `${item},`}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AddDishForm;
