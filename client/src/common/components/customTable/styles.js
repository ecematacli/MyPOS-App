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
    margin: 'auto',
    borderCollapse: 'separate',
    borderSpacing: '0 15px'
  },
  tableHeadRow: {
    '& > th': {
      borderBottom: 'none',
      paddingBottom: 6,
      color: palette.grayColors[7]
    }
  },
  tableBodyRow: {
    cursor: 'pointer',
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.08)',
    '& > td': {
      borderBottom: '1px solid #eee'
    }
  },
  tableCell: {
    paddingTop: spacing(4),
    paddingBottom: spacing(4),
    color: 'inherit',
    fontWeight: 500,
    '&:last-child': {
      paddingRight: spacing(3)
    }
  },
  firstCellContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  firstCellItem: {
    marginLeft: '-5px'
  },
  expandIconContainer: {
    marginRight: spacing(2),
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
    background: palette.greenColors[2]
  },
  whiteRow: {
    background: palette.whiteColors[0]
  },
  paginationContainer: {
    marginTop: spacing(2),
    width: '94%',
    margin: 'auto',
    fontSize: 16
  },
  noDisplayMsg: {
    color: palette.grayColors[3],
    display: 'flex',
    justifyContent: 'center',
    fontSize: 18
  },
  noDisplayCell: {
    borderBottom: 'none',
    paddingTop: 50
  }
}));
