import React from 'react';
import {
  TableRow,
  TableCell,
  Table,
  TableBody,
  TableHead
} from '@material-ui/core';

import styles from './styles';
import Loading from '../../../../common/components/loading';

const loading = false;

const InventoryCountBatchTable = () => {
  const classes = styles();

  const renderTableHead = () => (
    <TableRow className={classes.tableHeadRow}>
      {['Name', 'Started', 'Finished', 'Category', 'Brand'].map((head, i) => (
        <TableCell
          className={classes[i === 0 && 'firstCell']}
          align="left"
          key={head}
        >
          {head}
        </TableCell>
      ))}
    </TableRow>
  );
  const renderTableBody = () =>
    [
      {
        name: 'BATCH-1',
        started: '12.03.2020',
        finished: '12.03.2020',
        category: 'shoe',
        brand: 'nike'
      },
      {
        name: 'BATCH-2',
        started: '12.03.2020',
        finished: '12.03.2020',
        category: 'shoe',
        brand: 'nike'
      },
      {
        name: 'BATCH-3',
        started: '12.03.2020',
        finished: '12.03.2020',
        category: 'shoe',
        brand: 'nike'
      }
    ].map(({ name, started, finished, category, brand }, i) => (
      <TableRow className={classes.tableBodyRow} key={i}>
        <TableCell className={classes.firstCell}>{name}</TableCell>
        <TableCell>{started}</TableCell>
        <TableCell>{finished}</TableCell>
        <TableCell>{category}</TableCell>
        <TableCell>{brand}</TableCell>
      </TableRow>
    ));

  return (
    <div className={classes.tableContainer} style={{}}>
      <Table>
        <TableHead>{renderTableHead()}</TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={10}>
                <Loading />
              </TableCell>
            </TableRow>
          ) : (
            renderTableBody()
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default InventoryCountBatchTable;
