import React from 'react';

import PlainTable from '../../../../common/components/plainTable';
import { BatchesProductsData } from '../../types';

interface Props {
  batchProducts: BatchesProductsData;
  page: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => void;
  rowsPerPage: number;
  handleChangeRowsPerPage: ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => void;
}

const InventoryCountDetails: React.FC<Props> = ({
  batchProducts,
  page,
  handleChangePage,
  rowsPerPage,
  handleChangeRowsPerPage
}) => {
  const { counted, uncounted, products } = batchProducts;

  return (
    <div>
      <PlainTable
        tableHeads={['Product', 'Expected', 'Counted']}
        count={counted + uncounted}
        rows={{ type: 'batchProductsTable', batchProducts: products }}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleChangePage={handleChangePage}
      />
    </div>
  );
};

export default InventoryCountDetails;
