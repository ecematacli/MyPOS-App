import { useReducer } from 'react';
import {
  calculateTotal,
  calculateSubTotal,
  calculateTotalTax,
  calculateTotalDiscount
} from '../utilities';

const initialState = {
  products: {
    1: {
      id: 1,
      name: 'Nike Airmax',
      quantity: 2,
      price: 200,
      taxRate: 5,
      discount: 0
    },
    2: {
      id: 2,
      name: 'Adidas NMD',
      quantity: 1,
      price: 300,
      taxRate: 5,
      discount: 0
    }
    // 3: {
    //   id: 3,
    //   quantity: 3,
    //   name: 'Adidas falcon',
    //   price: 200.5,
    //   taxRate: 8,
    //   discount: 0
    // },
    // 4: {
    //   id: 4,
    //   quantity: 1,
    //   name: 'Adidas legend',
    //   price: 40.0,
    //   taxRate: 8,
    //   discount: 0
    // }
  },
  totals: {
    tax: 50,
    total: 700
  }
};

// Reducer

const salesReducer = (state, { type, payload }) => {
  const { products, totals } = state;
  const productId = products[payload.id];

  switch (type) {
    // case 'ADD_PRODUCT':
    //   if () {
    //     return {
    //       ...totals,
    //       products: {
    //         ...products,
    //         [payload.id]: {
    //           ...payload,
    //           quantity: products[payload.id].quantity + 1
    //         }
    //       }
    //     };
    //   } else {
    //     return {
    //       ...totals,
    //       products: { ...products, [payload.id]: { ...payload, quantity: 1 } }
    //     };yload
    case 'DELETE_PRODUCT':
      const { [payload.id]: removedProduct, ...otherProducts } = products;
      if (!!products[payload.id]) {
        console.log('removedProduct', removedProduct);

        return {
          totals: {
            ...totals,
            totals:
              totals.total - removedProduct.price * removedProduct.quantity
          },

          products: { ...otherProducts }
        };
      }

    case 'DECREASE_QUANTITY':
      const { [payload.id]: actionToDecreased, ...others } = products;

      if (!!productId && productId.quantity === 1) {
        return {
          ...totals,
          products: { ...others }
        };
      } else {
        return {
          ...totals,
          products: {
            ...products,
            [payload.id]: {
              ...payload,
              quantity: productId.quantity - 1
            }
          }
        };
      }
    case 'INCREASE_QUANTITY':
      if (!!productId) {
        return {
          ...totals,
          products: {
            ...products,
            [payload.id]: {
              ...payload,
              quantity: productId.quantity + 1
            }
          }
        };
      }

    case 'SUBTOTAL_TO_PAY':
      return {
        ...products,
        totals: {
          ...totals,
          subtotal: payload
        }
      };
    case 'TOTAL_TO_PAY':
      return {
        ...products,
        totals: {
          ...totals,
          total: payload
        }
      };
    case 'TAX_TO_PAY':
      return {
        ...products,
        totals: {
          ...totals,
          tax: payload
        }
      };

    default:
      return state;
  }
};

// Action generators

export default () => {
  const [{ products, totals }, dispatch] = useReducer(
    salesReducer,
    initialState
  );

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

  const productsArr = Object.values(products);

  const subTotalToPay = () => {
    dispatch({
      type: 'SUBTOTAL_TO_PAY',
      payload: calculateSubTotal(productsArr)
    });
  };

  const totalToPay = () => {
    dispatch({
      type: 'TOTAL_TO_PAY',
      payload: calculateTotal(productsArr)
    });
  };

  const taxTotalToPay = () => {
    dispatch({
      type: 'TAX_TO_PAY',
      payload: calculateTotalTax(productsArr)
    });
  };

  console.log(totals);

  return {
    products,
    addProduct,
    deleteProduct,
    decreaseProductQuantity,
    increaseProductQuantity,
    subTotalToPay,
    totalToPay,
    taxTotalToPay,
    totals
  };
};
