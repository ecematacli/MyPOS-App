import { makeStyles } from '@material-ui/core/styles';

const verticallyAligned = {
  display: 'flex',
  alignItems: 'center'
};

const horizontallyAligned = {
  display: 'flex',
  justifyContent: 'center'
};

export default makeStyles(({ spacing, palette, breakpoints }) => ({
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
      color: palette.grayColors[7],
      [breakpoints.down('sm')]: {
        fontSize: 13
      }
    }
  },
  tableBodyRow: {
    cursor: 'pointer',
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.08)'
  },
  tableCell: {
    paddingTop: spacing(4),
    paddingBottom: spacing(4),
    height: ({ tableType }) => (tableType === 'sales' ? 100 : 115),
    maxHeight: ({ tableType }) => (tableType === 'sales' ? 100 : 115),
    [breakpoints.down('sm')]: {
      fontSize: 13
    },
    color: 'inherit',
    fontWeight: 500,
    borderBottom: `1px solid ${palette.secondary.light}`,
    '&:last-child': {
      paddingRight: spacing(3)
    }
  },
  firstCellContainer: {
    ...verticallyAligned
  },
  firstCellItem: {
    marginLeft: '-5px'
  },
  expandIconContainer: {
    ...verticallyAligned,
    marginRight: spacing(2)
  },
  expandIconBtn: {
    '& > span > div': {
      ...horizontallyAligned,
      alignItems: 'center'
    }
  },
  expandIcon: {
    fontSize: spacing(3),
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
    fontSize: spacing(2),
    width: '93%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  smallPagination: {
    [breakpoints.down('sm')]: {
      fontSize: 13
    }
  },
  noDisplayMsg: {
    ...horizontallyAligned,
    color: palette.grayColors[3],
    fontSize: spacing(2.25)
  },
  noDisplayCell: {
    borderBottom: 'none',
    paddingTop: 50
  }
}));
