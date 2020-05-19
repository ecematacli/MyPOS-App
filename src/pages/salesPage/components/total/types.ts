import { Product } from '../../../../redux/products/types';

export interface TotalProps {
  products: Product[];
  total: number;
  tax: number;
  discount: number;
  percentageDiscount: number;
  handleDiscountChange: (e: string) => void;
  completeSale: (
    products: Product[],
    total: number,
    discount: number,
    addNotification: (m: string, t: string) => void,
    discardSale: () => void
  ) => void;
  discardSale: () => void;
  anchorEl: { [key: string]: EventTarget & HTMLDivElement };
  handleEditClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    field: string,
    id?: number,
    product?: Product
  ) => void;
  handleCompleteEditClick: (field: string, inputValue: number) => void;
  handleClose: (field: string) => void;
}
