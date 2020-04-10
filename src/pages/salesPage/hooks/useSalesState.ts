import { useState, useEffect } from 'react';

import {
  calculateTotal,
  calculateTotalTax,
  calculateTotalDiscount
} from '../utilities/';
import api from '../../../api';
import { Product } from '../../../redux/products/types';
import { State, ActionTypes, Action, NewProductData } from './types';
import useLocalStorageReducerState from '../../../common/hooks/useLocalStorageReducerState';

// Products Reducer
const productsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.Add: {
      const existingPToAdd = state.find(p => p.id === action.payload.id);
      if (existingPToAdd) {
        return state.map(product =>
          product.id === action.payload.id
            ? {
                ...product,
                qty: product.qty + 1
              }
            : product
        );
      }
      return [...state, { ...action.payload, qty: 1 }];
    }

    case ActionTypes.Delete:
      return state.filter(p => p.id !== action.payload.id);

    case ActionTypes.DecreaseQuantity: {
      const existingPToDecrease = state.find(p => p.id === action.payload.id);

      if (existingPToDecrease.qty === 1) {
        return state.filter(p => p.id !== action.payload.id);
      }
      return state.map(product =>
        product.id === action.payload.id
          ? { ...product, qty: product.qty - 1 }
          : product
      );
    }
    case ActionTypes.IncreaseQuantity: {
      const existingPToIncrease = state.find(p => p.id === action.payload.id);
      if (existingPToIncrease) {
        return state.map(product =>
          product.id === action.payload.id
            ? { ...product, qty: product.qty + 1 }
            : product
        );
      } else {
        return state;
      }
    }
    case ActionTypes.EditProductPrice: {
      return state.map(p =>
        p.id === action.payload.id
          ? { ...p, price: action.payload.newPrice }
          : p
      );
    }
    case ActionTypes.DiscardSale:
      return [];

    default:
      return state;
  }
};

// Products and Total state
export default (storage?: any) => {
  const [total, setTotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  const [products, dispatch] = useLocalStorageReducerState(
    'products',
    [],
    productsReducer,
    storage
  );

  const addProduct = (product: Product) => {
    dispatch({
      type: ActionTypes.Add,
      payload: product
    });
  };

  const deleteProduct = (id: number) => {
    dispatch({
      type: ActionTypes.Delete,
      payload: { id }
    });
  };

  const decreaseProductQuantity = (product: Product) => {
    dispatch({
      type: ActionTypes.DecreaseQuantity,
      payload: product
    });
  };

  const increaseProductQuantity = (product: Product) => {
    dispatch({
      type: ActionTypes.IncreaseQuantity,
      payload: product
    });
  };

  const editProductPrice = (id: number, newPrice: number) => {
    dispatch({
      type: ActionTypes.EditProductPrice,
      payload: { id, newPrice }
    });
  };

  const createProduct = async (
    productData: NewProductData,
    addNotification: (message: string, severity: string) => void
  ) => {
    try {
      const response = await api.post('/products', productData);
      addProduct(response.data as Product);
      addNotification('Product has been created successfully', 'success');
    } catch (e) {
      addNotification('Product could not be created!', 'error');
    }
  };

  const discardSale = () => {
    dispatch({
      type: ActionTypes.DiscardSale
    });
  };

  // Total section
  const handleDiscountChange = (discount: string) => {
    if (discount.includes('.') || discount.includes(',')) {
      return;
    }
    if (discount === '') {
      setDiscount(0);
    } else if (
      products.length &&
      parseInt(discount) >= 0 &&
      parseInt(discount) < total
    ) {
      setDiscount(isNaN(Number(discount)) ? 0 : parseFloat(discount));
    }
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
    editProductPrice,
    createProduct,
    discardSale,
    total,
    tax,
    discount,
    handleDiscountChange
  };
};
