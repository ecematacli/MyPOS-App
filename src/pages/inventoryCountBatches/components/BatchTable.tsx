import React, { Fragment } from 'react';

import styles from './styles';
import { BatchData } from '../types';
import { formatDate } from '../../../common/utils';
import PlainTable from '../../../common/components/plainTable';
import inventoryImage from '../../../assets/img/stocktake-emptylist-v1.png';

interface Props {
  batchesData: BatchData;
  page: number;
  rowsPerPage: number;
  handleChangeRowsPerPage: ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => void;
}

const BatchTable: React.FC<Props> = ({
  batchesData,
  page,
  rowsPerPage,
  handleChangeRowsPerPage,
  handleChangePage,
}) => {
  const classes = styles();

  const { count, batches } = batchesData;

  const formattedBatchData = () =>
    batches.map((batch) => ({
      ...batch,
      started: batch.started && formatDate(batch.started, 'd MMMM y - p'),
      finished: batch.finished && formatDate(batch.finished, 'd MMMM y - p'),
    }));

  return (
    <Fragment>
      {!count ? (
        <div className={classes.imageDiv}>
          <img src={inventoryImage} />
        </div>
      ) : (
        <div className={classes.tableDiv}>
          <PlainTable
            tableHeads={[
              { name: 'Name' },
              { name: 'Started' },
              { name: 'Finished' },
              {
                name: 'Category',
              },
              { name: 'Brand', rightAlign: true },
            ]}
            count={count}
            rows={{ type: 'batch', batches: formattedBatchData() }}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
          />
        </div>
      )}
    </Fragment>
  );
};

export default BatchTable;
