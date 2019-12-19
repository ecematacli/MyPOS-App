import { useReducer, useState, useEffect } from 'react';
import { calculateTotal, calculateTotalTax } from '../utilities';

const initialState = {
  products: {
    1: {
      id: 1,
      name: 'Nike Airmax',
      quantity: 1,
      price: 200,
      taxRate: 2
    },
    2: {
      id: 2,
      name: 'Adidas NMD',
      quantity: 1,
      price: 200,
      taxRate: 2
    }
  }
};

// Products Reducer

const productsReducer = (state, { type, payload }) => {
  const { products } = state;

  switch (type) {
    case 'DELETE_PRODUCT':
      const { [payload.id]: removedProduct, ...otherProducts } = products;
      if (!!products[payload.id]) {
        return {
          products: { ...otherProducts }
        };
      }

    case 'DECREASE_QUANTITY':
      const { [payload.id]: decreasedProduct, ...others } = products;

      if (!!products[payload.id] && products[payload.id].quantity === 1) {
        return {
          products: { ...others }
        };
      } else {
        return {
          products: {
            ...products,
            [payload.id]: {
              ...payload,
              quantity: products[payload.id].quantity - 1
            }
          }
        };
      }
    case 'INCREASE_QUANTITY':
      if (!!products[payload.id]) {
        return {
          products: {
            ...products,
            [payload.id]: {
              ...payload,
              quantity: products[payload.id].quantity + 1
            }
          }
        };
      }
    default:
      return state;
  }
};

// Products and Total state

export default () => {
  const [{ products }, dispatch] = useReducer(productsReducer, initialState);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);

  const productsArr = Object.values(products);

  console.log(productsArr);

  const addProduct = product => {
    dispatch({
      type: 'ADD_PRODUCT',
      payload: product
    });
  };

  const deleteProduct = id => {
    dispatch({
      type: 'DELETE_PRODUCT',
      payload: { id }
    });
  };

  const decreaseProductQuantity = product => {
    dispatch({
      type: 'DECREASE_QUANTITY',
      payload: product
    });
  };

  const increaseProductQuantity = product => {
    dispatch({
      type: 'INCREASE_QUANTITY',
      payload: product
    });
  };

  const handleDiscountChange = ({ target: { value } }) => {
    const numVal = parseInt(value);
    setDiscount(isNaN(numVal) ? 0 : numVal);
  };

  useEffect(() => {
    setTax(calculateTotalTax(productsArr));
    setTotal(calculateTotal(productsArr));
  }, [products]);

  return {
    products,
    productsArr,
    deleteProduct,
    decreaseProductQuantity,
    increaseProductQuantity,
    total,
    tax,
    discount,
    handleDiscountChange,
    lastPrice: total - discount
  };
};
