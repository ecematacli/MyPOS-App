import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  noDisplay: {
    display: 'flex',
    justifyContent: 'center',
    color: palette.secondary.main
  },
  displayMsg: {
    fontSize: spacing(3),
    fontWeight: 'bold'
  },
  tableResponsive: {
    width: '100%',
    marginTop: spacing(3),
    overflowX: 'auto'
  },
  table: {
    width: '90%',
    maxWidth: '90%',
    minHeight: '90vh',
    marginBottom: 0,
    backgroundColor: 'transparent',
    margin: 'auto auto',
    borderCollapse: 'separate',
    borderSpacing: '0 15px'
  },
  tableHeadRow: {
    '& > th': {
      borderBottom: 'none',
      paddingBottom: 6,
      fontWeight: 600,
      color: '#888888',
      '&:last-child': {
        textAlign: 'right'
      }
    }
  },
  tableBodyRow: {
    cursor: 'pointer',
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.08)',
    '& > td': {
      '&:last-child': {
        textAlign: 'right'
      }
    }
  },
  tableCell: {
    padding: spacing(4),
    color: '#585858',
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
    background: 'white'
  },
  paginationContainer: {
    width: '94%',
    margin: 'auto auto',
    fontSize: '16px'
  }
}));
