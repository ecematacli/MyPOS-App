import { useReducer, useState, useEffect } from 'react';
import { calculateTotal, calculateTotalTax } from '../utilities';

const initialState = {
  products: {
    12: {
      id: 12,
      barcode: 941538658299,
      name: 'Adidas NMD',
      qty: 1,
      sku: 397623880,
      price: '950.00',
      taxRate: 8,
      discountPrice: 48.75,
      variation: 'Ergonomic',
      brand: 'Nike',
      category: 'Tenis Ayakkabisi'
    },
    13: {
      id: 13,
      barcode: 941538658246,
      name: 'Intelligent Metal Shirt',
      qty: 1,
      sku: 397623780,
      price: '325.00',
      taxRate: 8,
      discountPrice: 50.75,
      variation: 'Ergonomic',
      brand: 'Nike',
      category: 'Tenis Ayakkabisi'
    }
  }
};

// Products Reducer

const productsReducer = (state, { type, payload }) => {
  const { products } = state;

  switch (type) {
    case 'ADD_PRODUCT':
      if (!!products[payload.id]) {
        return {
          products: {
            ...products,
            [payload.id]: {
              ...payload,
              qty: products[payload.id].qty + 1
            }
          }
        };
      } else {
        return {
          products: {
            ...products,
            [payload.id]: {
              ...payload,
              qty: 1
            }
          }
        };
      }
    case 'DELETE_PRODUCT':
      const { [payload.id]: removedProduct, ...otherProducts } = products;

      if (!!products[payload.id]) {
        return {
          products: { ...otherProducts }
        };
      }

    case 'DECREASE_QUANTITY':
      const { [payload.id]: decreasedProduct, ...others } = products;

      if (!!products[payload.id] && products[payload.id].qty === 1) {
        return {
          products: { ...others }
        };
      } else {
        return {
          products: {
            ...products,
            [payload.id]: {
              ...payload,
              qty: products[payload.id].qty - 1
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
              qty: products[payload.id].qty + 1
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
    addProduct,
    decreaseProductQuantity,
    increaseProductQuantity,
    total,
    tax,
    discount,
    handleDiscountChange
  };
};
