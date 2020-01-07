import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  progress: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tableContainer: {
    width: '100%',
    marginTop: spacing(3),
    overflowX: 'auto',
    color: palette.secondary.main
  },
  table: {
    width: '90%',
    maxWidth: '90%',
    minHeight: '90vh',
    margin: 'auto',
    borderCollapse: 'separate',
    borderSpacing: '0 15px'
  },
  tableHeadRow: {
    '& > th': {
      borderBottom: 'none',
      paddingBottom: 6,
      fontWeight: 600,
      color: palette.secondary.tableHead
    }
  },
  tableBodyRow: {
    cursor: 'pointer',
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.08)',
    '& > td': {
      borderBottom: '1px solid #eee',
      '&:last-child': {
        textAlign: 'right'
      }
    }
  },
  tableCell: {
    padding: spacing(4),
    '&:last-child': {
      padding: spacing(3)
    },
    color: 'inherit',
    fontWeight: 500
  },
  dateCell: {
    display: 'flex',
    alignItems: 'center'
  },
  dateContainer: {
    marginLeft: '-5px'
  },
  expandIconContainer: {
    marginLeft: '-15px',
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center'
  },
  expandIconBtn: {
    '& > span > div': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  expandIcon: {
    fontSize: spacing(3),
    fontWeight: 'bold',
    color: palette.primary.dark
  },
  greenRow: {
    background: '#f8fdf8'
  },
  whiteRow: {
    background: '#fff'
  },
  paginationContainer: {
    width: '94%',
    margin: 'auto',
    fontSize: '16px'
  }
}));
