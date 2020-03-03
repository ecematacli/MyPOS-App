import { useState, useEffect } from 'react';

import {
  calculateTotal,
  calculateTotalTax,
  calculateTotalDiscount
} from '../utilities/';
import useLocalStorageReducerState from '../../../common/hooks/useLocalStorageReducerState';
import { Product } from '../../../redux/products/types';

type State = Product[];
enum ActionType {
  Add,
  Delete,
  DecreaseQuantity,
  IncreaseQuantity,
  DiscardSale,
  EditProductPrice
}

interface SaleReducerAction {
  type: ActionType;
  payload?: any;
}

// Products Reducer
const productsReducer = (
  state: State,
  { type, payload }: SaleReducerAction
): State => {
  switch (type) {
    case ActionType.Add: {
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

    case ActionType.Delete:
      return state.filter(p => p.id !== payload.id);

    case ActionType.DecreaseQuantity: {
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
    case ActionType.IncreaseQuantity: {
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
    case ActionType.EditProductPrice: {
      return state.map(p =>
        p.id === payload.id ? { ...p, price: payload.newPrice } : p
      );
    }
    case ActionType.DiscardSale:
      return [];

    default:
      return state;
  }
};

// Products and Total state
export default () => {
  const [products, dispatch] = useLocalStorageReducerState(
    'products',
    [],
    productsReducer
  );

  const [total, setTotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [discount, setDiscount] = useState<string>('');

  const addProduct = (product: Product) => {
    dispatch({
      type: ActionType.Add,
      payload: product
    });
  };

  const deleteProduct = (id: number) => {
    dispatch({
      type: ActionType.Delete,
      payload: { id }
    });
  };

  const decreaseProductQuantity = (product: Product) => {
    dispatch({
      type: ActionType.DecreaseQuantity,
      payload: product
    });
  };

  const increaseProductQuantity = (product: Product) => {
    dispatch({
      type: ActionType.IncreaseQuantity,
      payload: product
    });
  };

  const editProductPrice = (id: number, newPrice: number) => {
    dispatch({
      type: ActionType.EditProductPrice,
      payload: { id, newPrice }
    });
  };
  const discardSale = () => {
    dispatch({
      type: ActionType.DiscardSale
    });
  };

  // Total section
  const handleDiscountChange = ({ target: { value } }) => {
    if (products.length) {
      setDiscount(isNaN(value) ? 0 : value);
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
    discardSale,
    total,
    tax,
    discount,
    handleDiscountChange
  };
};
