import { useReducer } from 'react';

const initialState = {
  products: {
    1: {
      id: 1,
      name: 'Nike Airmax',
      quantity: 0,
      price: 500,
      taxRate: 15,
      discount: 0
    },
    2: {
      id: 2,
      name: 'Adidas NMD',
      quantity: 0,
      price: 800.9,
      taxRate: 15,
      discount: '10%'
    },
    3: {
      id: 3,
      quantity: 0,
      name: 'Adidas falcon',
      price: 700.1,
      taxRate: 8
    },
    4: {
      id: 4,
      quantity: 0,
      name: 'Adidas legend',
      price: 749.99,
      taxRate: 8
    }
  },
  price: {
    tax: 0,
    subtotal: 0,
    total: 0
  }
};

const reducer = (state, action) => {
  const { products } = state;

  switch (action.type) {
    case 'ADD_PRODUCT':
      if (products[action.id]) {
        return {
          ...state,
          products: {
            ...products,
            [action.id]: {
              ...action,
              quantity: products[action.id].quantity + 1
            }
          }
        };
      } else {
        return { ...state, [action.id]: { ...action, quantity: 1 } };
      }
    case 'REMOVE_PRODUCT':
      if (products[action.id]) {
        const removedProduct = delete products.products[action.id];
        return {
          ...state,
          products: {}
        };
      }
    default:
      return state;
  }
};

export default () => {
  const [{ products }, dispatch] = useReducer(reducer, initialState);

  const addProduct = product => {
    dispatch({
      type: 'ADD_PRODUCT',
      payload: product
    });
  };

  const deleteProduct = {};

  return { products };
};
