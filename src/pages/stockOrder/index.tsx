import React, { useState } from 'react'

import styles from './styles'
import { Product } from '../../redux/products/types';
import { TABLE_HEADS } from './tableHeads';
import CustomTable from '../../common/components/customTable'

interface Props {
  match: { params: { id: string } },
  location: { state: Product[] }
}

const StockOrderPage: React.FC<Props> = ({
  location: {
    state: products
  }
}) => {
  const classes = styles()

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => {
    //To adapt 0-based page of MUI pagination component 1 is added whilst 1 is subtracted for page prop
    if (newPage + 1 < 0) return;
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(value);
    setRowsPerPage(numValue);
  };
  return (
    <div className={classes.tableContainer}>
      <CustomTable
        tableType="products"
        rows={{ type: 'stockOrderProducts', products }}
        tableHeads={TABLE_HEADS}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        count={10}
      />
    </div>
  )

}



export default StockOrderPage