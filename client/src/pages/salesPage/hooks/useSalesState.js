import { useState, useEffect } from 'react';

import {
  calculateTotal,
  calculateTotalTax,
  calculateTotalDiscount
} from '../utilities';
import useProductsLocalStorage from './useProductsLocalStorage';

const defaultState = [
  {
    id: 7000000,
    barcode: 941538658299,
    name: 'Adidas NMD ',
    qty: 1,
    sku: 397623880,
    price: 50,
    taxRate: 8,
    discountPrice: 40,
    variation: 'Ergonomic',
    brand: 'Adidas',
    category: 'Tenis Ayakkabisi'
  }
];

// Products Reducer

const productsReducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_PRODUCT': {
      const existingPToAdd = state.find(p => p.id === payload.id);
      if (existingPToAdd) {
        return state.map(product =>
          product.id === payload.id
            ? {
                ...product,
                qty: product.qty + 1
              }
            : product
        );
      }
      return [...state, { ...payload, qty: 1 }];
    }

    case 'DELETE_PRODUCT':
      return state.filter(p => p.id !== payload.id);

    case 'DECREASE_QUANTITY': {
      const existingPToDecrease = state.find(p => p.id === payload.id);

      if (existingPToDecrease.qty === 1) {
        return state.filter(p => p.id !== payload.id);
      }
      return state.map(product =>
        product.id === payload.id
          ? { ...product, qty: product.qty - 1 }
          : product
      );
    }
    case 'INCREASE_QUANTITY': {
      const existingPToIncrease = state.find(p => p.id === payload.id);
      if (existingPToIncrease) {
        return state.map(product =>
          product.id === payload.id
            ? { ...product, qty: product.qty + 1 }
            : product
        );
      } else {
        return state;
      }
    }
    case 'DISCARD_SALE':
      return [];

    default:
      return state;
  }
};

// Products and Total state
export default () => {
  const [products, dispatch] = useProductsLocalStorage(
    'products',
    [],
    productsReducer
  );

  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState('');

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

  const discardSale = () => {
    dispatch({
      type: 'DISCARD_SALE'
    });
  };

  // Total section
  const handleDiscountChange = ({ target: { value } }) => {
    setDiscount(isNaN(value) ? 0 : value);
  };

  useEffect(() => {
    setTax(calculateTotalTax(products));
    setTotal(calculateTotal(products));
    setDiscount(calculateTotalDiscount(products));
  }, [products]);

  return {
    products,
    deleteProduct,
    addProduct,
    decreaseProductQuantity,
    increaseProductQuantity,
    discardSale,
    total,
    tax,
    discount,
    handleDiscountChange
  };
};
