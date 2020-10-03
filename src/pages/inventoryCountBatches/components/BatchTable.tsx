import React from 'react';

import styles from './styles';
import { BatchesData } from '../types';
import { formatDate } from '../../../common/utils';
import PlainTable from '../../../common/components/plainTable';

interface Props {
  batchesData: BatchesData;
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
        hasDataToShow={formattedBatchData().length > 0}
        rows={{ type: 'batch', batches: formattedBatchData() }}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleChangePage={handleChangePage}
      />
    </div>
  );
};

export default BatchTable;
